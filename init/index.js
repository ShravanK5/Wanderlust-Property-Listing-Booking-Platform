// const mongoose = require("mongoose");
// const initData = require("./data.js");
// const Listing = require("../models/listing.js");

// //connecting mongoose
// async function main() {
//      await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
// }
// main()
//     .then(() => {
//         console.log("connection successfull");
//         initDB();   // ✅ moved here //
//     })
//     .catch((err)=>{
//         console.log(err);
//     });

// const initDB = async ()=> {
//     await Listing.deleteMany({});
//     initData.data = initData.data.map((obj)=>({...obj,owner :"698b4e1e3ec8132de0a593f2"}));
//     await Listing.insertMany(initData.data);
//     console.log("Data added succesfully");
// };

// for mongodb atlas
require("dotenv").config();

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

// Atlas DB URL from .env
const dbURL = process.env.ATLAS_DB;

// Connect to MongoDB Atlas
async function main() {
    await mongoose.connect(dbURL);
}

main()
    .then(() => {
        console.log("connection successful");
        initDB();
    })
    .catch((err) => {
        console.log(err);
    });

// Seed database
const initDB = async () => {
    await Listing.deleteMany({});

    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner: "69b15fcc2f07c774169b2acd"
    }));

    await Listing.insertMany(initData.data);

    console.log("Data added successfully");
    mongoose.connection.close();
};