-- CreateTable
CREATE TABLE "Letter" (
    "id" INTEGER NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Letter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Letter_value_key" ON "Letter"("value");
