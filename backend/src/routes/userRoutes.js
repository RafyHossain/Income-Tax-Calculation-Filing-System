const express = require("express");

const router = express.Router();

const UserController = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");

router.get("/email/:email",UserController.getUserByEmail
);
router.get("/phone/:phone",UserController.getUserByPhone);
router.post("/register",UserController.registerUser);
router.post("/login",UserController.loginUser);
router.get("/profile",verifyToken,UserController.getProfile);

module.exports = router;