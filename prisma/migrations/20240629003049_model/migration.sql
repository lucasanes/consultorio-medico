-- CreateTable
CREATE TABLE "Code" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,

    CONSTRAINT "Code_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Code" ADD CONSTRAINT "Code_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
