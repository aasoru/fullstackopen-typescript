import { useState, useEffect } from "react";
import axios from "axios";
import type { DiaryEntry } from "./types";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    axios.get<DiaryEntry[]>("/api/diaries").then((response) => {
      setDiaries(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Diary entries</h1>
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
