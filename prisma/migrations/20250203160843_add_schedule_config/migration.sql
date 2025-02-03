/*
  Warnings:

  - You are about to drop the column `apiEndpoint` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `cronExpression` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `scheduleConfig` on the `Project` table. All the data in the column will be lost.
  - The `type` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `description` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Project_userId_idx";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "apiEndpoint",
DROP COLUMN "cronExpression",
DROP COLUMN "isActive",
DROP COLUMN "scheduleConfig",
ADD COLUMN     "edges" JSONB[] DEFAULT ARRAY[]::JSONB[],
ADD COLUMN     "nodes" JSONB[] DEFAULT ARRAY[]::JSONB[],
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'active',
ALTER COLUMN "description" SET NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'schedule';

-- CreateTable
CREATE TABLE "ScheduleConfig" (
    "id" TEXT NOT NULL,
    "schedule" TEXT NOT NULL DEFAULT '* * * * *',
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScheduleConfig_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ScheduleConfig_projectId_key" ON "ScheduleConfig"("projectId");

-- AddForeignKey
ALTER TABLE "ScheduleConfig" ADD CONSTRAINT "ScheduleConfig_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
