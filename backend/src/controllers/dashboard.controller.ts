import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export async function getDashboardStats(
  req: Request,
  res: Response
) {

  const productCount =
    await prisma.product.count();

  const categoryCount =
    await prisma.category.count();

  const lowStockProducts =
    await prisma.product.count({
      where: {
        stock: {
          lte: 5
        }
      }
    });

  res.json({
    productCount,
    categoryCount,
    lowStockProducts
  });

}