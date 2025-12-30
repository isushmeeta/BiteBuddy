
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

async function inspect() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to DB");

        // We don't have the models imported, so we access collections directly via connection
        const menuCollection = mongoose.connection.collection("menus");
        const restaurantCollection = mongoose.connection.collection("restaurants");

        console.log("\n--- RESTAURANTS ---");
        const restaurants = await restaurantCollection.find({}).toArray();
        restaurants.forEach(r => {
            console.log(`Restaurant Name: ${r.name}, ID: ${r._id}, Type: ${r._id.constructor.name}`);
        });

        console.log("\n--- MENUS ---");
        const menus = await menuCollection.find({}).toArray();
        menus.forEach(m => {
            console.log(`Menu ID: ${m._id} (Type: ${m._id.constructor.name})`);
            console.log(`  restaurantId: ${m.restaurantId} (Type: ${m.restaurantId ? m.restaurantId.constructor.name : 'undefined'})`);
            console.log(`  Items count: ${m.items ? m.items.length : 0}`);
        });

        // Check for "orphaned" menus or type mismatches
        console.log("\n--- ANALYSIS ---");
        for (const m of menus) {
            const hasMatchingRest = restaurants.some(r => r._id.toString() === m.restaurantId.toString());
            console.log(`Menu ${m._id} has valid restaurant link? ${hasMatchingRest}`);

            if (m.restaurantId.constructor.name === "String") {
                console.log("WARNING: restaurantId is a STRING. It should be ObjectId.");
            }
        }

    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.disconnect();
    }
}

inspect();
