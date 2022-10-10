import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { User } from "../entities/User";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail";
import { ResetToken } from "../entities/ResetToken";

const userRepo = AppDataSource.getRepository(User);
const resetTokenRepo = AppDataSource.getRepository(ResetToken);

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
    if (results) {
      res.json({
        user: {
          id: results.id,
          email: results.email,
          username: results.username,
        },
        token: generateToken(newUser.id),
      });
    }
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
      user: {
        id: userDb.id,
        email: userDb.email,
        username: userDb.username,
      },
      token: generateToken(userDb.id),
    });
  } else {
    res.status(400);
    throw new Error("Username or password is incorrect");
  }
});

export const forgotPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, redirectUrl } = req.body;
    if (!email) {
      res.status(400);
      throw new Error("Email is required");
    }
    const userDb = await userRepo.findOneBy({
      email,
    });
    if (userDb) {
      const results = await sendEmail(email, userDb.id, redirectUrl);
      if (results) {
        res.json({
          message: "Password reset email sent",
        });
      }
    } else {
      res.status(400);
      throw new Error("Could not find user with provided email");
    }
  }
);

export const resetPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId, resetString, newPassword } = req.body;
    const reset = await resetTokenRepo.findOneBy({ userId });
    if (reset) {
      const { expiration, token } = reset;
      const now = new Date(Date.now()).toISOString();
      if (expiration.valueOf() < now.valueOf()) {
        await resetTokenRepo.delete({ userId });
        res.status(400);
        throw new Error("Reset link has expired");
      } else {
        if (await bcrypt.compare(resetString, token)) {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(newPassword, salt);
          const user = await userRepo.findOneBy({ id: userId });
          if (user) {
            userRepo.merge(user, { password: hashedPassword });
            await userRepo.save(user);
            res.send({ message: "Password reset successfully" });
          }
        } else {
          res.status(400);
          throw new Error("Invalid reset details");
        }
      }
    } else {
      res.status(400);
      throw new Error("Password reset request not found");
    }
  }
);

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
