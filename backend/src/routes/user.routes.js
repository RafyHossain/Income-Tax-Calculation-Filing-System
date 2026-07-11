const express = require("express");

const router = express.Router();

const UserController = require("../controllers/user.controller");

router.get("/email/:email",UserController.getUserByEmail
);
router.get("/phone/:phone",UserController.getUserByPhone);

module.exports = router;