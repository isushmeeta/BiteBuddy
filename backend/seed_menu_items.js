
import mongoose from "mongoose";
import dotenv from "dotenv";
import Restaurant from "./models/Restaurant.js";
import Menu from "./models/Menu.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const adjectives = ["Spicy", "Sweet", "Savory", "Grilled", "Fried", "Roasted", "Fresh", "Delicious", "Crispy", "Creamy", "Tasty", "Hot", "Cold", "Zesty", "Tangy"];
const foods = ["Burger", "Pizza", "Pasta", "Salad", "Soup", "Steak", "Sandwich", "Taco", "Sushi", "Curry", "Noodles", "Rice", "Stew", "Wrap", "Pie"];
const descriptions = [
    "A delightful combination of flavors that will tantalize your taste buds.",
    "Freshly prepared with high-quality, locally sourced ingredients.",
    "A chef's special recipe passed down through generations.",
    "Perfect for any meal, day or night.",
    "Served with a side of happiness and a touch of magic.",
    "An explosion of taste in every bite.",
    "Cooked to perfection and served steaming hot.",
    "A classic dish reimagined for modern tastes.",
    "Light, refreshing, and incredibly satisfying.",
    "Indulge in this rich and hearty meal."
];

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateMenuItem() {
    // Generate a reasonably unique name to avoid massive collisions, though exact uniqueness isn't strict here
    const uniqueSuffix = Math.floor(Math.random() * 10000);
    const name = `${getRandomElement(adjectives)} ${getRandomElement(foods)} ${uniqueSuffix}`;
    const price = Math.floor(Math.random() * 25) + 5; // Price between 5 and 30
    const description = getRandomElement(descriptions);
    // Placeholder image
    const image = "https://placehold.co/200";

    return { name, price, description, image };
}

async function seedMenuItems() {
    try {
        if (!MONGO_URI) {
            console.error("MONGO_URI is undefined. Check your .env file.");
            process.exit(1);
        }
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB via seed script.");

        const restaurants = await Restaurant.find();
        console.log(`Found ${restaurants.length} restaurants.`);

        for (const restaurant of restaurants) {
            console.log(`Processing restaurant: ${restaurant.name} (${restaurant._id})`);

            let menu = await Menu.findOne({ restaurantId: restaurant._id });

            if (!menu) {
                console.log(`  Creating new menu for ${restaurant.name}`);
                // Attempt to create. If it fails due to validation, we might have an issue with the ID format.
                try {
                    menu = await Menu.create({ restaurantId: restaurant._id, items: [] });
                } catch (e) {
                    console.error("Failed to create menu:", e);
                    continue;
                }
            } else {
                console.log(`  Found existing menu with ${menu.items.length} items`);
            }

            const newItems = [];
            for (let i = 0; i < 10; i++) {
                newItems.push(generateMenuItem());
            }

            await Menu.updateOne(
                { _id: menu._id },
                { $push: { items: { $each: newItems } } }
            );
            console.log(`  Successfully added 10 items to ${restaurant.name}.`);
        }

        console.log("\nSeeding complete!");
    } catch (error) {
        console.error("Error seeding menu items:", JSON.stringify(error, null, 2));
        if (error.errors) {
            console.error("Validation Errors:", JSON.stringify(error.errors, null, 2));
        }
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected");
    }
}

seedMenuItems();
