import express from "express";
import {
  getAllMountains,
  getMountainById,
  getMountainByName,
} from "../controllers/mountainController";
const router = express.Router();

router.get("/", getAllMountains);
router.get("/search", getMountainByName);
router.get("/:id", getMountainById);

export default router;
