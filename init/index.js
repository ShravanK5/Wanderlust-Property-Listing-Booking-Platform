const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

//connecting mongoose
async function main() {
     await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}
main()
    .then(() => {
        console.log("connection successfull");
        initDB();   // ✅ moved here //
    })
    .catch((err)=>{
        console.log(err);
    });

const initDB = async ()=> {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj,owner :"698b4e1e3ec8132de0a593f2"}));
    await Listing.insertMany(initData.data);
    console.log("Data added succesfully");
};

