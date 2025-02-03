-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "type" SET DEFAULT 'SCHEDULE';

-- DropEnum
DROP TYPE "ProjectType";
