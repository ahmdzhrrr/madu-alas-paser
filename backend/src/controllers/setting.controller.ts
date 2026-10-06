import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export async function getSetting(
  req: Request,
  res: Response
) {
  try {

    let setting =
      await prisma.siteSetting.findFirst();

    if (!setting) {

      setting =
        await prisma.siteSetting.create({
          data: {
            whatsapp: ""
          }
        });

    }

    res.json(setting);

  } catch (error) {

    res.status(500).json(error);

  }
}

export async function updateSetting(
  req: Request,
  res: Response
) {
  try {

    let setting =
      await prisma.siteSetting.findFirst();

    if (!setting) {

      setting =
        await prisma.siteSetting.create({
          data: {
            whatsapp: ""
          }
        });

    }

    const updated =
      await prisma.siteSetting.update({
        where: {
          id: setting.id
        },
        data: req.body
      });

    res.json(updated);

  } catch (error) {

    console.error(error);

    res.status(500).json(error);

  }
}