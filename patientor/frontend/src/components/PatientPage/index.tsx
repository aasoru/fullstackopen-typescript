import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";

import patientService from "../../services/patients";
import { Patient, Gender, Diagnosis } from "../../types";
import EntryDetails from "./EntryDetails";

interface Props {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: Props) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

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
      {patient.entries.map((entry) => (
        <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}
    </div>
  );
};

export default PatientPage;
