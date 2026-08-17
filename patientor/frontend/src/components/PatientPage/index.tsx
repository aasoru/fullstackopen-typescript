import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import axios from "axios";

import patientService from "../../services/patients";
import { Patient, Gender, Diagnosis, NewEntry } from "../../types";
import EntryDetails from "./EntryDetails";
import AddEntryForm from "./AddEntryForm";

interface Props {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: Props) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [error, setError] = useState<string>();

  const submitEntry = async (entry: NewEntry) => {
    try {
      if (!patient) return;
      const newEntry = await patientService.addEntry(patient.id, entry);
      setPatient({ ...patient, entries: patient.entries.concat(newEntry) });
      setFormOpen(false);
      setError(undefined);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        const data = e.response?.data;
        if (data?.error && Array.isArray(data.error)) {
          setError(
            data.error
              .map((issue: { message: string }) => issue.message)
              .join(", ")
          );
        } else if (typeof data?.error === "string") {
          setError(data.error);
        } else {
          setError("Something went wrong");
        }
      }
    }
  };

  useEffect(() => {
    if (id) {
      void patientService.getById(id).then(setPatient);
    }
  }, [id]);

  if (!patient) return null;

  const genderIcon = () => {
    switch (patient.gender) {
      case Gender.Female:
        return <FemaleIcon />;
      case Gender.Male:
        return <MaleIcon />;
      default:
        return <TransgenderIcon />;
    }
  };

  return (
    <div>
      <Typography variant="h4">
        {patient.name} {genderIcon()}
      </Typography>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <p>date of birth: {patient.dateOfBirth}</p>
      <Typography variant="h5">entries</Typography>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {formOpen ? (
        <AddEntryForm
          onCancel={() => setFormOpen(false)}
          onSubmit={submitEntry}
        />
      ) : (
        <Button variant="contained" onClick={() => setFormOpen(true)}>
          Add New Entry
        </Button>
      )}
      {patient.entries.map((entry) => (
        <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}
    </div>
  );
};

export default PatientPage;
