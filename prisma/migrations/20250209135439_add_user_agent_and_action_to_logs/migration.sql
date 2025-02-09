-- CreateEnum
CREATE TYPE "ActionType" AS ENUM ('CREATE', 'UPDATE', 'DELETE', 'OTHER');

-- AlterTable
ALTER TABLE "Logs" ADD COLUMN     "action" "ActionType",
ADD COLUMN     "userAgent" TEXT;
