/*
  Warnings:

  - You are about to drop the column `userId` on the `AlbumRequest` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "AlbumRequest" DROP CONSTRAINT "AlbumRequest_userId_fkey";

-- AlterTable
ALTER TABLE "AlbumRequest" DROP COLUMN "userId";
