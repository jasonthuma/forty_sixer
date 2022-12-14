import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Mountain } from "../entities/Mountain";

const mountainRepo = AppDataSource.getRepository(Mountain);

export const getAllMountains = async (req: Request, res: Response) => {
  const mountains = await mountainRepo.find();
  if (mountains) {
    res.json(mountains);
  } else {
    res.status(400);
    throw new Error("No mountains found");
  }
};

export const getMountainById = asyncHandler(handleMountainById);

export async function handleMountainById(req: Request, res: Response) {
  const mountain = await mountainRepo.findOneBy({
    id: Number(req.params.id),
  });
  if (mountain) {
    res.send(mountain);
  } else {
    res.status(400);
    throw new Error("Mountain not found");
  }
}

export const getMountainByName = asyncHandler(handleMountainByName);

export async function handleMountainByName(req: Request, res: Response) {
  const name = String(req.query.name);
  const mountain = await mountainRepo.findOneBy({
    name,
  });
  if (mountain) {
    res.send(mountain);
  } else {
    res.status(400);
    throw new Error("Mountain not found");
  }
}
