
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

async function fixData() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to DB for cleaning...");

        const menuCollection = mongoose.connection.collection("menus");

        // 1. Fetch all menus
        const allMenus = await menuCollection.find({}).toArray();
        console.log(`Found ${allMenus.length} total menus.`);

        // Group by restaurantId (normalized to string)
        const menusByRestaurant = {};

        for (const menu of allMenus) {
            // Normalize ID to string for grouping
            let rIdStr = "";
            if (typeof menu.restaurantId === 'string') {
                rIdStr = menu.restaurantId;
            } else if (menu.restaurantId && menu.restaurantId.toString) {
                rIdStr = menu.restaurantId.toString();
            } else {
                console.log(`Skipping menu ${menu._id} with invalid restaurantId:`, menu.restaurantId);
                continue;
            }

            if (!menusByRestaurant[rIdStr]) {
                menusByRestaurant[rIdStr] = [];
            }
            menusByRestaurant[rIdStr].push(menu);
        }

        // 2. Process each restaurant's menus
        for (const rId of Object.keys(menusByRestaurant)) {
            const menus = menusByRestaurant[rId];

            console.log(`Processing Restaurant ${rId}: found ${menus.length} menu(s).`);

            // Strategy:
            // - Find if there is an "Correct" menu (one with ObjectId restaurantId)
            // - If multiple, pick the one with most items or first one.
            // - If none, create a new one with ObjectId.
            // - Merge items from all others into the Correct one.
            // - Delete the others.

            let targetMenu = menus.find(m => m.restaurantId instanceof mongoose.Types.ObjectId);

            // If we only have String-ID menus, we need to convert one or create a new one.
            if (!targetMenu) {
                console.log(`  No menu with ObjectId found for ${rId}. Converting the first available menu...`);
                // Pick the first one to describe "target"
                const candidate = menus[0];

                // We will UPDATE this candidate to have ObjectId restaurantId
                try {
                    await menuCollection.updateOne(
                        { _id: candidate._id },
                        { $set: { restaurantId: new mongoose.Types.ObjectId(rId) } }
                    );
                    targetMenu = candidate; // It's now "fixed" in DB, though local var is stale. That's fine for merging logic below logic.
                    console.log(`  Converted menu ${candidate._id} to use ObjectId(restaurantId).`);
                } catch (e) {
                    console.error(`  Failed to convert restaurantId for ${rId}: ${e.message}`);
                    continue;
                }
            }

            // Now merge items from all *other* menus (including duplicate ObjectId ones or String ones)
            const otherMenus = menus.filter(m => m._id.toString() !== targetMenu._id.toString());

            if (otherMenus.length === 0) {
                console.log(`  No duplicates to merge for ${rId}.`);
                continue;
            }

            const allItems = [...(targetMenu.items || [])];
            const itemsMap = new Map();

            // Seed map with existing target items
            allItems.forEach(i => itemsMap.set(i.name, i));

            for (const other of otherMenus) {
                console.log(`  Merging items from duplicate menu ${other._id} (${typeof other.restaurantId === 'string' ? 'String' : 'ObjectId'})...`);
                if (other.items && other.items.length > 0) {
                    other.items.forEach(item => {
                        if (!itemsMap.has(item.name)) {
                            itemsMap.set(item.name, item);
                            allItems.push(item);
                            console.log(`    Added item: ${item.name}`);
                        }
                    });
                }

                // Delete the duplicate
                await menuCollection.deleteOne({ _id: other._id });
                console.log(`  Deleted duplicate menu ${other._id}`);
            }

            // Save the merged items to target
            await menuCollection.updateOne(
                { _id: targetMenu._id },
                { $set: { items: allItems } }
            );
            console.log(`  Updated target menu ${targetMenu._id} with ${allItems.length} total items.`);
        }

        console.log("\nDone checking/fixing menus.");

    } catch (err) {
        console.error("Fix Data Error:", err);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected.");
    }
}

fixData();
