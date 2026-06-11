export function calculateScore(
  answers: Record<string, number>
) {
  const values = Object.values(answers);

  const totalScore = values.reduce(
    (sum, value) => sum + value,
    0
  );

  let archetype = "";

  if (totalScore <= 60) {
    archetype = "The Seeker";
  } else if (totalScore <= 90) {
    archetype = "The Builder";
  } else if (totalScore <= 120) {
    archetype = "The Guardian";
  } else if (totalScore <= 135) {
    archetype = "The Sage";
  } else {
    archetype = "The Visionary";
  }

  return {
    totalScore,
    archetype,
  };
}