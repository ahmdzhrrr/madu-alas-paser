import { Request, Response } from "express";
import { prisma } from "../config/prisma";

function generateOrderNumber() {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const random = Math.floor(1000 + Math.random() * 9000);

  return `MAP-${year}${month}${day}-${random}`;
}

export const createOrder = async (
  req: Request,
  res: Response
) => {
  try {

    const {
      customerName,
      customerPhone,
      customerAddress,
      items
    } = req.body;

    if (
      !customerName ||
      !customerPhone ||
      !customerAddress ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return res.status(400).json({
        message: "Data pesanan tidak lengkap"
      });
    }

    const order = await prisma.$transaction(
      async (tx) => {

        let total = 0;

        const orderItems = [];

        for (const item of items) {

          const product =
            await tx.product.findUnique({
              where: {
                id: Number(item.productId)
              }
            });

          if (!product) {
            throw new Error(
              `Produk dengan ID ${item.productId} tidak ditemukan`
            );
          }

          const quantity = Number(item.quantity);

          if (!quantity || quantity <= 0) {
            throw new Error(
              `Jumlah produk tidak valid`
            );
          }

          if (product.stock < quantity) {
            throw new Error(
              `Stok ${product.name} tidak mencukupi`
            );
          }

          const itemTotal =
            Number(product.price) * quantity;

          total += itemTotal;

          orderItems.push({
            productId: product.id,
            productName: product.name,
            price: product.price,
            quantity
          });

          await tx.product.update({
            where: {
              id: product.id
            },
            data: {
              stock: {
                decrement: quantity
              }
            }
          });
        }

        const newOrder =
          await tx.order.create({
            data: {
              orderNumber: generateOrderNumber(),
              customerName,
              customerPhone,
              customerAddress,
              total,

              items: {
                create: orderItems
              }
            },
            include: {
              items: true
            }
          });

        return newOrder;
      }
    );

    res.status(201).json(order);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Gagal membuat pesanan"
    });

  }
};


export const getOrderByNumber = async (
  req: Request,
  res: Response
) => {
  try {

    const orderNumber = String(req.params.orderNumber);

    const order =
      await prisma.order.findUnique({
        where: {
          orderNumber
        },
        include: {
          items: true
        }
      });

    if (!order) {
      return res.status(404).json({
        message: "Pesanan tidak ditemukan"
      });
    }

    res.json(order);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Gagal mengambil pesanan"
    });

  }
};
