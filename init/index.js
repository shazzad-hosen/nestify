const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.model.js");

main()
  .then((res) => {
    console.log("connected");
  })
  .catch((error) => {
    console.log(error);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/nestify");
}

const initDB = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(initData.data); // passing data as an array of object
  console.log("data was initialized");
};

initDB();
