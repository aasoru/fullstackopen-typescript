import express, { type Response } from "express";
import { z } from "zod";
import patientService from "../services/patientService.ts";
import toNewPatient from "../utils.ts";
import type { NonSensitivePatient, Patient } from "../types.ts";
import { NewEntrySchema } from "../types.ts";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: "Unknown error" });
    }
  }
});

router.get("/:id", (req, res: Response<Patient | string>) => {
  const patient = patientService.findById(req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).send("Patient not found");
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const patient = patientService.findById(req.params.id);
    if (!patient) {
      res.status(404).send("Patient not found");
      return;
    }
    const newEntry = NewEntrySchema.parse(req.body);
    const addedEntry = patientService.addEntry(patient, newEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: "Unknown error" });
    }
  }
});

export default router;
