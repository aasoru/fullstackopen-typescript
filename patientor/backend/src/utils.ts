import { NewPatientSchema } from "./types.ts";
import type { NewPatient } from "./types.ts";

const toNewPatient = (object: unknown): NewPatient => {
  return NewPatientSchema.parse(object);
};

export default toNewPatient;
