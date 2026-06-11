export const zodiacSigns = [
  { 
    name: "Aries", symbol: "♈", emoji: "🐏", 
    startMonth: 3, startDay: 21, endMonth: 4, endDay: 19,
    element: "Fire", quality: "Cardinal", ruling: "Mars",
    strengths: ["Courageous", "Determined", "Confident", "Enthusiastic"],
    weaknesses: ["Impatient", "Moody", "Short-tempered", "Impulsive"],
    growthPath: "Practice patience and think before acting",
    career: ["Leadership", "Entrepreneurship", "Sports", "Military"],
    relationships: "Passionate and direct, needs a partner who appreciates spontaneity"
  },
  { 
    name: "Taurus", symbol: "♉", emoji: "🐂", 
    startMonth: 4, startDay: 20, endMonth: 5, endDay: 20,
    element: "Earth", quality: "Fixed", ruling: "Venus",
    strengths: ["Reliable", "Patient", "Practical", "Devoted"],
    weaknesses: ["Stubborn", "Possessive", "Complacent"],
    growthPath: "Embrace change and flexibility",
    career: ["Finance", "Arts", "Culinary", "Real Estate"],
    relationships: "Loyal and sensual, values stability and commitment"
  },
  { 
    name: "Gemini", symbol: "♊", emoji: "👯", 
    startMonth: 5, startDay: 21, endMonth: 6, endDay: 20,
    element: "Air", quality: "Mutable", ruling: "Mercury",
    strengths: ["Adaptable", "Curious", "Communicative", "Intelligent"],
    weaknesses: ["Inconsistent", "Anxious", "Superficial"],
    growthPath: "Focus on depth over breadth",
    career: ["Writing", "Teaching", "Sales", "Media"],
    relationships: "Needs mental stimulation and variety"
  },
  { 
    name: "Cancer", symbol: "♋", emoji: "🦀", 
    startMonth: 6, startDay: 21, endMonth: 7, endDay: 22,
    element: "Water", quality: "Cardinal", ruling: "Moon",
    strengths: ["Loyal", "Emotional", "Intuitive", "Protective"],
    weaknesses: ["Moody", "Manipulative", "Insecure"],
    growthPath: "Balance giving and receiving care",
    career: ["Healthcare", "Education", "Hospitality", "Psychology"],
    relationships: "Deeply nurturing, needs emotional security"
  },
  { 
    name: "Leo", symbol: "♌", emoji: "🦁", 
    startMonth: 7, startDay: 23, endMonth: 8, endDay: 22,
    element: "Fire", quality: "Fixed", ruling: "Sun",
    strengths: ["Creative", "Passionate", "Generous", "Warm-hearted"],
    weaknesses: ["Arrogant", "Stubborn", "Self-centered"],
    growthPath: "Share the spotlight and listen more",
    career: ["Entertainment", "Management", "Politics", "Design"],
    relationships: "Loves attention and admiration, needs a supportive partner"
  },
  { 
    name: "Virgo", symbol: "♍", emoji: "🌾", 
    startMonth: 8, startDay: 23, endMonth: 9, endDay: 22,
    element: "Earth", quality: "Mutable", ruling: "Mercury",
    strengths: ["Analytical", "Helpful", "Hardworking", "Practical"],
    weaknesses: ["Critical", "Perfectionist", "Worrying"],
    growthPath: "Embrace imperfection in yourself and others",
    career: ["Medicine", "Research", "Editing", "Accounting"],
    relationships: "Shows love through service, needs appreciation"
  },
  { 
    name: "Libra", symbol: "♎", emoji: "⚖️", 
    startMonth: 9, startDay: 23, endMonth: 10, endDay: 22,
    element: "Air", quality: "Cardinal", ruling: "Venus",
    strengths: ["Diplomatic", "Charming", "Social", "Fair-minded"],
    weaknesses: ["Indecisive", "Avoids conflict", "Self-pitying"],
    growthPath: "Trust your own decisions and voice",
    career: ["Law", "Diplomacy", "Design", "Counseling"],
    relationships: "Values harmony and partnership, needs balance"
  },
  { 
    name: "Scorpio", symbol: "♏", emoji: "🦂", 
    startMonth: 10, startDay: 23, endMonth: 11, endDay: 21,
    element: "Water", quality: "Fixed", ruling: "Pluto",
    strengths: ["Passionate", "Resourceful", "Brave", "Determined"],
    weaknesses: ["Jealous", "Secretive", "Manipulative"],
    growthPath: "Trust others and let go of control",
    career: ["Research", "Psychology", "Finance", "Detective work"],
    relationships: "Deeply intense, needs absolute loyalty"
  },
  { 
    name: "Sagittarius", symbol: "♐", emoji: "🏹", 
    startMonth: 11, startDay: 22, endMonth: 12, endDay: 21,
    element: "Fire", quality: "Mutable", ruling: "Jupiter",
    strengths: ["Optimistic", "Adventurous", "Honest", "Philosophical"],
    weaknesses: ["Tactless", "Restless", "Overconfident"],
    growthPath: "Balance freedom with responsibility",
    career: ["Travel", "Education", "Publishing", "Law"],
    relationships: "Values freedom, needs a partner who shares their adventures"
  },
  { 
    name: "Capricorn", symbol: "♑", emoji: "🐐", 
    startMonth: 12, startDay: 22, endMonth: 1, endDay: 19,
    element: "Earth", quality: "Cardinal", ruling: "Saturn",
    strengths: ["Disciplined", "Responsible", "Patient", "Ambitious"],
    weaknesses: ["Pessimistic", "Stubborn", "Cold"],
    growthPath: "Allow yourself to have fun and be vulnerable",
    career: ["Business", "Finance", "Engineering", "Government"],
    relationships: "Takes commitment seriously, needs patience and understanding"
  },
  { 
    name: "Aquarius", symbol: "♒", emoji: "💧", 
    startMonth: 1, startDay: 20, endMonth: 2, endDay: 18,
    element: "Air", quality: "Fixed", ruling: "Uranus",
    strengths: ["Innovative", "Humanitarian", "Independent", "Intellectual"],
    weaknesses: ["Detached", "Unpredictable", "Stubborn"],
    growthPath: "Connect emotionally while maintaining your uniqueness",
    career: ["Technology", "Science", "Social Work", "Activism"],
    relationships: "Needs intellectual connection and personal space"
  },
  { 
    name: "Pisces", symbol: "♓", emoji: "🐟", 
    startMonth: 2, startDay: 19, endMonth: 3, endDay: 20,
    element: "Water", quality: "Mutable", ruling: "Neptune",
    strengths: ["Compassionate", "Artistic", "Intuitive", "Gentle"],
    weaknesses: ["Overly trusting", "Escapist", "Victim mentality"],
    growthPath: "Set boundaries while maintaining compassion",
    career: ["Arts", "Healthcare", "Spirituality", "Charity"],
    relationships: "Romantic and dreamy, needs a grounded partner"
  }
];

