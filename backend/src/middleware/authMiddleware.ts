import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { NextFunction, Request, Response } from "express";
import { TokenInterface } from "../types/token";

const userRepo = AppDataSource.getRepository(User);

export const protect = asyncHandler(handleAuth);

export async function handleAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let token: string;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      ) as TokenInterface;
      const userDb = await userRepo.findOneBy({
        id: decoded.id,
      });
      req.user = {
        id: userDb.id,
      };

      next();
    } catch (error) {
      res.status(403);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(403);
    throw new Error("Not authorized, no token");
  }
}
