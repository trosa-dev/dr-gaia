-- CreateTable
CREATE TABLE "loader" (
    "id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "prompt" (
    "id" SERIAL NOT NULL,
    "prompt" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prompt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "response" (
    "id" SERIAL NOT NULL,
    "run_id" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "processing_time" INTEGER NOT NULL,
    "diagnostic_accuracy" BOOLEAN NOT NULL,
    "answer_followed_prompt" BOOLEAN NOT NULL,
    "temperature" INTEGER NOT NULL,
    "error" TEXT NOT NULL,

    CONSTRAINT "response_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admissions" (
    "id" SERIAL NOT NULL,
    "row_id" TEXT NOT NULL,
    "subject_id" TEXT NOT NULL,
    "hadm_id" TEXT NOT NULL,
    "admittime" TEXT NOT NULL,
    "dischtime" TEXT NOT NULL,
    "deathtime" TEXT NOT NULL,
    "admission_type" TEXT NOT NULL,
    "admission_location" TEXT NOT NULL,
    "discharge_location" TEXT NOT NULL,
    "insurance" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "religion" TEXT NOT NULL,
    "marital_status" TEXT NOT NULL,
    "ethnicity" TEXT NOT NULL,
    "edregtime" TEXT NOT NULL,
    "edouttime" TEXT NOT NULL,
    "diagnosis" TEXT NOT NULL,
    "hospital_expire_flag" TEXT NOT NULL,
    "has_chartevents_data" TEXT NOT NULL,

    CONSTRAINT "admissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patients" (
    "id" SERIAL NOT NULL,
    "row_id" TEXT NOT NULL,
    "subject_id" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "dob" TEXT NOT NULL,
    "dod" TEXT NOT NULL,
    "dod_hosp" TEXT NOT NULL,
    "dod_ssn" TEXT NOT NULL,
    "expire_flag" TEXT NOT NULL,

    CONSTRAINT "patients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "diagnoses_icd" (
    "id" SERIAL NOT NULL,
    "row_id" TEXT NOT NULL,
    "subject_id" TEXT NOT NULL,
    "hadm_id" TEXT NOT NULL,
    "seq_num" TEXT NOT NULL,
    "icd9_code" TEXT NOT NULL,

    CONSTRAINT "diagnoses_icd_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "d_icd_diagnoses" (
    "id" SERIAL NOT NULL,
    "row_id" TEXT NOT NULL,
    "icd9_code" TEXT NOT NULL,
    "short_title" TEXT NOT NULL,
    "long_title" TEXT NOT NULL,

    CONSTRAINT "d_icd_diagnoses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "loader_id_key" ON "loader"("id");

-- CreateIndex
CREATE UNIQUE INDEX "prompt_id_key" ON "prompt"("id");

-- CreateIndex
CREATE UNIQUE INDEX "response_id_key" ON "response"("id");

-- CreateIndex
CREATE UNIQUE INDEX "admissions_id_key" ON "admissions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "patients_id_key" ON "patients"("id");

-- CreateIndex
CREATE UNIQUE INDEX "diagnoses_icd_id_key" ON "diagnoses_icd"("id");

-- CreateIndex
CREATE UNIQUE INDEX "d_icd_diagnoses_id_key" ON "d_icd_diagnoses"("id");