export function getZodiacSign(birthDate: string) {
  if (!birthDate) return null;
  
  const date = new Date(birthDate);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  for (const sign of zodiacSigns) {
    if (sign.name === "Capricorn") {
      if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return sign;
    } else {
      if (month === sign.startMonth && day >= sign.startDay) return sign;
      if (month === sign.endMonth && day <= sign.endDay) return sign;
      if (month > sign.startMonth && month < sign.endMonth) return sign;
    }
  }
  return null;
}

export function getPersonalizedInsights(zodiac: any, profile: any, assessmentScore: number) {
  if (!zodiac) return null;
  
  return {
    zodiacInsight: `As a ${zodiac.name} ${zodiac.symbol}, you naturally ${zodiac.strengths[0].toLowerCase()} and ${zodiac.strengths[1].toLowerCase()}. Your growth edge: ${zodiac.growthPath}.`,
    
    careerPath: `Your natural talents align with ${zodiac.career.slice(0, 3).join(', ')}. Consider exploring these paths.`,
    
    relationshipAdvice: zodiac.relationships,
    
    growthFocus: zodiac.growthPath,
    
    elementalWisdom: `As a ${zodiac.element} sign, you ${zodiac.element === 'Fire' ? 'lead with passion and inspiration' : 
                                      zodiac.element === 'Earth' ? 'ground ideas into practical reality' :
                                      zodiac.element === 'Air' ? 'thrive on ideas and connection' :
                                      'navigate life through deep feeling and intuition'}.`,
    
    assessmentInsight: assessmentScore > 350 ? "Your Self-Mastery Index shows strong integration across all three lenses." :
                       assessmentScore > 250 ? "You're developing solid self-awareness. Focus on consistency." :
                       "Your journey is beginning. Each step builds your foundation.",
    
    languageRecommendation: profile?.language_patterns ? 
      `We notice you focus on "${profile.language_patterns.substring(0, 50)}...". Try reframing "I can't" to "I'm learning to" for powerful shifts.` :
      "Start tracking your language patterns to discover how words shape your reality."
  };
}