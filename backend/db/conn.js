const mongoose = require('mongoose');

require("dotenv").config();

mongoose.set("strictQuery", true);

async function main() {
    
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.iacmwwj.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp`
            );

            console.log("Connected to MongoDB server");
            
    } catch (error) {
        console.log(`Erro: ${error}`);
    }
    
}

module.exports = main;