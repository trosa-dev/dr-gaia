-- CreateTable
CREATE TABLE "loader" (
    "id" TEXT NOT NULL
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
CREATE TABLE "callout" (
    "id" SERIAL NOT NULL,
    "row_id" TEXT NOT NULL,
    "subject_id" TEXT NOT NULL,
    "hadm_id" TEXT NOT NULL,
    "submit_wardid" TEXT NOT NULL,
    "submit_careunit" TEXT NOT NULL,
    "curr_wardid" TEXT NOT NULL,
    "curr_careunit" TEXT NOT NULL,
    "callout_wardid" TEXT NOT NULL,
    "callout_service" TEXT NOT NULL,
    "request_tele" TEXT NOT NULL,
    "request_resp" TEXT NOT NULL,
    "request_cdiff" TEXT NOT NULL,
    "request_mrsa" TEXT NOT NULL,
    "request_vre" TEXT NOT NULL,
    "callout_status" TEXT NOT NULL,
    "callout_outcome" TEXT NOT NULL,
    "discharge_wardid" TEXT NOT NULL,
    "acknowledge_status" TEXT NOT NULL,
    "createtime" TEXT NOT NULL,
    "updatetime" TEXT NOT NULL,
    "acknowledgetime" TEXT NOT NULL,
    "outcometime" TEXT NOT NULL,
    "firstreservationtime" TEXT NOT NULL,
    "currentreservationtime" TEXT NOT NULL,

    CONSTRAINT "callout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "caregivers" (
    "id" SERIAL NOT NULL,
    "row_id" TEXT NOT NULL,
    "cgid" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "caregivers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chartevents" (
    "id" SERIAL NOT NULL,
    "row_id" TEXT NOT NULL,
    "subject_id" TEXT NOT NULL,
    "hadm_id" TEXT NOT NULL,
    "icustay_id" TEXT NOT NULL,
    "itemid" TEXT NOT NULL,
    "charttime" TEXT NOT NULL,
    "storetime" TEXT NOT NULL,
    "cgid" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "valuenum" TEXT NOT NULL,
    "valueuom" TEXT NOT NULL,
    "warning" TEXT NOT NULL,
    "error" TEXT NOT NULL,
    "resultstatus" TEXT NOT NULL,
    "stopped" TEXT NOT NULL,

    CONSTRAINT "chartevents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cptevents" (
    "id" SERIAL NOT NULL,
    "row_id" TEXT NOT NULL,
    "subject_id" TEXT NOT NULL,
    "hadm_id" TEXT NOT NULL,
    "costcenter" TEXT NOT NULL,
    "chartdate" TEXT NOT NULL,
    "cpt_cd" TEXT NOT NULL,
    "cpt_number" TEXT NOT NULL,
    "cpt_suffix" TEXT NOT NULL,
    "ticket_id_seq" TEXT NOT NULL,
    "sectionheader" TEXT NOT NULL,
    "subsectionheader" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "cptevents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "d_cpt" (
    "id" SERIAL NOT NULL,
    "row_id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "sectionrange" TEXT NOT NULL,
    "sectionheader" TEXT NOT NULL,
    "subsectionrange" TEXT NOT NULL,
    "subsectionheader" TEXT NOT NULL,
    "codesuffix" TEXT NOT NULL,
    "mincodeinsubsection" TEXT NOT NULL,
    "maxcodeinsubsection" TEXT NOT NULL,

    CONSTRAINT "d_cpt_pkey" PRIMARY KEY ("id")
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

-- CreateTable
CREATE TABLE "d_icd_procedures" (
    "id" SERIAL NOT NULL,
    "row_id" TEXT NOT NULL,
    "icd9_code" TEXT NOT NULL,
    "short_title" TEXT NOT NULL,
    "long_title" TEXT NOT NULL,

    CONSTRAINT "d_icd_procedures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "d_items" (
    "id" SERIAL NOT NULL,
    "row_id" TEXT NOT NULL,
    "itemid" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,
    "dbsource" TEXT NOT NULL,
    "linksto" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "unitname" TEXT NOT NULL,
    "param_type" TEXT NOT NULL,
    "conceptid" TEXT NOT NULL,

    CONSTRAINT "d_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "d_labitems" (
    "id" SERIAL NOT NULL,
    "row_id" TEXT NOT NULL,
    "itemid" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "fluid" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "loinc_code" TEXT NOT NULL,

    CONSTRAINT "d_labitems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "datetimeevents" (
    "id" SERIAL NOT NULL,
    "row_id" TEXT NOT NULL,
    "subject_id" TEXT NOT NULL,
    "hadm_id" TEXT NOT NULL,
    "icustay_id" TEXT NOT NULL,
    "itemid" TEXT NOT NULL,
    "charttime" TEXT NOT NULL,
    "storetime" TEXT NOT NULL,
    "cgid" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "valueuom" TEXT NOT NULL,
    "warning" TEXT NOT NULL,
    "error" TEXT NOT NULL,
    "resultstatus" TEXT NOT NULL,
    "stopped" TEXT NOT NULL,

    CONSTRAINT "datetimeevents_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "drgcodes" (
    "id" SERIAL NOT NULL,
    "row_id" TEXT NOT NULL,
    "subject_id" TEXT NOT NULL,
    "hadm_id" TEXT NOT NULL,
    "drg_type" TEXT NOT NULL,
    "drg_code" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "drg_severity" TEXT NOT NULL,
    "drg_mortality" TEXT NOT NULL,

    CONSTRAINT "drgcodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "icustays" (
    "id" SERIAL NOT NULL,
    "row_id" TEXT NOT NULL,
    "subject_id" TEXT NOT NULL,
    "hadm_id" TEXT NOT NULL,
    "icustay_id" TEXT NOT NULL,
    "dbsource" TEXT NOT NULL,
    "first_careunit" TEXT NOT NULL,
    "last_careunit" TEXT NOT NULL,
    "first_wardid" TEXT NOT NULL,
    "last_wardid" TEXT NOT NULL,
    "intime" TEXT NOT NULL,
    "outtime" TEXT NOT NULL,
    "los" TEXT NOT NULL,

    CONSTRAINT "icustays_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inputevents_cv" (
    "id" SERIAL NOT NULL,
    "row_id" TEXT NOT NULL,
    "subject_id" TEXT NOT NULL,
    "hadm_id" TEXT NOT NULL,
    "icustay_id" TEXT NOT NULL,
    "charttime" TEXT NOT NULL,
    "itemid" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "amountuom" TEXT NOT NULL,
    "rate" TEXT NOT NULL,
    "rateuom" TEXT NOT NULL,
    "storetime" TEXT NOT NULL,
    "cgid" TEXT NOT NULL,
    "orderid" TEXT NOT NULL,
    "linkorderid" TEXT NOT NULL,
    "stopped" TEXT NOT NULL,
    "newbottle" TEXT NOT NULL,
    "originalamount" TEXT NOT NULL,
    "originalamountuom" TEXT NOT NULL,
    "originalroute" TEXT NOT NULL,
    "originalrate" TEXT NOT NULL,
    "originalrateuom" TEXT NOT NULL,
    "originalsite" TEXT NOT NULL,

    CONSTRAINT "inputevents_cv_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inputevents_mv" (
    "id" SERIAL NOT NULL,
    "row_id" TEXT NOT NULL,
    "subject_id" TEXT NOT NULL,
    "hadm_id" TEXT NOT NULL,
    "icustay_id" TEXT NOT NULL,
    "starttime" TEXT NOT NULL,
    "endtime" TEXT NOT NULL,
    "itemid" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "amountuom" TEXT NOT NULL,
    "rate" TEXT NOT NULL,
    "rateuom" TEXT NOT NULL,
    "storetime" TEXT NOT NULL,
    "cgid" TEXT NOT NULL,
    "orderid" TEXT NOT NULL,
    "linkorderid" TEXT NOT NULL,
    "ordercategoryname" TEXT NOT NULL,
    "secondaryordercategoryname" TEXT NOT NULL,
    "ordercomponenttypedescription" TEXT NOT NULL,
    "ordercategorydescription" TEXT NOT NULL,
    "patientweight" TEXT NOT NULL,
    "totalamount" TEXT NOT NULL,
    "totalamountuom" TEXT NOT NULL,
    "isopenbag" TEXT NOT NULL,
    "continueinnextdept" TEXT NOT NULL,
    "cancelreason" TEXT NOT NULL,
    "statusdescription" TEXT NOT NULL,
    "comments_editedby" TEXT NOT NULL,
    "comments_canceledby" TEXT NOT NULL,
    "comments_date" TEXT NOT NULL,
    "originalamount" TEXT NOT NULL,
    "originalrate" TEXT NOT NULL,

    CONSTRAINT "inputevents_mv_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "labevents" (
    "id" SERIAL NOT NULL,
    "row_id" TEXT NOT NULL,
    "subject_id" TEXT NOT NULL,
    "hadm_id" TEXT NOT NULL,
    "itemid" TEXT NOT NULL,
    "charttime" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "valuenum" TEXT NOT NULL,
    "valueuom" TEXT NOT NULL,
    "flag" TEXT NOT NULL,

    CONSTRAINT "labevents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "microbiologyevents" (
    "id" SERIAL NOT NULL,
    "row_id" TEXT NOT NULL,
    "subject_id" TEXT NOT NULL,
    "hadm_id" TEXT NOT NULL,
    "chartdate" TEXT NOT NULL,
    "charttime" TEXT NOT NULL,
    "spec_itemid" TEXT NOT NULL,
    "spec_type_desc" TEXT NOT NULL,
    "org_itemid" TEXT NOT NULL,
    "org_name" TEXT NOT NULL,
    "isolate_num" TEXT NOT NULL,
    "ab_itemid" TEXT NOT NULL,
    "ab_name" TEXT NOT NULL,
    "dilution_text" TEXT NOT NULL,
    "dilution_comparison" TEXT NOT NULL,
    "dilution_value" TEXT NOT NULL,
    "interpretation" TEXT NOT NULL,

    CONSTRAINT "microbiologyevents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "noteevents" (
    "id" SERIAL NOT NULL,
    "row_id" TEXT NOT NULL,
    "subject_id" TEXT NOT NULL,
    "hadm_id" TEXT NOT NULL,
    "chartdate" TEXT NOT NULL,
    "charttime" TEXT NOT NULL,
    "storetime" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cgid" TEXT NOT NULL,
    "iserror" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "noteevents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "outputevents" (
    "id" SERIAL NOT NULL,
    "row_id" TEXT NOT NULL,
    "subject_id" TEXT NOT NULL,
    "hadm_id" TEXT NOT NULL,
    "icustay_id" TEXT NOT NULL,
    "charttime" TEXT NOT NULL,
    "itemid" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "valueuom" TEXT NOT NULL,
    "storetime" TEXT NOT NULL,
    "cgid" TEXT NOT NULL,
    "stopped" TEXT NOT NULL,
    "newbottle" TEXT NOT NULL,
    "iserror" TEXT NOT NULL,

    CONSTRAINT "outputevents_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "prescriptions" (
    "id" SERIAL NOT NULL,
    "row_id" TEXT NOT NULL,
    "subject_id" TEXT NOT NULL,
    "hadm_id" TEXT NOT NULL,
    "icustay_id" TEXT NOT NULL,
    "startdate" TEXT NOT NULL,
    "enddate" TEXT NOT NULL,
    "drug_type" TEXT NOT NULL,
    "drug" TEXT NOT NULL,
    "drug_name_poe" TEXT NOT NULL,
    "drug_name_generic" TEXT NOT NULL,
    "formulary_drug_cd" TEXT NOT NULL,
    "gsn" TEXT NOT NULL,
    "ndc" TEXT NOT NULL,
    "prod_strength" TEXT NOT NULL,
    "dose_val_rx" TEXT NOT NULL,
    "dose_unit_rx" TEXT NOT NULL,
    "form_val_disp" TEXT NOT NULL,
    "form_unit_disp" TEXT NOT NULL,
    "route" TEXT NOT NULL,

    CONSTRAINT "prescriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "procedureevents_mv" (
    "id" SERIAL NOT NULL,
    "row_id" TEXT NOT NULL,
    "subject_id" TEXT NOT NULL,
    "hadm_id" TEXT NOT NULL,
    "icustay_id" TEXT NOT NULL,
    "starttime" TEXT NOT NULL,
    "endtime" TEXT NOT NULL,
    "itemid" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "valueuom" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "locationcategory" TEXT NOT NULL,
    "storetime" TEXT NOT NULL,
    "cgid" TEXT NOT NULL,
    "orderid" TEXT NOT NULL,
    "linkorderid" TEXT NOT NULL,
    "ordercategoryname" TEXT NOT NULL,
    "secondaryordercategoryname" TEXT NOT NULL,
    "ordercategorydescription" TEXT NOT NULL,
    "isopenbag" TEXT NOT NULL,
    "continueinnextdept" TEXT NOT NULL,
    "cancelreason" TEXT NOT NULL,
    "statusdescription" TEXT NOT NULL,
    "comments_editedby" TEXT NOT NULL,
    "comments_canceledby" TEXT NOT NULL,
    "comments_date" TEXT NOT NULL,

    CONSTRAINT "procedureevents_mv_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "procedures_icd" (
    "id" SERIAL NOT NULL,
    "row_id" TEXT NOT NULL,
    "subject_id" TEXT NOT NULL,
    "hadm_id" TEXT NOT NULL,
    "seq_num" TEXT NOT NULL,
    "icd9_code" TEXT NOT NULL,

    CONSTRAINT "procedures_icd_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" SERIAL NOT NULL,
    "row_id" TEXT NOT NULL,
    "subject_id" TEXT NOT NULL,
    "hadm_id" TEXT NOT NULL,
    "transfertime" TEXT NOT NULL,
    "prev_service" TEXT NOT NULL,
    "curr_service" TEXT NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transfers" (
    "id" SERIAL NOT NULL,
    "row_id" TEXT NOT NULL,
    "subject_id" TEXT NOT NULL,
    "hadm_id" TEXT NOT NULL,
    "icustay_id" TEXT NOT NULL,
    "dbsource" TEXT NOT NULL,
    "eventtype" TEXT NOT NULL,
    "prev_careunit" TEXT NOT NULL,
    "curr_careunit" TEXT NOT NULL,
    "prev_wardid" TEXT NOT NULL,
    "curr_wardid" TEXT NOT NULL,
    "intime" TEXT NOT NULL,
    "outtime" TEXT NOT NULL,
    "los" TEXT NOT NULL,

    CONSTRAINT "transfers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "loader_id_key" ON "loader"("id");

-- CreateIndex
CREATE UNIQUE INDEX "admissions_id_key" ON "admissions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "callout_id_key" ON "callout"("id");

-- CreateIndex
CREATE UNIQUE INDEX "caregivers_id_key" ON "caregivers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "chartevents_id_key" ON "chartevents"("id");

-- CreateIndex
CREATE UNIQUE INDEX "cptevents_id_key" ON "cptevents"("id");

-- CreateIndex
CREATE UNIQUE INDEX "d_cpt_id_key" ON "d_cpt"("id");

-- CreateIndex
CREATE UNIQUE INDEX "d_icd_diagnoses_id_key" ON "d_icd_diagnoses"("id");

-- CreateIndex
CREATE UNIQUE INDEX "d_icd_procedures_id_key" ON "d_icd_procedures"("id");

-- CreateIndex
CREATE UNIQUE INDEX "d_items_id_key" ON "d_items"("id");

-- CreateIndex
CREATE UNIQUE INDEX "d_labitems_id_key" ON "d_labitems"("id");

-- CreateIndex
CREATE UNIQUE INDEX "datetimeevents_id_key" ON "datetimeevents"("id");

-- CreateIndex
CREATE UNIQUE INDEX "diagnoses_icd_id_key" ON "diagnoses_icd"("id");

-- CreateIndex
CREATE UNIQUE INDEX "drgcodes_id_key" ON "drgcodes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "icustays_id_key" ON "icustays"("id");

-- CreateIndex
CREATE UNIQUE INDEX "inputevents_cv_id_key" ON "inputevents_cv"("id");

-- CreateIndex
CREATE UNIQUE INDEX "inputevents_mv_id_key" ON "inputevents_mv"("id");

-- CreateIndex
CREATE UNIQUE INDEX "labevents_id_key" ON "labevents"("id");

-- CreateIndex
CREATE UNIQUE INDEX "microbiologyevents_id_key" ON "microbiologyevents"("id");

-- CreateIndex
CREATE UNIQUE INDEX "noteevents_id_key" ON "noteevents"("id");

-- CreateIndex
CREATE UNIQUE INDEX "outputevents_id_key" ON "outputevents"("id");

-- CreateIndex
CREATE UNIQUE INDEX "patients_id_key" ON "patients"("id");

-- CreateIndex
CREATE UNIQUE INDEX "prescriptions_id_key" ON "prescriptions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "procedureevents_mv_id_key" ON "procedureevents_mv"("id");

-- CreateIndex
CREATE UNIQUE INDEX "procedures_icd_id_key" ON "procedures_icd"("id");

-- CreateIndex
CREATE UNIQUE INDEX "services_id_key" ON "services"("id");

-- CreateIndex
CREATE UNIQUE INDEX "transfers_id_key" ON "transfers"("id");
