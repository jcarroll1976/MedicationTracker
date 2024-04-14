import { ObjectId } from "mongodb";

export interface MedicationList {
    allMedications: Medication[]
}

export interface Medication {
    id?: ObjectId;
    name: string;
    dosage: number;
    frequency: string;
    refillDate: string;
    instructions: string;
    sideEffects: string;
}

export interface DosageLog {
    id?: string;
    medicationId: string;
    date: string;
    time: string;
}