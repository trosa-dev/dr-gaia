-- CreateTable
CREATE TABLE "prompt" (
    "id" SERIAL NOT NULL,
    "prompt" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prompt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "prompt_id_key" ON "prompt"("id");
