/*
  Warnings:

  - You are about to alter the column `token` on the `participants` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(6)`.
  - You are about to alter the column `phoneNumber` on the `participants` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(11)`.
  - A unique constraint covering the columns `[token]` on the table `participants` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `answer` to the `participants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `participants` ADD COLUMN `answer` VARCHAR(191) NOT NULL,
    MODIFY `token` VARCHAR(6) NOT NULL,
    MODIFY `phoneNumber` VARCHAR(11) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `participants_token_key` ON `participants`(`token`);
