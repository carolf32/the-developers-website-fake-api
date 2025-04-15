/*
  Warnings:

  - Changed the type of `devId` on the `Comment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "devId",
ADD COLUMN     "devId" INTEGER NOT NULL;
