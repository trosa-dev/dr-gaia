/*
  Warnings:

  - Added the required column `error` to the `response` table without a default value. This is not possible if the table is not empty.
  - Added the required column `temperature` to the `response` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "response" ADD COLUMN     "error" TEXT NOT NULL,
ADD COLUMN     "temperature" INTEGER NOT NULL;
