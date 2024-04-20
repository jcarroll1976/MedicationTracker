import { ObjectId } from "mongodb";

export interface MedicationList {
    allMedications: Medication[]
}

export interface Medication {
    id?: ObjectId;
    name: string;
    dosage: number;
    frequency: string;
    refillDate: Date;
    instructions?: string;
    sideEffects?: string[];
}

export interface DosageLog {
    id?: ObjectId;
    medicationId: string;
    date: Date;
    time: string;
}

export interface User {
    id?: ObjectId;
    name: string;
    email: string;
    password: string;
}