'use client';

import { useEffect, useState } from 'react';
import { parseCSV, shuffleArray } from '@/lib/csvParser';
import type { Flashcard } from '@/lib/csvParser';

type CardState = 'word' | 'meaning';

export default function Home() {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardState, setCardState] = useState<CardState>('word');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load and parse CSV data
    fetch('/GREWords%20-%20dictionary.csv')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then(content => {
        const parsedCards = parseCSV(content);
        const shuffledCards = shuffleArray(parsedCards);
        setCards(shuffledCards);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading CSV:', error);
        setIsLoading(false);
      });
  }, []);

  const handleCardTap = () => {
    if (cardState === 'word') {
      setCardState('meaning');
    } else {
      // Move to next card
      if (currentIndex < cards.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setCardState('word');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900">
        <p className="text-xl text-gray-300">Loading flashcards...</p>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900">
        <p className="text-xl text-gray-300">No flashcards available</p>
      </div>
    );
  }

  if (currentIndex >= cards.length) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900">
        <div className="text-center px-6">
          <h1 className="text-4xl font-bold text-green-400 mb-4">🎉 Done!</h1>
          <p className="text-xl text-gray-300">
            You've completed all {cards.length} flashcards
          </p>
        </div>
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md">
        {/* Progress indicator */}
        <div className="mb-4 text-center text-gray-400 text-sm">
          {currentIndex + 1} / {cards.length}
        </div>

        {/* Flashcard */}
        <div
          onClick={handleCardTap}
          className="relative h-[60vh] max-h-[500px] min-h-[400px] cursor-pointer"
        >
          {cardState === 'word' ? (
            <div className="absolute inset-0 rounded-2xl shadow-2xl bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600 flex items-center justify-center p-8 animate-fade-in">
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-2">Word</p>
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                  {currentCard.word}
                </h2>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 rounded-2xl shadow-2xl bg-gradient-to-br from-blue-900 to-blue-800 border border-blue-700 flex items-center justify-center p-8 animate-fade-in">
              <div className="text-center">
                <p className="text-blue-400 text-sm mb-2">Word</p>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  {currentCard.word}
                </h2>
                <p className="text-blue-400 text-sm mb-4">Meaning</p>
                <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
                  {currentCard.meaning}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Hint text */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          {cardState === 'word' ? 'Tap to reveal meaning' : 'Tap to continue'}
        </div>
      </div>
    </div>
  );
}