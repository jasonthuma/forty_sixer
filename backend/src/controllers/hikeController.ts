import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Hike } from "../entities/Hike";
import { Mountain } from "../entities/Mountain";

const hikeRepo = AppDataSource.getRepository(Hike);
const mountainRepo = AppDataSource.getRepository(Mountain);

export const getHikes = async (req: Request, res: Response) => {
  const hikes = await hikeRepo.findBy({
    userId: req.user.id,
  });
  if (hikes) {
    res.json(hikes);
  } else {
    res.status(400);
    throw new Error("No hikes found");
  }
};

export const createHike = asyncHandler(handleCreateHike);

export async function handleCreateHike(req: Request, res: Response) {
  const { hikeDate, hikers, weather, tripReport, mountainName } = req.body;
  if (!hikeDate || !hikers || !weather || !tripReport || !mountainName) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  const mtnId = await mountainRepo.findOneBy({
    name: mountainName,
  });
  if (mtnId) {
    const newHike = hikeRepo.create({
      hikeDate,
      hikers,
      weather,
      tripReport,
      userId: req.user.id,
      mountainId: mtnId.id,
    });
    const results = await hikeRepo.save(newHike);
    res.json({
      results,
    });
  } else {
    res.status(400);
    throw new Error("Mountain not found");
  }
}

export const updateHike = asyncHandler(handleUpdateHike);

export async function handleUpdateHike(req: Request, res: Response) {
  const hike = await hikeRepo.findOneBy({
    id: req.params.id,
  });
  if (hike) {
    hikeRepo.merge(hike, req.body);
    const results = await hikeRepo.save(hike);
    res.send(results);
  } else {
    res.status(400);
    throw new Error("Hike not found");
  }
}

export const deleteHike = async (req: Request, res: Response) => {
  const results = await hikeRepo.delete(req.params.id);
  res.send(results);
};
