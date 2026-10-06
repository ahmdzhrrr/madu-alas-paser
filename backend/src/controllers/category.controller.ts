import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const getCategories = async (
  req: Request,
  res: Response
) => {

  const categories =
    await prisma.category.findMany();

  res.json(categories);

};

export const createCategory = async (
  req: Request,
  res: Response
) => {

  const { name } = req.body;

  const category =
    await prisma.category.create({
      data: { name }
    });

  res.status(201).json(category);

};

export const updateCategory = async (
  req: Request,
  res: Response
) => {

  const id  = Number(req.params.id);
  const { name } = req.body;

  const category =
    await prisma.category.update({
      where: { id },
      data: { name }
    });

  res.json(category);

};

export const deleteCategory = async (
  req: Request,
  res: Response
) => {

  const id = Number(req.params.id);

  await prisma.category.delete({
    where: { id }
  });

  res.json({
    message: "Kategori dihapus"
  });

};