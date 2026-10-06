import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (
  req: Request,
  res: Response
) => {

  try {

    const {
      name,
      email,
      password
    } = req.body;

    const existingUser =
      await prisma.user.findUnique({
        where: { email }
      });

    if (existingUser) {

      return res.status(400).json({
        message: "Email sudah digunakan"
      });

    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user =
      await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword
        }
      });

    res.status(201).json(user);

  } catch (error) {

    res.status(500).json(error);

  }
};

export const login = async (
    req: Request,
    res: Response
  ) => {
  
    const {
      email,
      password
    } = req.body;
  
    const user =
      await prisma.user.findUnique({
        where: { email }
      });
  
    if (!user) {
  
      return res.status(404).json({
        message: "User tidak ditemukan"
      });
  
    }
  
    const match =
      await bcrypt.compare(
        password,
        user.password
      );
  
    if (!match) {
  
      return res.status(401).json({
        message: "Password salah"
      });
  
    }
  
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d"
      }
    );
  
    res.json({
      token,
      user
    });
  };