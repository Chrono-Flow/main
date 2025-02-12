/*
  Warnings:

  - The `type` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "projectType" AS ENUM ('SCHEDULE', 'BACKEND');

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "serverCode" TEXT,
ADD COLUMN     "visibleCode" TEXT,
DROP COLUMN "type",
ADD COLUMN     "type" "projectType" NOT NULL DEFAULT 'BACKEND';
