const bmiTable = {
  underweightSevereThinness: [0, 16],
  underweightModerateThinness: [16, 17],
  underweightMildThinness: [17, 18.5],
  normal: [18.5, 25.0],
  overweight: [25.0, 30.0],
  obeseI: [30, 35],
  obeseII: [35, 40],
  obeseIII: [40, 100],
};

const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;

  for (const [category, [min, max]] of Object.entries(bmiTable)) {
    if (bmi >= min && bmi < max)
      return `for ${height} height and ${weight} weight the bmi is ${category} range`;
  }

  throw new Error('out of range');
};

console.log(calculateBmi(180, 74));
