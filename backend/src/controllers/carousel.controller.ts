import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export async function getSlides(
  req: Request,
  res: Response
) {
  const slides =
    await prisma.carouselSlide.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });

  res.json(slides);
}

export async function createSlide(
  req: Request,
  res: Response
) {
  const slide =
    await prisma.carouselSlide.create({
      data: req.body
    });

  res.json(slide);
}

export async function updateSlide(
  req: Request,
  res: Response
) {
  const id =
    Number(req.params.id);

  const slide =
    await prisma.carouselSlide.update({
      where: { id },
      data: req.body
    });

  res.json(slide);
}

export async function deleteSlide(
  req: Request,
  res: Response
) {
  const id =
    Number(req.params.id);

  await prisma.carouselSlide.delete({
    where: { id }
  });

  res.json({
    message: "Deleted"
  });
}