/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "WorkSpaceModel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "scss" TEXT,
    "js" TEXT,
    "order" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "FolderModel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "workspaceId" TEXT,
    "folderId" TEXT,
    "order" INTEGER NOT NULL,
    CONSTRAINT "FolderModel_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "WorkSpaceModel" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "FolderModel_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "FolderModel" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ComponentModel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "workspaceId" TEXT,
    "folderId" TEXT,
    "html" TEXT,
    "scss" TEXT,
    "js" TEXT,
    "order" INTEGER NOT NULL,
    CONSTRAINT "ComponentModel_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "WorkSpaceModel" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ComponentModel_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "FolderModel" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LinkModel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "componentJsId" TEXT,
    "componentCssId" TEXT,
    "workspaceJsId" TEXT,
    "workspaceCssId" TEXT,
    CONSTRAINT "LinkModel_componentJsId_fkey" FOREIGN KEY ("componentJsId") REFERENCES "ComponentModel" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "LinkModel_componentCssId_fkey" FOREIGN KEY ("componentCssId") REFERENCES "ComponentModel" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "LinkModel_workspaceJsId_fkey" FOREIGN KEY ("workspaceJsId") REFERENCES "WorkSpaceModel" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "LinkModel_workspaceCssId_fkey" FOREIGN KEY ("workspaceCssId") REFERENCES "WorkSpaceModel" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FileModel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "componentId" TEXT,
    "workspaceId" TEXT,
    CONSTRAINT "FileModel_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "ComponentModel" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "FileModel_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "WorkSpaceModel" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "FolderModel_folderId_key" ON "FolderModel"("folderId");
