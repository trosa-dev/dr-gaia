/*
  Warnings:

  - Added the required column `model` to the `response` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "response" ADD COLUMN     "model" TEXT NOT NULL;
