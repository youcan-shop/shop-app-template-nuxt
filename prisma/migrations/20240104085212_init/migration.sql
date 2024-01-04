-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "storeId" TEXT NOT NULL,
    "scope" TEXT,
    "expires" DATETIME,
    "accessToken" TEXT
);
