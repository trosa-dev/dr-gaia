-- CreateTable
CREATE TABLE "response" (
    "id" SERIAL NOT NULL,
    "run_id" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "processing_time" INTEGER NOT NULL,
    "diagnostic_accuracy" BOOLEAN NOT NULL,
    "answer_followed_prompt" BOOLEAN NOT NULL,

    CONSTRAINT "response_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "response_id_key" ON "response"("id");
