-- CreateTable
CREATE TABLE "loader" (
    "id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "concept_relationship_2b" (
    "id" SERIAL NOT NULL,
    "concept_id_1" TEXT NOT NULL,
    "concept_id_2" TEXT NOT NULL,
    "relationship_id" TEXT NOT NULL,
    "valid_start_date" TEXT NOT NULL,
    "valid_end_date" TEXT NOT NULL,
    "invalid_reason" TEXT NOT NULL,

    CONSTRAINT "concept_relationship_2b_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "concept_2b" (
    "id" SERIAL NOT NULL,
    "concept_id" TEXT NOT NULL,
    "concept_name" TEXT NOT NULL,
    "domain_id" TEXT NOT NULL,
    "vocabulary_id" TEXT NOT NULL,
    "concept_class_id" TEXT NOT NULL,
    "standard_concept" TEXT NOT NULL,
    "concept_code" TEXT NOT NULL,
    "valid_start_date" TEXT NOT NULL,
    "valid_end_date" TEXT NOT NULL,
    "invalid_reason" TEXT NOT NULL,

    CONSTRAINT "concept_2b_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vocabulary_2b" (
    "id" SERIAL NOT NULL,
    "vocabulary_id" TEXT NOT NULL,
    "vocabulary_name" TEXT NOT NULL,
    "vocabulary_reference" TEXT NOT NULL,
    "vocabulary_version" TEXT NOT NULL,
    "vocabulary_concept_id" TEXT NOT NULL,

    CONSTRAINT "vocabulary_2b_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attribute_definition" (
    "id" SERIAL NOT NULL,
    "attribute_definition_id" TEXT NOT NULL,
    "attribute_name" TEXT NOT NULL,
    "attribute_description" TEXT NOT NULL,
    "attribute_type_concept_id" TEXT NOT NULL,
    "attribute_syntax" TEXT NOT NULL,

    CONSTRAINT "attribute_definition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "care_site" (
    "id" SERIAL NOT NULL,
    "care_site_id" TEXT NOT NULL,
    "care_site_name" TEXT NOT NULL,
    "place_of_service_concept_id" TEXT NOT NULL,
    "location_id" TEXT NOT NULL,
    "care_site_source_value" TEXT NOT NULL,
    "place_of_service_source_value" TEXT NOT NULL,

    CONSTRAINT "care_site_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cdm_source" (
    "id" SERIAL NOT NULL,
    "cdm_source_name" TEXT NOT NULL,
    "cdm_source_abbreviation" TEXT NOT NULL,
    "cdm_holder" TEXT NOT NULL,
    "source_description" TEXT NOT NULL,
    "source_documentation_reference" TEXT NOT NULL,
    "cdm_etl_reference" TEXT NOT NULL,
    "source_release_date" TEXT NOT NULL,
    "cdm_release_date" TEXT NOT NULL,
    "cdm_version" TEXT NOT NULL,
    "vocabulary_version" TEXT NOT NULL,

    CONSTRAINT "cdm_source_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cohort_attribute" (
    "id" SERIAL NOT NULL,
    "cohort_definition_id" TEXT NOT NULL,
    "subject_id" TEXT NOT NULL,
    "cohort_start_date" TEXT NOT NULL,
    "cohort_end_date" TEXT NOT NULL,
    "attribute_definition_id" TEXT NOT NULL,
    "value_as_number" TEXT NOT NULL,
    "value_as_concept_id" TEXT NOT NULL,

    CONSTRAINT "cohort_attribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cohort_definition" (
    "id" SERIAL NOT NULL,
    "cohort_definition_id" TEXT NOT NULL,
    "cohort_definition_name" TEXT NOT NULL,
    "cohort_definition_description" TEXT NOT NULL,
    "definition_type_concept_id" TEXT NOT NULL,
    "cohort_definition_syntax" TEXT NOT NULL,
    "subject_concept_id" TEXT NOT NULL,
    "cohort_initiation_date" TEXT NOT NULL,

    CONSTRAINT "cohort_definition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cohort" (
    "id" SERIAL NOT NULL,
    "cohort_definition_id" TEXT NOT NULL,
    "subject_id" TEXT NOT NULL,
    "cohort_start_date" TEXT NOT NULL,
    "cohort_end_date" TEXT NOT NULL,

    CONSTRAINT "cohort_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "condition_era" (
    "id" SERIAL NOT NULL,
    "condition_era_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "condition_concept_id" TEXT NOT NULL,
    "condition_era_start_date" TEXT NOT NULL,
    "condition_era_end_date" TEXT NOT NULL,
    "condition_occurrence_count" TEXT NOT NULL,

    CONSTRAINT "condition_era_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "condition_occurrence" (
    "id" SERIAL NOT NULL,
    "condition_occurrence_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "condition_concept_id" TEXT NOT NULL,
    "condition_start_date" TEXT NOT NULL,
    "condition_start_datetime" TEXT NOT NULL,
    "condition_end_date" TEXT NOT NULL,
    "condition_end_datetime" TEXT NOT NULL,
    "condition_type_concept_id" TEXT NOT NULL,
    "stop_reason" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "visit_occurrence_id" TEXT NOT NULL,
    "visit_detail_id" TEXT NOT NULL,
    "condition_source_value" TEXT NOT NULL,
    "condition_source_concept_id" TEXT NOT NULL,
    "condition_status_source_value" TEXT NOT NULL,
    "condition_status_concept_id" TEXT NOT NULL,

    CONSTRAINT "condition_occurrence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cost" (
    "id" SERIAL NOT NULL,
    "cost_id" TEXT NOT NULL,
    "cost_event_id" TEXT NOT NULL,
    "cost_domain_id" TEXT NOT NULL,
    "cost_type_concept_id" TEXT NOT NULL,
    "currency_concept_id" TEXT NOT NULL,
    "total_charge" TEXT NOT NULL,
    "total_cost" TEXT NOT NULL,
    "total_paid" TEXT NOT NULL,
    "paid_by_payer" TEXT NOT NULL,
    "paid_by_patient" TEXT NOT NULL,
    "paid_patient_copay" TEXT NOT NULL,
    "paid_patient_coinsurance" TEXT NOT NULL,
    "paid_patient_deductible" TEXT NOT NULL,
    "paid_by_primary" TEXT NOT NULL,
    "paid_ingredient_cost" TEXT NOT NULL,
    "paid_dispensing_fee" TEXT NOT NULL,
    "payer_plan_period_id" TEXT NOT NULL,
    "amount_allowed" TEXT NOT NULL,
    "revenue_code_concept_id" TEXT NOT NULL,
    "revenue_code_source_value" TEXT NOT NULL,
    "drg_concept_id" TEXT NOT NULL,
    "drg_source_value" TEXT NOT NULL,

    CONSTRAINT "cost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "death" (
    "id" SERIAL NOT NULL,
    "person_id" TEXT NOT NULL,
    "death_date" TEXT NOT NULL,
    "death_datetime" TEXT NOT NULL,
    "death_type_concept_id" TEXT NOT NULL,
    "cause_concept_id" TEXT NOT NULL,
    "cause_source_value" TEXT NOT NULL,
    "cause_source_concept_id" TEXT NOT NULL,

    CONSTRAINT "death_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "device_exposure" (
    "id" SERIAL NOT NULL,
    "device_exposure_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "device_concept_id" TEXT NOT NULL,
    "device_exposure_start_date" TEXT NOT NULL,
    "device_exposure_start_datetime" TEXT NOT NULL,
    "device_exposure_end_date" TEXT NOT NULL,
    "device_exposure_end_datetime" TEXT NOT NULL,
    "device_type_concept_id" TEXT NOT NULL,
    "unique_device_id" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "visit_occurrence_id" TEXT NOT NULL,
    "visit_detail_id" TEXT NOT NULL,
    "device_source_value" TEXT NOT NULL,
    "device_source_concept_id" TEXT NOT NULL,

    CONSTRAINT "device_exposure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dose_era" (
    "id" SERIAL NOT NULL,
    "dose_era_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "drug_concept_id" TEXT NOT NULL,
    "unit_concept_id" TEXT NOT NULL,
    "dose_value" TEXT NOT NULL,
    "dose_era_start_date" TEXT NOT NULL,
    "dose_era_end_date" TEXT NOT NULL,

    CONSTRAINT "dose_era_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "drug_era" (
    "id" SERIAL NOT NULL,
    "drug_era_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "drug_concept_id" TEXT NOT NULL,
    "drug_era_start_date" TEXT NOT NULL,
    "drug_era_end_date" TEXT NOT NULL,
    "drug_exposure_count" TEXT NOT NULL,
    "gap_days" TEXT NOT NULL,

    CONSTRAINT "drug_era_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "drug_exposure" (
    "id" SERIAL NOT NULL,
    "drug_exposure_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "drug_concept_id" TEXT NOT NULL,
    "drug_exposure_start_date" TEXT NOT NULL,
    "drug_exposure_start_datetime" TEXT NOT NULL,
    "drug_exposure_end_date" TEXT NOT NULL,
    "drug_exposure_end_datetime" TEXT NOT NULL,
    "verbatim_end_date" TEXT NOT NULL,
    "drug_type_concept_id" TEXT NOT NULL,
    "stop_reason" TEXT NOT NULL,
    "refills" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "days_supply" TEXT NOT NULL,
    "sig" TEXT NOT NULL,
    "route_concept_id" TEXT NOT NULL,
    "lot_number" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "visit_occurrence_id" TEXT NOT NULL,
    "visit_detail_id" TEXT NOT NULL,
    "drug_source_value" TEXT NOT NULL,
    "drug_source_concept_id" TEXT NOT NULL,
    "route_source_value" TEXT NOT NULL,
    "dose_unit_source_value" TEXT NOT NULL,

    CONSTRAINT "drug_exposure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fact_relationship" (
    "id" SERIAL NOT NULL,
    "domain_concept_id_1" TEXT NOT NULL,
    "fact_id_1" TEXT NOT NULL,
    "domain_concept_id_2" TEXT NOT NULL,
    "fact_id_2" TEXT NOT NULL,
    "relationship_concept_id" TEXT NOT NULL,

    CONSTRAINT "fact_relationship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "location" (
    "id" SERIAL NOT NULL,
    "location_id" TEXT NOT NULL,
    "address_1" TEXT NOT NULL,
    "address_2" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "county" TEXT NOT NULL,
    "location_source_value" TEXT NOT NULL,

    CONSTRAINT "location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "measurement" (
    "id" SERIAL NOT NULL,
    "measurement_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "measurement_concept_id" TEXT NOT NULL,
    "measurement_date" TEXT NOT NULL,
    "measurement_datetime" TEXT NOT NULL,
    "measurement_time" TEXT NOT NULL,
    "measurement_type_concept_id" TEXT NOT NULL,
    "operator_concept_id" TEXT NOT NULL,
    "value_as_number" TEXT NOT NULL,
    "value_as_concept_id" TEXT NOT NULL,
    "unit_concept_id" TEXT NOT NULL,
    "range_low" TEXT NOT NULL,
    "range_high" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "visit_occurrence_id" TEXT NOT NULL,
    "visit_detail_id" TEXT NOT NULL,
    "measurement_source_value" TEXT NOT NULL,
    "measurement_source_concept_id" TEXT NOT NULL,
    "unit_source_value" TEXT NOT NULL,
    "value_source_value" TEXT NOT NULL,

    CONSTRAINT "measurement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "metadata" (
    "id" SERIAL NOT NULL,
    "metadata_concept_id" TEXT NOT NULL,
    "metadata_type_concept_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value_as_string" TEXT NOT NULL,
    "value_as_concept_id" TEXT NOT NULL,
    "metadata_date" TEXT NOT NULL,
    "metadata_datetime" TEXT NOT NULL,

    CONSTRAINT "metadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "note_nlp" (
    "id" SERIAL NOT NULL,
    "note_nlp_id" TEXT NOT NULL,
    "note_id" TEXT NOT NULL,
    "section_concept_id" TEXT NOT NULL,
    "snippet" TEXT NOT NULL,
    "offset" TEXT NOT NULL,
    "lexical_variant" TEXT NOT NULL,
    "note_nlp_concept_id" TEXT NOT NULL,
    "note_nlp_source_concept_id" TEXT NOT NULL,
    "nlp_system" TEXT NOT NULL,
    "nlp_date" TEXT NOT NULL,
    "nlp_datetime" TEXT NOT NULL,
    "term_exists" TEXT NOT NULL,
    "term_temporal" TEXT NOT NULL,
    "term_modifiers" TEXT NOT NULL,

    CONSTRAINT "note_nlp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "note" (
    "id" SERIAL NOT NULL,
    "note_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "note_date" TEXT NOT NULL,
    "note_datetime" TEXT NOT NULL,
    "note_type_concept_id" TEXT NOT NULL,
    "note_class_concept_id" TEXT NOT NULL,
    "note_title" TEXT NOT NULL,
    "note_text" TEXT NOT NULL,
    "encoding_concept_id" TEXT NOT NULL,
    "language_concept_id" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "visit_occurrence_id" TEXT NOT NULL,
    "visit_detail_id" TEXT NOT NULL,
    "note_source_value" TEXT NOT NULL,

    CONSTRAINT "note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "observation_period" (
    "id" SERIAL NOT NULL,
    "observation_period_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "observation_period_start_date" TEXT NOT NULL,
    "observation_period_end_date" TEXT NOT NULL,
    "period_type_concept_id" TEXT NOT NULL,

    CONSTRAINT "observation_period_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "observation" (
    "id" SERIAL NOT NULL,
    "observation_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "observation_concept_id" TEXT NOT NULL,
    "observation_date" TEXT NOT NULL,
    "observation_datetime" TEXT NOT NULL,
    "observation_type_concept_id" TEXT NOT NULL,
    "value_as_number" TEXT NOT NULL,
    "value_as_string" TEXT NOT NULL,
    "value_as_concept_id" TEXT NOT NULL,
    "qualifier_concept_id" TEXT NOT NULL,
    "unit_concept_id" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "visit_occurrence_id" TEXT NOT NULL,
    "visit_detail_id" TEXT NOT NULL,
    "observation_source_value" TEXT NOT NULL,
    "observation_source_concept_id" TEXT NOT NULL,
    "unit_source_value" TEXT NOT NULL,
    "qualifier_source_value" TEXT NOT NULL,

    CONSTRAINT "observation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payer_plan_period" (
    "id" SERIAL NOT NULL,
    "payer_plan_period_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "payer_plan_period_start_date" TEXT NOT NULL,
    "payer_plan_period_end_date" TEXT NOT NULL,
    "payer_concept_id" TEXT NOT NULL,
    "payer_source_value" TEXT NOT NULL,
    "payer_source_concept_id" TEXT NOT NULL,
    "plan_concept_id" TEXT NOT NULL,
    "plan_source_value" TEXT NOT NULL,
    "plan_source_concept_id" TEXT NOT NULL,
    "sponsor_concept_id" TEXT NOT NULL,
    "sponsor_source_value" TEXT NOT NULL,
    "sponsor_source_concept_id" TEXT NOT NULL,
    "family_source_value" TEXT NOT NULL,
    "stop_reason_concept_id" TEXT NOT NULL,
    "stop_reason_source_value" TEXT NOT NULL,
    "stop_reason_source_concept_id" TEXT NOT NULL,

    CONSTRAINT "payer_plan_period_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "person" (
    "id" SERIAL NOT NULL,
    "person_id" TEXT NOT NULL,
    "gender_concept_id" TEXT NOT NULL,
    "year_of_birth" TEXT NOT NULL,
    "month_of_birth" TEXT NOT NULL,
    "day_of_birth" TEXT NOT NULL,
    "birth_datetime" TEXT NOT NULL,
    "race_concept_id" TEXT NOT NULL,
    "ethnicity_concept_id" TEXT NOT NULL,
    "location_id" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "care_site_id" TEXT NOT NULL,
    "person_source_value" TEXT NOT NULL,
    "gender_source_value" TEXT NOT NULL,
    "gender_source_concept_id" TEXT NOT NULL,
    "race_source_value" TEXT NOT NULL,
    "race_source_concept_id" TEXT NOT NULL,
    "ethnicity_source_value" TEXT NOT NULL,
    "ethnicity_source_concept_id" TEXT NOT NULL,

    CONSTRAINT "person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "procedure_occurrence" (
    "id" SERIAL NOT NULL,
    "procedure_occurrence_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "procedure_concept_id" TEXT NOT NULL,
    "procedure_date" TEXT NOT NULL,
    "procedure_datetime" TEXT NOT NULL,
    "procedure_type_concept_id" TEXT NOT NULL,
    "modifier_concept_id" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "visit_occurrence_id" TEXT NOT NULL,
    "visit_detail_id" TEXT NOT NULL,
    "procedure_source_value" TEXT NOT NULL,
    "procedure_source_concept_id" TEXT NOT NULL,
    "modifier_source_value" TEXT NOT NULL,

    CONSTRAINT "procedure_occurrence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "provider" (
    "id" SERIAL NOT NULL,
    "provider_id" TEXT NOT NULL,
    "provider_name" TEXT NOT NULL,
    "npi" TEXT NOT NULL,
    "dea" TEXT NOT NULL,
    "specialty_concept_id" TEXT NOT NULL,
    "care_site_id" TEXT NOT NULL,
    "year_of_birth" TEXT NOT NULL,
    "gender_concept_id" TEXT NOT NULL,
    "provider_source_value" TEXT NOT NULL,
    "specialty_source_value" TEXT NOT NULL,
    "specialty_source_concept_id" TEXT NOT NULL,
    "gender_source_value" TEXT NOT NULL,
    "gender_source_concept_id" TEXT NOT NULL,

    CONSTRAINT "provider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "specimen" (
    "id" SERIAL NOT NULL,
    "specimen_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "specimen_concept_id" TEXT NOT NULL,
    "specimen_type_concept_id" TEXT NOT NULL,
    "specimen_date" TEXT NOT NULL,
    "specimen_datetime" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "unit_concept_id" TEXT NOT NULL,
    "anatomic_site_concept_id" TEXT NOT NULL,
    "disease_status_concept_id" TEXT NOT NULL,
    "specimen_source_id" TEXT NOT NULL,
    "specimen_source_value" TEXT NOT NULL,
    "unit_source_value" TEXT NOT NULL,
    "anatomic_site_source_value" TEXT NOT NULL,
    "disease_status_source_value" TEXT NOT NULL,

    CONSTRAINT "specimen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visit_detail" (
    "id" SERIAL NOT NULL,
    "visit_detail_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "visit_detail_concept_id" TEXT NOT NULL,
    "visit_detail_start_date" TEXT NOT NULL,
    "visit_detail_start_datetime" TEXT NOT NULL,
    "visit_detail_end_date" TEXT NOT NULL,
    "visit_detail_end_datetime" TEXT NOT NULL,
    "visit_detail_type_concept_id" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "care_site_id" TEXT NOT NULL,
    "admitting_source_concept_id" TEXT NOT NULL,
    "discharge_to_concept_id" TEXT NOT NULL,
    "preceding_visit_detail_id" TEXT NOT NULL,
    "visit_detail_source_value" TEXT NOT NULL,
    "visit_detail_source_concept_id" TEXT NOT NULL,
    "admitting_source_value" TEXT NOT NULL,
    "discharge_to_source_value" TEXT NOT NULL,
    "visit_detail_parent_id" TEXT NOT NULL,
    "visit_occurrence_id" TEXT NOT NULL,

    CONSTRAINT "visit_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visit_occurrence" (
    "id" SERIAL NOT NULL,
    "visit_occurrence_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "visit_concept_id" TEXT NOT NULL,
    "visit_start_date" TEXT NOT NULL,
    "visit_start_datetime" TEXT NOT NULL,
    "visit_end_date" TEXT NOT NULL,
    "visit_end_datetime" TEXT NOT NULL,
    "visit_type_concept_id" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "care_site_id" TEXT NOT NULL,
    "visit_source_value" TEXT NOT NULL,
    "visit_source_concept_id" TEXT NOT NULL,
    "admitting_source_concept_id" TEXT NOT NULL,
    "admitting_source_value" TEXT NOT NULL,
    "discharge_to_concept_id" TEXT NOT NULL,
    "discharge_to_source_value" TEXT NOT NULL,
    "preceding_visit_occurrence_id" TEXT NOT NULL,

    CONSTRAINT "visit_occurrence_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "loader_id_key" ON "loader"("id");
