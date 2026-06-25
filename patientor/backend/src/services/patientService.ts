import { v1 as uuid } from "uuid";
import patients from "../../data/patients.ts";
import type { Patient, NonSensitivePatient, NewPatient } from "../types.ts";

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
  };

  patients.push(newPatient);
  return newPatient;
};

export default { getNonSensitiveEntries, addPatient };
