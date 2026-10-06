import { Request, Response } from "express";
import { supabase } from "../config/supabase";

export const uploadImage = async (
  req: Request,
  res: Response
) => {

  try {

    const file = req.file;
    const bucket = req.params.bucket as string;

    const allowedBuckets = [
      "Produk",
      "Carousel",
      "Logo"
    ];

    if (
      !allowedBuckets.includes(bucket)
    ) {
      return res.status(400).json({
        message: "Bucket tidak valid"
      });
    }

    if (!file) {

      return res.status(400).json({
        message: "File tidak ditemukan"
      });

    }

    const filename =
      `${Date.now()}-${file.originalname}`;

    const { error } =
      await supabase.storage
        .from(bucket)
        .upload(
          filename,
          file.buffer,
          {
            contentType:
              file.mimetype
          }
        );

    if (error) {
      throw error;
    }

    const { data } =
      supabase.storage
        .from(bucket)
        .getPublicUrl(filename);

    res.json({
      imageUrl:
        data.publicUrl
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error
    });

  }

};