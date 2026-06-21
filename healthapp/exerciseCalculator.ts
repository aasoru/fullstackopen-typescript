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
  1: 'bad',
  2: 'not too bad but could be better',
  3: 'good',
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
  if (average >= target) return 3;
  if (average >= target * 0.75) return 2;
  return 1;
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
