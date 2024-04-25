import { ObjectId } from "mongodb";

export interface MedicationList {
    allMedications: Medication[]
}

export interface Medication {
    id: ObjectId;
    name: string;
    dosage: number;
    frequency: string;
    refillDate: Date;
    instructions?: string;
    sideEffects?: string[];
    userId: string;
}

export interface DosageLog {
    id?: ObjectId;
    medicationId: string;
    dosage: number
    date: Date;
    time: string;
}

export interface User {
    userId: ObjectId;
    name: string;
    email: string;
    
}