/*
  Warnings:

  - Added the required column `name` to the `ArtistRoleRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ArtistRoleRequest" ADD COLUMN     "name" TEXT NOT NULL;
