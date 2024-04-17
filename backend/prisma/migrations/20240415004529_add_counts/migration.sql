/*
  Warnings:

  - Added the required column `disagreement_rate` to the `response` table without a default value. This is not possible if the table is not empty.
  - Added the required column `icd9_codes_count` to the `response` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "response" ADD COLUMN     "disagreement_rate" INTEGER NOT NULL,
ADD COLUMN     "icd9_codes_count" INTEGER NOT NULL;
