import WorkIcon from "@mui/icons-material/Work";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { Entry, Diagnosis, HealthCheckRating } from "../../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};

const HealthCheckRatingDisplay = ({
  rating,
}: {
  rating: HealthCheckRating;
}) => {
  const color = {
    [HealthCheckRating.Healthy]: "green",
    [HealthCheckRating.LowRisk]: "yellow",
    [HealthCheckRating.HighRisk]: "orange",
    [HealthCheckRating.CriticalRisk]: "red",
  }[rating];
  return <FavoriteIcon sx={{ color }} />;
};

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const DiagnosisList = ({
  codes,
  diagnoses,
}: {
  codes?: Array<Diagnosis["code"]>;
  diagnoses: Diagnosis[];
}) => {
  if (!codes || codes.length === 0) return null;
  return (
    <ul>
      {codes.map((code) => (
        <li key={code}>
          {code} {diagnoses.find((d) => d.code === code)?.name}
        </li>
      ))}
    </ul>
  );
};

const baseStyle = {
  border: "1px solid black",
  borderRadius: "5px",
  padding: "10px",
  marginBottom: "5px",
};

const EntryDetails = ({ entry, diagnoses }: Props) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <div style={baseStyle}>
          <p>
            {entry.date} <LocalHospitalIcon />
          </p>
          <em>{entry.description}</em>
          <DiagnosisList codes={entry.diagnosisCodes} diagnoses={diagnoses} />
          <p>
            discharge: {entry.discharge.date}, {entry.discharge.criteria}
          </p>
          <p>diagnose by {entry.specialist}</p>
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div style={baseStyle}>
          <p>
            {entry.date} <WorkIcon /> <em>{entry.employerName}</em>
          </p>
          <em>{entry.description}</em>
          <DiagnosisList codes={entry.diagnosisCodes} diagnoses={diagnoses} />
          {entry.sickLeave && (
            <p>
              sick leave: {entry.sickLeave.startDate} -{" "}
              {entry.sickLeave.endDate}
            </p>
          )}
          <p>diagnose by {entry.specialist}</p>
        </div>
      );
    case "HealthCheck":
      return (
        <div style={baseStyle}>
          <p>
            {entry.date} <MedicalServicesIcon />
          </p>
          <em>{entry.description}</em>
          <DiagnosisList codes={entry.diagnosisCodes} diagnoses={diagnoses} />
          <div>
            <HealthCheckRatingDisplay rating={entry.healthCheckRating} />
          </div>
          <p>diagnose by {entry.specialist}</p>
        </div>
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
