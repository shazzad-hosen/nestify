const express = require("express");
const router = express.Router();
const searchController = require("../controllers/search.controller.js");
const wrapAsync = require("../utils/wrapAsync.js");

router.get("/search", wrapAsync(searchController.search));

module.exports = router;