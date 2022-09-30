import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { NextFunction, Request, Response } from "express";

const userRepo = AppDataSource.getRepository(User);

const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        console.log("Token:", token);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded:", decoded);
        // req.user = await userRepo.findOneBy({
        //   id: decoded.id
        // })
        next();
      } catch (error) {
        console.log(error);
        res.status(403);
        throw new Error("Not authorized");
      }
    }

    if (!token) {
      res.status(403);
      throw new Error("Not authorized, no token");
    }
  }
);
