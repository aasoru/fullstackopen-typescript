interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const ratingDescriptions: Record<number, string> = {
  0: 'too bad',
  1: 'bad',
  2: 'could be better',
  3: 'ok',
  4: 'not bad but could be better',
  5: 'good',
  6: 'great',
  7: 'excelent',
  8: 'incredible',
  9: 'superb',
  10: 'perfect',
};

const calculateExercises = (
  hours: number[],
  target: number
): ExerciseResult => {
  const periodLength = hours.length;
  const average = hours.reduce((sum, h) => sum + h, 0) / periodLength;
  const rating = calculateRating(average, target);

  return {
    periodLength: hours.length,
    trainingDays: hours.filter((hour) => hour > 0).length,
    success: average >= target,
    rating,
    ratingDescription: ratingDescriptions[rating],
    target,
    average,
  };
};

const calculateRating = (average: number, target: number): number => {
  const ratio = average / target;
  if (ratio >= 1.0) return 5;
  if (ratio >= 0.8) return 4;
  if (ratio >= 0.6) return 3;
  if (ratio >= 0.4) return 2;
  if (ratio >= 0.2) return 1;
  return 0;
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
