import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export async function getTestimonials(
  req: Request,
  res: Response
) {
  const testimonials =
    await prisma.testimonial.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });

  res.json(testimonials);
}

export async function createTestimonial(
  req: Request,
  res: Response
) {
  const testimonial =
    await prisma.testimonial.create({
      data: req.body
    });

  res.json(testimonial);
}

export async function updateTestimonial(
  req: Request,
  res: Response
) {
  const id =
    Number(req.params.id);

  const testimonial =
    await prisma.testimonial.update({
      where: { id },
      data: req.body
    });

  res.json(testimonial);
}

export async function deleteTestimonial(
  req: Request,
  res: Response
) {
  const id =
    Number(req.params.id);

  await prisma.testimonial.delete({
    where: { id }
  });

  res.json({
    message: "Deleted"
  });
}