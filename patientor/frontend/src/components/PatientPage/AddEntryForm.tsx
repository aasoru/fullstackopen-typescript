import { useState } from "react";
import { NewEntry, HealthCheckRating } from "../../types";

type EntryType = "HealthCheck" | "Hospital" | "OccupationalHealthcare";

interface Props {
  onCancel: () => void;
  onSubmit: (entry: NewEntry) => void;
}

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [type, setType] = useState<EntryType>("HealthCheck");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");

  // HealthCheck
  const [healthCheckRating, setHealthCheckRating] = useState("");

  // Hospital
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  // OccupationalHealthcare
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const base = { description, date, specialist };

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
          description{" "}
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          date <input value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          specialist{" "}
          <input
            value={specialist}
            onChange={(e) => setSpecialist(e.target.value)}
          />
        </div>

        {type === "HealthCheck" && (
          <div>
            healthcheck rating{" "}
            <input
              value={healthCheckRating}
              onChange={(e) => setHealthCheckRating(e.target.value)}
            />
          </div>
        )}

        {type === "Hospital" && (
          <>
            <div>
              discharge date{" "}
              <input
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
                value={sickLeaveStart}
                onChange={(e) => setSickLeaveStart(e.target.value)}
              />
            </div>
            <div>
              sick leave end{" "}
              <input
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
