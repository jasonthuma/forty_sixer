import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { User } from "../entities/User";
import jwt from "jsonwebtoken";

const userRepo = AppDataSource.getRepository(User);

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      res.status(400);
      throw new Error("Please add all fields");
    }
    const userCheck = await userRepo.findOneBy({
      email,
    });
    if (userCheck) {
      res.status(400);
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = userRepo.create({
      username,
      password: hashedPassword,
      email,
    });
    const results = await userRepo.save(newUser);
    console.log(results);
    res.json({
      token: generateToken(newUser.id),
    });
  }
);

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  const userDb = await userRepo.findOneBy({
    email,
  });
  if (userDb && (await bcrypt.compare(password, userDb.password))) {
    res.json({
      token: generateToken(userDb.id),
    });
  } else {
    res.status(400);
    throw new Error("Username or password is incorrect");
  }
});

export const getLoggedUser = asyncHandler(
  async (req: Request, res: Response) => {
    const userDb = await userRepo.findOneBy({
      id: req.user.id,
    });

    res.status(200).json({
      id: userDb.id,
      username: userDb.username,
      email: userDb.email,
    });
  }
);

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
