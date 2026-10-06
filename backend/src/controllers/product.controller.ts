import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const getProducts = async (
  req: Request,
  res: Response
) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true
      }
    });

    res.json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createProduct = async (
  req: Request,
  res: Response
) => {
  try {

    const {
      name,
      description,
      price,
      stock,
      categoryId,
      imageUrl
    } = req.body;

    const product =
      await prisma.product.create({
        data: {
          name,
          description,
          price,
          stock,
          categoryId,
          imageUrl
        }
      });

    res.status(201).json(product);

  } catch (error) {
    res.status(500).json(error);
  }
};

export const getProductById = async (
  req: Request,
  res: Response
) => {
  try {

    const id  = Number(req.params.id);

    const product =
      await prisma.product.findUnique({
        where: { id },
        include: {
          category: true
        }
      });

    if (!product) {
      return res.status(404).json({
        message: "Produk tidak ditemukan"
      });
    }

    res.json(product);

  } catch (error) {
    res.status(500).json(error);
  }
};

export const getProductByCategory =
  async (
    req: Request,
    res: Response
  ) => {

    const categoryId = Number(req.params.categoryId)
      req.params;

    const products =
      await prisma.product.findMany({
        where: {
          categoryId
        },
        include: {
          category: true
        }
      });

    res.json(products);

};

export const updateProduct = async (
  req: Request,
  res: Response
) => {
  try {

    const id = Number(req.params.id);

    const {
      name,
      description,
      price,
      stock,
      categoryId,
      imageUrl
    } = req.body;

    const product =
      await prisma.product.update({
        where: { id },
        data: {
          name,
          description,
          price,
          stock,
          categoryId,
          imageUrl
        }
      });

    res.json(product);

  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
) => {
  try {

    const id = Number(req.params.id);

    await prisma.product.delete({
      where: { id }
    });

    res.json({
      message: "Produk berhasil dihapus"
    });

  } catch (error) {
    res.status(500).json(error);
  }
};

export const searchProduct = async (
  req: Request,
  res: Response
) => {

  const keyword =
    String(req.query.keyword || "");

  const products =
    await prisma.product.findMany({
      where: {
        name: {
          contains: keyword,
          mode: "insensitive"
        }
      },
      include: {
        category: true
      }
    });

  res.json(products);

};