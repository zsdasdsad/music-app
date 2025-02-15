/*
  Warnings:

  - You are about to drop the column `albumRequestId` on the `TrackOnAlbum` table. All the data in the column will be lost.
  - You are about to drop the `AlbumRequest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AlbumRequest" DROP CONSTRAINT "AlbumRequest_artistId_fkey";

-- DropForeignKey
ALTER TABLE "TrackOnAlbum" DROP CONSTRAINT "TrackOnAlbum_albumRequestId_fkey";

-- AlterTable
ALTER TABLE "TrackOnAlbum" DROP COLUMN "albumRequestId";

-- DropTable
DROP TABLE "AlbumRequest";
