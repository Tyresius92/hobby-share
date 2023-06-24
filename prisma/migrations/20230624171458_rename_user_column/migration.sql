/*
  Warnings:

  - You are about to drop the column `userId` on the `Item` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ownerId]` on the table `Item` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ownerId` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_userId_fkey";

-- DropIndex
DROP INDEX "Item_userId_key";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "userId",
ADD COLUMN     "ownerId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Item_ownerId_key" ON "Item"("ownerId");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
