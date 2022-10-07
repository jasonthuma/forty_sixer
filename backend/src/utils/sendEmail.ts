import nodemailer from "nodemailer";
import { config } from "dotenv";
import { AppDataSource } from "../data-source";
import { ResetToken } from "../entities/ResetToken";
import bcrypt from "bcryptjs";
import { v4 } from "uuid";
config();

const resetTokenRepo = AppDataSource.getRepository(ResetToken);

const sendEmail = async (
  email: string,
  userId: string,
  redirectUrl: string
) => {
  try {
    const resetString = v4() + userId;
    //delete any existing reset tokens
    await resetTokenRepo.delete({ userId: userId });

    const mailOptions = {
      from: process.env.MUSER,
      to: email,
      subject: "Password Reset",
      html: `<p>You have requested to reset your password</p><p>Use the link below to reset it. 
        This link expires in 1 hour</p><p><a href=${
          redirectUrl + "/" + userId + "/" + resetString
        }>Click here to reset</p>`,
    };
    const salt = await bcrypt.genSalt(10);
    const hashedResetString = await bcrypt.hash(resetString, salt);
    const expiration = new Date(Date.now() + 3600000).toISOString();

    const createdAt = new Date(Date.now()).toISOString();

    const newResetToken = resetTokenRepo.create({
      userId: userId,
      token: hashedResetString,
      expiration,
      createdAt,
    });
    const results = await resetTokenRepo.save(newResetToken);
    if (results) {
      const transporter = nodemailer.createTransport({
        service: process.env.SERVICE,
        auth: {
          user: process.env.MUSER,
          pass: process.env.MPASS,
        },
      });
      await transporter.sendMail(mailOptions);
      return true;
    } else {
      throw new Error("Failed to send reset password email");
    }
  } catch (error: Error | any) {
    console.log(error, "email not sent");
  }
};

export default sendEmail;