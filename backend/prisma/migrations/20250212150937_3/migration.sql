/*
  Warnings:

  - The primary key for the `TrackOnAlbum` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `TrackOnAlbum` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `order` to the `TrackOnAlbum` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TrackOnAlbum" DROP CONSTRAINT "TrackOnAlbum_albumId_fkey";

-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "logo" TEXT;

-- AlterTable
ALTER TABLE "TrackOnAlbum" DROP CONSTRAINT "TrackOnAlbum_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "order" INTEGER NOT NULL,
ALTER COLUMN "albumId" DROP NOT NULL,
ADD CONSTRAINT "TrackOnAlbum_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "TrackOnAlbum" ADD CONSTRAINT "TrackOnAlbum_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;
