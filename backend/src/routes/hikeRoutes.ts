import express from "express";
import {
  createHike,
  deleteHike,
  getHikes,
  updateHike,
} from "../controllers/hikeController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").get(protect, getHikes).post(protect, createHike);

router.route("/:id").put(protect, updateHike).delete(protect, deleteHike);

export default router;
