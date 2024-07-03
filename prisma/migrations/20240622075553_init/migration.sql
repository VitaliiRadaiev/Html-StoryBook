/*
  Warnings:

  - You are about to drop the column `scss` on the `ComponentModel` table. All the data in the column will be lost.
  - You are about to drop the column `scss` on the `WorkSpaceModel` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ComponentModel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "workspaceId" TEXT,
    "folderId" TEXT,
    "html" TEXT,
    "css" TEXT,
    "js" TEXT,
    "order" INTEGER NOT NULL,
    CONSTRAINT "ComponentModel_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "WorkSpaceModel" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ComponentModel_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "FolderModel" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ComponentModel" ("folderId", "html", "id", "js", "order", "title", "workspaceId") SELECT "folderId", "html", "id", "js", "order", "title", "workspaceId" FROM "ComponentModel";
DROP TABLE "ComponentModel";
ALTER TABLE "new_ComponentModel" RENAME TO "ComponentModel";
CREATE TABLE "new_WorkSpaceModel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "css" TEXT,
    "js" TEXT,
    "order" INTEGER NOT NULL
);
INSERT INTO "new_WorkSpaceModel" ("id", "js", "order", "title") SELECT "id", "js", "order", "title" FROM "WorkSpaceModel";
DROP TABLE "WorkSpaceModel";
ALTER TABLE "new_WorkSpaceModel" RENAME TO "WorkSpaceModel";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
