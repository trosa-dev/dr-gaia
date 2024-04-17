/*
  Warnings:

  - Added the required column `disagreement` to the `response` table without a default value. This is not possible if the table is not empty.
  - Added the required column `disagreement_count` to the `response` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "response" ADD COLUMN     "disagreement" TEXT NOT NULL,
ADD COLUMN     "disagreement_count" INTEGER NOT NULL;
