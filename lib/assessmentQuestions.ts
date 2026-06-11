export const assessmentQuestions = [
  {
    dimension: "Self-Awareness",
    lens: "Psychology",
    path: "Know Thyself",
    description: "Understanding your thoughts, emotions, and behavioral patterns",
    questions: [
      "I recognize my emotional triggers before they escalate",
      "I understand how my past experiences shape my present behavior",
      "I can identify the root cause of my recurring thoughts",
      "I am aware of how my body reacts to stress or excitement",
      "I understand the difference between who I am and how I sometimes act"
    ]
  },
  {
    dimension: "Shadow Integration",
    lens: "Psychology & Astrology",
    path: "Know Thyself",
    description: "Acknowledging and integrating hidden aspects of your psyche",
    questions: [
      "I accept my imperfections without harsh self-judgment",
      "I recognize patterns where I project my fears onto others",
      "I am willing to explore the parts of myself I usually hide",
      "I understand that my weaknesses often mirror my strengths",
      "I can laugh at myself without losing self-respect"
    ]
  },
  {
    dimension: "Archetypal Alignment",
    lens: "Astrology",
    path: "Align Thyself",
    description: "Living in harmony with your innate nature and cosmic patterns",
    questions: [
      "My daily life reflects my natural energy cycles",
      "I understand my core archetypes (The Seeker, Builder, Sage, Guardian, Visionary)",
      "I feel aligned with the phase of life I am currently in",
      "My work honors both my creative and analytical sides",
      "I recognize when I am acting out of alignment with my true self"
    ]
  },
  {
    dimension: "Conscious Language",
    lens: "Etymology",
    path: "Master Thyself",
    description: "Using words intentionally to shape your reality",
    questions: [
      "I notice when my words create limitations instead of possibilities",
      "I understand the root meanings of words I use regularly",
      "I reframe negative self-talk into constructive language",
      "The words I speak to myself align with who I want to become",
      "I choose silence when my words would not serve a situation"
    ]
  },
  {
    dimension: "Discipline Architecture",
    lens: "Psychology",
    path: "Master Thyself",
    description: "Building sustainable systems for consistent action",
    questions: [
      "My environment is designed to support my desired habits",
      "I complete difficult tasks without needing external motivation",
      "I have eliminated at least one energy-draining habit this year",
      "My daily rituals prepare me for high-performance states",
      "I can delay gratification for long-term rewards"
    ]
  },
  {
    dimension: "Emotional Sovereignty",
    lens: "Psychology",
    path: "Master Thyself",
    description: "Regulating emotions without suppression or reactivity",
    questions: [
      "I can observe my emotions without being controlled by them",
      "I have tools to regulate intense emotional states",
      "I take responsibility for my emotional responses, not just my actions",
      "I express difficult emotions without damaging relationships",
      "I forgive myself quickly after emotional reactions"
    ]
  },
  {
    dimension: "Relational Intelligence",
    lens: "Psychology & Etymology",
    path: "Build Thyself",
    description: "Creating meaningful connections and contributing to community",
    questions: [
      "I communicate my boundaries with clarity and compassion",
      "I listen to understand, not just to respond",
      "My relationships challenge me to grow",
      "I contribute to my community in ways that use my unique gifts",
      "I can hold differing opinions without needing to change others"
    ]
  },
  {
    dimension: "Strategic Purpose",
    lens: "Astrology & Etymology",
    path: "Build Thyself",
    description: "Aligning daily action with long-term contribution",
    questions: [
      "I have articulated a personal mission statement for this phase of life",
      "My weekly actions move me toward my 5-year vision",
      "I understand how my unique nature serves the collective",
      "I regularly audit whether my time aligns with my priorities",
      "I am building something that will outlast me"
    ]
  },
  {
    dimension: "Cognitive Flexibility",
    lens: "Psychology",
    path: "Know Thyself & Master Thyself",
    description: "Adapting thinking patterns for complex challenges",
    questions: [
      "I can hold two opposing ideas without discomfort",
      "I update my beliefs when presented with new evidence",
      "I seek perspectives that challenge my assumptions",
      "I can switch between big-picture and detail-oriented thinking",
      "I recognize when my brain is using mental shortcuts or biases"
    ]
  },
  {
    dimension: "Linguistic Sovereignty",
    lens: "Etymology",
    path: "Master Thyself & Align Thyself",
    description: "Mastering the language that shapes your internal and external reality",
    questions: [
      "I have removed 'I can't', 'I should', and 'I have to' from my active vocabulary",
      "I understand how the etymology of 'understanding' implies standing under a concept",
      "I choose words that open possibilities rather than close them",
      "The stories I tell about my past empower my future",
      "I speak about myself the way I would speak to someone I love"
    ]
  }
];

export function calculateDimensionScores(answers: Record<string, number>) {
  const dimensionScores: Record<string, number> = {};
  
  assessmentQuestions.forEach((section) => {
    let total = 0;
    section.questions.forEach((question) => {
      total += answers[question] || 0;
    });
    dimensionScores[section.dimension] = (total / section.questions.length) * 10;
  });
  
  return dimensionScores;
}

export function getPrimaryArchetype(averageScore: number): string {
  if (averageScore >= 45) return "The Builder";
  if (averageScore >= 35) return "The Practitioner";
  if (averageScore >= 25) return "The Student";
  return "The Seeker";
}

export function calculateScore(answers: Record<string, number>) {
  const dimensionScores = calculateDimensionScores(answers);
  const totalScore = Object.values(dimensionScores).reduce((a, b) => a + b, 0);
  const averageScore = totalScore / Object.keys(dimensionScores).length;
  const archetype = getPrimaryArchetype(averageScore);
  
  return { totalScore, archetype, dimensionScores };
}