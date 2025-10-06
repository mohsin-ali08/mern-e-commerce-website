const mongoose =require("mongoose");
const dotenv =require("dotenv");
const Product =require("./models/Product");
const User =require("./models/user");
const Cart =require("./models/Cart");
const products =require("./Data/products");

dotenv.config();

// connect to mongoDB
mongoose.connect(process.env.MONGO_URI);

// Function to seed data,

const seedData = async () => {
    try {
        // Clear existing Data,
        await Product.deleteMany();
        await User.deleteMany();
        await Cart.deleteMany();

        // Create a default Admin user
        const createdUser = await User.create({
            name : "Admin User",
            email : "mohsinalisurhio08@gmail.com",
            password: "mohsiN08",
            role:"admin"
        });

        // Assign the default use ID to each product
        const userID = createdUser._id;

        const sampleProducts = products.map((product) => {
            return{...product, user: userID};
        });

        // Insert the products into the Database
        await Product.insertMany(sampleProducts);
        console.log("Product data seeded successfully!");
        process.exit();
        
    } catch (error) {
        console.error("Error seeding the Data :",error);
        process.exit(1);

        
        
    }
};

seedData();