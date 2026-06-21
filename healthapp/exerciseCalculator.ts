import { isNotNumber } from './utils.ts';

export interface ExerciseResult {
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

export const calculateExercises = (
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

interface ExerciseArguments {
  target: number;
  hours: number[];
}

const parseArguments = (args: string[]): ExerciseArguments => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (isNotNumber(args[2])) throw new Error('Target must be a number');

  const hours = args.slice(3);
  if (hours.some(isNotNumber)) throw new Error('Hours must be numbers');

  return {
    target: Number(args[2]),
    hours: hours.map(Number),
  };
};

if (process.argv[1] === import.meta.filename) {
  const { target, hours } = parseArguments(process.argv);
  console.log(calculateExercises(hours, target));
}
