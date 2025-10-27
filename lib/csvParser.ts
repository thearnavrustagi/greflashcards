export interface Flashcard {
  word: string;
  meaning: string;
}

export function parseCSV(content: string): Flashcard[] {
  const lines = content.trim().split('\n');
  const cards: Flashcard[] = [];
  
  // Skip the header row
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // More robust CSV parsing - handles quoted fields with commas
    const parsedLine = parseCSVLine(line);
    if (parsedLine && parsedLine.length >= 2) {
      const word = parsedLine[0].trim();
      const meaning = parsedLine[1].trim();
      
      if (word && meaning) {
        cards.push({ word, meaning });
      }
    }
  }
  
  return cards;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  
  // Add the last field
  result.push(current);
  
  // Filter out empty fields at the end (trailing commas)
  while (result.length > 0 && result[result.length - 1].trim() === '') {
    result.pop();
  }
  
  return result;
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
