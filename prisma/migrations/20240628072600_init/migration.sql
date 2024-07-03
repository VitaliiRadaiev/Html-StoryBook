-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ComponentModel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "workspaceId" TEXT,
    "folderId" TEXT,
    "html" TEXT,
    "scss" TEXT,
    "js" TEXT,
    "order" INTEGER NOT NULL,
    CONSTRAINT "ComponentModel_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "WorkSpaceModel" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ComponentModel_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "FolderModel" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ComponentModel" ("folderId", "html", "id", "js", "order", "scss", "title", "workspaceId") SELECT "folderId", "html", "id", "js", "order", "scss", "title", "workspaceId" FROM "ComponentModel";
DROP TABLE "ComponentModel";
ALTER TABLE "new_ComponentModel" RENAME TO "ComponentModel";
CREATE TABLE "new_FileModel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "componentId" TEXT,
    "workspaceId" TEXT,
    CONSTRAINT "FileModel_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "ComponentModel" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FileModel_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "WorkSpaceModel" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_FileModel" ("componentId", "id", "type", "url", "workspaceId") SELECT "componentId", "id", "type", "url", "workspaceId" FROM "FileModel";
DROP TABLE "FileModel";
ALTER TABLE "new_FileModel" RENAME TO "FileModel";
CREATE TABLE "new_FolderModel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "workspaceId" TEXT,
    "folderId" TEXT,
    "order" INTEGER NOT NULL,
    CONSTRAINT "FolderModel_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "WorkSpaceModel" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FolderModel_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "FolderModel" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_FolderModel" ("folderId", "id", "order", "title", "workspaceId") SELECT "folderId", "id", "order", "title", "workspaceId" FROM "FolderModel";
DROP TABLE "FolderModel";
ALTER TABLE "new_FolderModel" RENAME TO "FolderModel";
CREATE UNIQUE INDEX "FolderModel_folderId_key" ON "FolderModel"("folderId");
CREATE TABLE "new_LinkModel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "componentJsId" TEXT,
    "componentCssId" TEXT,
    "workspaceJsId" TEXT,
    "workspaceCssId" TEXT,
    CONSTRAINT "LinkModel_componentJsId_fkey" FOREIGN KEY ("componentJsId") REFERENCES "ComponentModel" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "LinkModel_componentCssId_fkey" FOREIGN KEY ("componentCssId") REFERENCES "ComponentModel" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "LinkModel_workspaceJsId_fkey" FOREIGN KEY ("workspaceJsId") REFERENCES "WorkSpaceModel" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "LinkModel_workspaceCssId_fkey" FOREIGN KEY ("workspaceCssId") REFERENCES "WorkSpaceModel" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_LinkModel" ("componentCssId", "componentJsId", "id", "url", "workspaceCssId", "workspaceJsId") SELECT "componentCssId", "componentJsId", "id", "url", "workspaceCssId", "workspaceJsId" FROM "LinkModel";
DROP TABLE "LinkModel";
ALTER TABLE "new_LinkModel" RENAME TO "LinkModel";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
