import { Bike, Question, User } from '../types';
import { BIKES } from '../constants';

export function calculateRecommendations(answers: number[], questions: Question[], user: User | null): Bike[] {
  const scores = BIKES.map(bike => {
    let score = 0;

    // Age-based constraints and preferences
    if (user) {
      // Safety/Weight preference for younger or older riders
      if (user.age < 21 || user.age > 65) {
        if (bike.weight < 200) score += 5;
        if (bike.hp > 150) score -= 10; // Discourage extreme power for very young/old
      }
      // Preference for comfort/touring for older riders
      if (user.age > 45) {
        if (bike.type === 'Touring' || bike.type === 'Adventure') score += 5;
      }
    }

    answers.forEach((answerIndex, qIndex) => {
      const question = questions[qIndex];
      const selectedOption = question.options[answerIndex];
      const selectedTags = selectedOption.tags;

      // 1. Experience vs Aggressiveness (+5 for match, -5 for mismatch)
      if (qIndex === 0) {
        if (selectedTags.includes('aggressivo') && bike.tags.includes('aggressivo')) score += 5;
        if (selectedTags.includes('comfort') && bike.tags.includes('aggressivo')) score -= 5;
      }

      // 2. Context (+8 for critical match)
      if (qIndex === 1) {
        if (selectedTags.includes(bike.type.toLowerCase())) score += 8;
        if (selectedTags.some(t => bike.tags.includes(t))) score += 4;
      }

      // 3. CC (+12 - High Priority)
      if (qIndex === 2) {
        const bikeCcTag = bike.cc < 700 ? 'low-cc' : bike.cc < 900 ? 'mid-cc' : bike.cc < 1100 ? 'high-cc' : 'max-cc';
        if (selectedTags.includes(bikeCcTag)) score += 12;

        // STRICT LIMIT: Penalize bikes that exceed the selected CC range
        if (selectedTags.includes('low-cc') && bike.cc > 750) score -= 100;
        if (selectedTags.includes('mid-cc') && bike.cc > 950) score -= 100;
        if (selectedTags.includes('high-cc') && bike.cc > 1150) score -= 100;
      }

      // 4. Style (+4)
      if (qIndex === 3) {
        if (selectedTags.some(t => bike.tags.includes(t))) score += 4;
      }

      // 5. Type (+15 - Maximum Priority)
      if (qIndex === 4) {
        if (selectedTags.includes(bike.type)) score += 15;
        // Partial match for Sport-Touring
        if (selectedTags.includes('Sportiva') && bike.type === 'Supersport') score += 7;
        if (selectedTags.includes('Touring') && bike.type === 'Adventure') score += 7;
      }

      // 6. Comfort (+3)
      if (qIndex === 5) {
        if (selectedTags.some(t => bike.tags.includes(t))) score += 3;
        if (selectedTags.includes('pista') && bike.type === 'Supersport') score += 3;
      }

      // 7. Budget (+12 - High Priority)
      if (qIndex === 6) {
        if (selectedTags.includes(bike.priceRange)) score += 12;

        // STRICT LIMIT: Penalize bikes that exceed the selected budget
        if (selectedTags.includes('low') && bike.priceRange !== 'low') score -= 100;
        if (selectedTags.includes('mid') && bike.priceRange === 'high') score -= 100;
      }

      // 8. Power/Torque (+5)
      if (qIndex === 7) {
        if (selectedTags.some(t => bike.tags.includes(t))) score += 5;
      }

      // 9. Origin (+4)
      if (qIndex === 8) {
        if (selectedTags.includes(bike.origin)) score += 4;
      }

      // 10. Location (+8)
      if (qIndex === 9) {
        if (selectedTags.some(t => bike.tags.includes(t))) score += 8;
        if (selectedTags.includes('pista') && bike.type === 'Supersport') score += 5;
        if (selectedTags.includes('adventure') && bike.type === 'Adventure') score += 5;
      }
    });

    return { bike, score };
  });

  // Sort by score desc, then by hp desc to break ties with performance
  const sorted = scores.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return b.bike.hp - a.bike.hp;
  });

  const first = sorted[0].bike;
  
  // Second must be a different model, preferably different brand but same category if score is high
  const second = sorted.find(s => s.bike.id !== first.id)?.bike || sorted[1].bike;

  return [first, second];
}
