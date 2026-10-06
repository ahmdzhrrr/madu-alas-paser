import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import categoryRoutes from "./routes/category.routes";
import productsRoutes from "./routes/product.routes";
import uploadRoutes from "./routes/upload.routes";
import settingRoutes from "./routes/setting.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import carouselRoutes from "./routes/carousel.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/settings", settingRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/carousel", carouselRoutes);

export default app;