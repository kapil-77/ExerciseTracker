import express from "express";
import {
  authUser,
  registerUser,
  updateUserProfile,
  getAllUsers,
} from "../Controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.route("/").post(registerUser);
router.route("/getAllUsers").get(getAllUsers);
router.post("/login", authUser);
router.route("/profile").post(protect, updateUserProfile);

export default router;
