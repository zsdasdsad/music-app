/*
  Warnings:

  - You are about to drop the column `artistId` on the `ArtistRoleRequest` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ArtistRoleRequest" DROP CONSTRAINT "ArtistRoleRequest_artistId_fkey";

-- AlterTable
ALTER TABLE "ArtistRoleRequest" DROP COLUMN "artistId";
