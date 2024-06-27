/*
  Warnings:

  - You are about to drop the `_PacienteConsulta` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PacienteConsulta" DROP CONSTRAINT "_PacienteConsulta_A_fkey";

-- DropForeignKey
ALTER TABLE "_PacienteConsulta" DROP CONSTRAINT "_PacienteConsulta_B_fkey";

-- DropTable
DROP TABLE "_PacienteConsulta";

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "street" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "complement" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatientAppointment" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "appointmentId" INTEGER NOT NULL,

    CONSTRAINT "PatientAppointment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PatientAppointment" ADD CONSTRAINT "PatientAppointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientAppointment" ADD CONSTRAINT "PatientAppointment_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
