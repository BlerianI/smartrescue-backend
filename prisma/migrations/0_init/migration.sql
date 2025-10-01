-- CreateTable
CREATE TABLE "access_logs" (
    "access_id" UUID NOT NULL,
    "access_time" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "access_location" TEXT NOT NULL DEFAULT 'unknown',
    "profile_id" UUID,

    CONSTRAINT "access_logs_pkey" PRIMARY KEY ("access_id")
);

-- CreateTable
CREATE TABLE "allergies" (
    "allergy_id" UUID NOT NULL,
    "allergy_name" TEXT NOT NULL,
    "note" TEXT,
    "med_id" UUID,

    CONSTRAINT "allergies_pkey" PRIMARY KEY ("allergy_id")
);

-- CreateTable
CREATE TABLE "doctors" (
    "doctor_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "specialty" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "house_number" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "profile_id" UUID,

    CONSTRAINT "doctors_pkey" PRIMARY KEY ("doctor_id")
);

-- CreateTable
CREATE TABLE "documents" (
    "document_id" UUID NOT NULL,
    "document_title" TEXT NOT NULL,
    "document_url" TEXT NOT NULL,
    "uploaded_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "med_id" UUID,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("document_id")
);

-- CreateTable
CREATE TABLE "emergency_contacts" (
    "contact_id" UUID NOT NULL,
    "last_name" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "relationship" TEXT NOT NULL,
    "note" TEXT,
    "priority" INTEGER NOT NULL,
    "profile_id" UUID,

    CONSTRAINT "emergency_contacts_pkey" PRIMARY KEY ("contact_id")
);

-- CreateTable
CREATE TABLE "login_logs" (
    "log_id" UUID NOT NULL,
    "attempt_time" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "success" BOOLEAN NOT NULL,
    "failure_reason" TEXT DEFAULT 'none',
    "user_id" UUID,

    CONSTRAINT "login_logs_pkey" PRIMARY KEY ("log_id")
);

-- CreateTable
CREATE TABLE "med_conditions" (
    "condition_id" UUID NOT NULL,
    "condition_name" TEXT NOT NULL,
    "note" TEXT,
    "diagnosed_since" TEXT NOT NULL,
    "med_id" UUID,

    CONSTRAINT "med_conditions_pkey" PRIMARY KEY ("condition_id")
);

-- CreateTable
CREATE TABLE "medical_datas" (
    "med_id" UUID NOT NULL,
    "key_info" TEXT,
    "profile_id" UUID,

    CONSTRAINT "medical_datas_pkey" PRIMARY KEY ("med_id")
);

-- CreateTable
CREATE TABLE "medications" (
    "medication_id" UUID NOT NULL,
    "med_name" TEXT NOT NULL,
    "dosage" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "note" TEXT,
    "med_id" UUID,

    CONSTRAINT "medications_pkey" PRIMARY KEY ("medication_id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "profile_id" UUID NOT NULL,
    "external_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gender" TEXT NOT NULL,
    "birthdate" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "height" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "blood_type" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "house_number" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "user_id" UUID,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("profile_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" UUID NOT NULL,
    "last_login" TIMESTAMP(6) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" VARCHAR(32),
    "email" VARCHAR(254) NOT NULL,
    "password" TEXT NOT NULL,
    "role" VARCHAR(5) NOT NULL DEFAULT 'user',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "avatar_url" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_external_id_key" ON "profiles"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "access_logs" ADD CONSTRAINT "access_logs_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("profile_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "allergies" ADD CONSTRAINT "allergies_med_id_fkey" FOREIGN KEY ("med_id") REFERENCES "medical_datas"("med_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("profile_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_med_id_fkey" FOREIGN KEY ("med_id") REFERENCES "medical_datas"("med_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "emergency_contacts" ADD CONSTRAINT "emergency_contacts_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("profile_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "login_logs" ADD CONSTRAINT "login_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "med_conditions" ADD CONSTRAINT "med_conditions_med_id_fkey" FOREIGN KEY ("med_id") REFERENCES "medical_datas"("med_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "medical_datas" ADD CONSTRAINT "medical_datas_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("profile_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "medications" ADD CONSTRAINT "medications_med_id_fkey" FOREIGN KEY ("med_id") REFERENCES "medical_datas"("med_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

