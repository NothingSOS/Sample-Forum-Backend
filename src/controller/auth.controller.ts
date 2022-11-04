import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import * as nodemailer from "nodemailer";
import * as randomstring from "randomstring";

import { PreUserJWT, RequestBodyLogin, RequestBodyRegister, RequestBodyVerifyEmail, RequestBodyVerifyUser } from "./auth.d";
import { transportOption } from "../config/nodemailer.config";

const prisma = new PrismaClient();

const checkPreUser = async (key: string): Promise<[200, PreUserJWT] | [400 | 500, string]> => {
  try {
    let info = jwt.verify(key, process.env.JWT_SECRET ?? "");
    if (!info || typeof info === "string" || info instanceof String) return [400, `JsonWebTokenError : Invalid payload`];

    const { email, randomKey } = info;
    if (!email || !randomKey) return [400, `JsonWebTokenError : Invalid payload`];

    const preUser = await prisma.preUser.findFirst({
      where: {
        email,
        randomKey,
      },
    });

    if (!preUser) return [400, ``];
    return [200, { id: preUser.id, email: preUser.email, randomKey: preUser.randomKey }];
  } catch (e: any) {
    if (e instanceof JsonWebTokenError) return [400, `${e.name} : ${e.message}`];
    return [500, e.message ?? ""];
  }
};

const authController = {
  async login(req: Request<{}, {}, RequestBodyLogin>, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) res.status(400);
    email.trim();

    try {
      const user = await prisma.user.findFirst({ where: { email } });
      if (!user) return res.status(404).send("E-mail and/or password is incorrect");

      const isUser = bcrypt.compareSync(password, user.password);
      if (!isUser) return res.status(404).send("E-mail and/or password is incorrect");

      const atk = jwt.sign({ userId: user.id }, process.env.JWT_SECRET ?? "secret", { expiresIn: process.env.JWT_EXPIRE ?? "3600s" });
      res.status(200).send({ atk });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError || e instanceof Prisma.PrismaClientInitializationError) console.log(e.message);

      return res.status(500).send();
    }
  },

  async register(req: Request<{}, {}, RequestBodyRegister>, res: Response) {
    const { email } = req.body;
    if (!email) return res.status(400).send();
    email.trim();

    try {
      const dupUser = await prisma.user.findFirst({ where: { email } });
      if (dupUser) return res.status(409).send("E-mail is already existed.");

      const randomKey = randomstring.generate(128);
      await prisma.preUser.upsert({
        where: { email },
        update: {
          randomKey,
        },
        create: {
          email,
          randomKey,
        },
      });

      const token = jwt.sign({ email, randomKey }, process.env.JWT_SECRET ?? "", { expiresIn: "300s" });
      const verifyLink = `${process.env.FRONT_END_URL}/verify?key=${token}`;

      const mailTransporter = nodemailer.createTransport(transportOption);
      const mailOption = {
        from: process.env.EMAIL_AUTH_USER,
        to: email,
        subject: "Welcome to The Test Forum",
        html: `<div>Welcome to The Test Forum</div>
          <div>Please click the link below within 5 minutes to verify the e-mail.</div>
          <br/>
          <a href="${verifyLink}">${verifyLink}</a>`,
      };

      mailTransporter.sendMail(mailOption, (error, info) => {
        if (error) console.log(error);
        res.status(200).send("Register success!");
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError || e instanceof Prisma.PrismaClientInitializationError) console.log(e.message);

      return res.status(500).send();
    }
  },

  async verifyEmail(req: Request<{}, {}, RequestBodyVerifyEmail>, res: Response) {
    const { key } = req.body;
    if (!key) return res.status(400).send();

    const checkPreUserResult = await checkPreUser(key);
    let resMessage = "Success";
    if (checkPreUserResult[0] === 500) console.log(checkPreUserResult[1]);
    if (checkPreUserResult[0] === 400) resMessage === checkPreUserResult[1];

    return res.status(checkPreUserResult[0]).send(resMessage);
  },

  async verifyUser(req: Request<{}, {}, RequestBodyVerifyUser>, res: Response) {
    const { key, displayName, password } = req.body;
    if (!key || !displayName || !password) return res.status(400).send();

    const checkPreUserResult = await checkPreUser(key);
    if (checkPreUserResult[0] === 400) return res.status(checkPreUserResult[0]).send(checkPreUserResult[1]);
    if (checkPreUserResult[0] === 500) {
      console.log(checkPreUserResult[1]);
      return res.status(checkPreUserResult[0]).send();
    }
    if (checkPreUserResult[0] === 200) {
      try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const createNewUser = prisma.user.create({
          data: {
            displayName,
            email: checkPreUserResult[1].email,
            password: hashedPassword,
          },
        });
        const deletePreUser = prisma.preUser.delete({ where: { id: checkPreUserResult[1].id } });
        await prisma.$transaction([createNewUser, deletePreUser]);

        return res.status(200).send();
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError || e instanceof Prisma.PrismaClientInitializationError) console.log(e.message);

        return res.status(500).send();
      }
    }
  },
};

export default authController;
