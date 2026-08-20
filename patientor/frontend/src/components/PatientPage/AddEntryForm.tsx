import { useState } from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { NewEntry, HealthCheckRating, Diagnosis } from "../../types";

type EntryType = "HealthCheck" | "Hospital" | "OccupationalHealthcare";

interface Props {
  onCancel: () => void;
  onSubmit: (entry: NewEntry) => void;
  diagnoses: Diagnosis[];
}

const AddEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
  const [type, setType] = useState<EntryType>("HealthCheck");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  // HealthCheck
  const [healthCheckRating, setHealthCheckRating] = useState<string>("");

  // Hospital
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  // OccupationalHealthcare
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");

  const handleDiagnosisChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const base = {
      description,
      date,
      specialist,
      ...(diagnosisCodes.length > 0 ? { diagnosisCodes } : {}),
    };

    switch (type) {
      case "HealthCheck":
        onSubmit({
          ...base,
          type: "HealthCheck",
          healthCheckRating: Number(healthCheckRating) as HealthCheckRating,
        });
        break;
      case "Hospital":
        onSubmit({
          ...base,
          type: "Hospital",
          discharge: { date: dischargeDate, criteria: dischargeCriteria },
        });
        break;
      case "OccupationalHealthcare":
        onSubmit({
          ...base,
          type: "OccupationalHealthcare",
          employerName,
          ...(sickLeaveStart && sickLeaveEnd
            ? {
                sickLeave: { startDate: sickLeaveStart, endDate: sickLeaveEnd },
              }
            : {}),
        });
        break;
    }
  };

  return (
    <div>
      <h3>New {type} entry</h3>
      <form onSubmit={handleSubmit}>
        <div>
          type{" "}
          <select
            value={type}
            onChange={(e) => setType(e.target.value as EntryType)}
          >
            <option value="HealthCheck">HealthCheck</option>
            <option value="Hospital">Hospital</option>
            <option value="OccupationalHealthcare">
              OccupationalHealthcare
            </option>
          </select>
        </div>
        <div>
          <label htmlFor="description">Description</label>{" "}
          <input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="date">Date</label>{" "}
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="specialist">Specialist</label>{" "}
          <input
            id="specialist"
            value={specialist}
            onChange={(e) => setSpecialist(e.target.value)}
          />
        </div>

        <FormControl fullWidth>
          <InputLabel>Diagnosis codes</InputLabel>
          <Select
            multiple
            value={diagnosisCodes}
            onChange={handleDiagnosisChange}
            label="Diagnosis codes"
          >
            {diagnoses.map((d) => (
              <MenuItem key={d.code} value={d.code}>
                {d.code} {d.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {type === "HealthCheck" && (
          <FormControl fullWidth>
            <InputLabel>Health check rating</InputLabel>
            <Select
              value={healthCheckRating}
              onChange={(e) => setHealthCheckRating(e.target.value)}
              label="Health check rating"
            >
              <MenuItem value="0">Healthy (0)</MenuItem>
              <MenuItem value="1">Low risk (1)</MenuItem>
              <MenuItem value="2">High risk (2)</MenuItem>
              <MenuItem value="3">Critical risk (3)</MenuItem>
            </Select>
          </FormControl>
        )}

        {type === "Hospital" && (
          <>
            <div>
              discharge date{" "}
              <input
                type="date"
                value={dischargeDate}
                onChange={(e) => setDischargeDate(e.target.value)}
              />
            </div>
            <div>
              discharge criteria{" "}
              <input
                value={dischargeCriteria}
                onChange={(e) => setDischargeCriteria(e.target.value)}
              />
            </div>
          </>
        )}

        {type === "OccupationalHealthcare" && (
          <>
            <div>
              employer name{" "}
              <input
                value={employerName}
                onChange={(e) => setEmployerName(e.target.value)}
              />
            </div>
            <div>
              sick leave start{" "}
              <input
                type="date"
                value={sickLeaveStart}
                onChange={(e) => setSickLeaveStart(e.target.value)}
              />
            </div>
            <div>
              sick leave end{" "}
              <input
                type="date"
                value={sickLeaveEnd}
                onChange={(e) => setSickLeaveEnd(e.target.value)}
              />
            </div>
          </>
        )}

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddEntryForm;
