import { v1 as uuid } from "uuid";
import patients from "../../data/patients.ts";
import type {
  Patient,
  NonSensitivePatient,
  NewPatient,
  NewEntry,
  Entry,
} from "../types.ts";

const findById = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id);
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry,
    entries: [],
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patient: Patient, entry: NewEntry): Entry => {
  const newEntry = { ...entry, id: uuid() } as Entry;
  patient.entries.push(newEntry);
  return newEntry;
};

export default { getNonSensitiveEntries, addPatient, findById, addEntry };
