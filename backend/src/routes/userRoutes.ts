import express from "express";
import {
  getLoggedUser,
  loginUser,
  registerUser,
  forgotPassword,
  resetPassword,
} from "../controllers/userController";
import { protect } from "../middleware/authMiddleware";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);
router.get("/current", protect, getLoggedUser);

export default router;
