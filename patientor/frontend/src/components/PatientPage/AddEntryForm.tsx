import { useState } from "react";
import { NewEntry, HealthCheckRating } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (entry: NewEntry) => void;
}

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState("");

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      type: "HealthCheck",
      description,
      date,
      specialist,
      healthCheckRating: Number(healthCheckRating) as HealthCheckRating,
    });
  };

  return (
    <div>
      <h3>New HealthCheck entry</h3>
      <form onSubmit={handleSubmit}>
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
        <div>
          healthcheck rating{" "}
          <input
            value={healthCheckRating}
            onChange={(e) => setHealthCheckRating(e.target.value)}
          />
        </div>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddEntryForm;
