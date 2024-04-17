/*
  Warnings:

  - You are about to drop the column `diagnostic_accuracy` on the `response` table. All the data in the column will be lost.
  - Added the required column `diagnostic_validation` to the `response` table without a default value. This is not possible if the table is not empty.
  - Added the required column `likert` to the `response` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "response" DROP COLUMN "diagnostic_accuracy",
ADD COLUMN     "diagnostic_validation" BOOLEAN NOT NULL,
ADD COLUMN     "likert" INTEGER NOT NULL;
