
import mongoose from "mongoose";
import dotenv from "dotenv";
import Menu from "./models/Menu.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const foodImages = [
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80", // Burger
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80", // Pizza
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80", // Salad
    "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500&q=80", // Pizza 2
    "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&q=80", // Burger 2
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80", // Pizza Slice
    "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=500&q=80", // French Toast
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&q=80", // Salad/Green
    "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&q=80", // Cake/Dessert
    "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=500&q=80", // Sandwich
];

function getRandomImage() {
    return foodImages[Math.floor(Math.random() * foodImages.length)];
}

async function updateMenuImages() {
    try {
        if (!MONGO_URI) {
            console.error("MONGO_URI is undefined. Check your .env file.");
            process.exit(1);
        }
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB.");

        const menus = await Menu.find();
        console.log(`Found ${menus.length} menus to update.`);

        for (const menu of menus) {
            let updatedCount = 0;
            menu.items.forEach(item => {
                // Ensure required fields exist
                if (!item.name) {
                    item.name = "Delicious Item " + Math.floor(Math.random() * 100);
                    updatedCount++;
                }
                if (!item.price) {
                    item.price = Math.floor(Math.random() * 20) + 10;
                    updatedCount++;
                }
                if (!item.description) {
                    item.description = "A tasty delight prepared with care.";
                    updatedCount++;
                }

                // Update image if it's missing or if it's a placeholder
                if (!item.image || item.image.includes("placehold.co") || item.image.includes("via.placeholder")) {
                    item.image = getRandomImage();
                    updatedCount++;
                }
            });

            if (updatedCount > 0) {
                console.log(`Updating menu ${menu._id} with ${updatedCount} changes...`);
                try {
                    await menu.save();
                    console.log(`Successfully updated menu ${menu._id}`);
                } catch (saveErr) {
                    console.error(`Failed to save menu ${menu._id}:`, saveErr.message);
                }
            } else {
                console.log(`No items needed updating in menu ${menu._id}`);
            }
        }

        console.log("\nImage update complete!");
    } catch (error) {
        console.error("Error updating images:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected");
    }
}

updateMenuImages();
