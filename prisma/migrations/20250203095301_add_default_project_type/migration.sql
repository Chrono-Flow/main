-- CreateEnum
CREATE TYPE "ProjectType" AS ENUM ('SCHEDULE', 'CRONJOB', 'BACKEND');

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "apiEndpoint" TEXT,
ADD COLUMN     "cronExpression" TEXT,
ADD COLUMN     "scheduleConfig" JSONB,
ADD COLUMN     "type" "ProjectType" NOT NULL DEFAULT 'SCHEDULE';
