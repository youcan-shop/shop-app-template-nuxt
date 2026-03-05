-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "store" TEXT NOT NULL,
    "scope" TEXT,
    "accessToken" TEXT,
    "registeredWebhooks" TEXT
);
