import express from "express";
import {
  getLoggedUser,
  loginUser,
  registerUser,
} from "../controllers/userController";
import { protect } from "../middleware/authMiddleware";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", protect, getLoggedUser);

export default router;
