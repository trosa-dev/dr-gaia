/*
  Warnings:

  - Added the required column `input_tokens` to the `response` table without a default value. This is not possible if the table is not empty.
  - Added the required column `output_tokens` to the `response` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "response" ADD COLUMN     "input_tokens" INTEGER NOT NULL,
ADD COLUMN     "output_tokens" INTEGER NOT NULL;
