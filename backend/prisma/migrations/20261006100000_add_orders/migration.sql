CREATE TYPE "OrderStatus" AS ENUM (
    'MENUNGGU',
    'DIPROSES',
    'DIKIRIM',
    'SELESAI',
    'DIBATALKAN'
);

CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "orderNumber" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "customerAddress" TEXT NOT NULL,
    "total" DECIMAL NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'MENUNGGU',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "OrderItem" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "productName" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Order_orderNumber_key"
ON "Order"("orderNumber");

ALTER TABLE "OrderItem"
ADD CONSTRAINT "OrderItem_orderId_fkey"
FOREIGN KEY ("orderId")
REFERENCES "Order"("id")
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE "OrderItem"
ADD CONSTRAINT "OrderItem_productId_fkey"
FOREIGN KEY ("productId")
REFERENCES "Product"("id")
ON DELETE RESTRICT
ON UPDATE CASCADE;