import { useState, useEffect } from "react";
import axios from "axios";
import type { DiaryEntry, NewDiaryEntry } from "./types";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");
  const [visibility, setVisibility] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string>();

  useEffect(() => {
    axios.get<DiaryEntry[]>("/api/diaries").then((response) => {
      setDiaries(response.data);
    });
  }, []);

  const addDiary = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setError(undefined);
    const newEntry: NewDiaryEntry = { date, weather, visibility, comment };
    axios
      .post<DiaryEntry>("/api/diaries", newEntry)
      .then((response) => {
        setDiaries(diaries.concat(response.data));
        setDate("");
        setWeather("");
        setVisibility("");
        setComment("");
      })
      .catch((error: unknown) => {
        if (axios.isAxiosError<Array<{ message: string }>>(error)) {
          setError(error.response?.data.map((e) => e.message).join(", "));
        } else {
          setError("Unknown error occurred");
        }
      });
  };

  return (
    <div>
      <h2>Add new entry</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={addDiary}>
        <div>
          date{" "}
          <input
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          weather{" "}
          <input
            value={weather}
            onChange={({ target }) => setWeather(target.value)}
          />
        </div>
        <div>
          visibility{" "}
          <input
            value={visibility}
            onChange={({ target }) => setVisibility(target.value)}
          />
        </div>
        <div>
          comment{" "}
          <input
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Diary entries</h2>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <b>{diary.date}</b>
          <p>visibility: {diary.visibility}</p>
          <p>weather: {diary.weather}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
