import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowLeft, RefreshCw } from 'lucide-react';

const MealDisplay = ({ meal, onNewSuggestion, onBackToCategories }) => {
  const [expanded, setExpanded] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  const ingredients = Object.keys(meal)
    .filter(key => key.startsWith('strIngredient') && meal[key])
    .map(key => ({
      ingredient: meal[key],
      measure: meal[`strMeasure${key.slice(13)}`]
    }));

  const getYoutubeEmbedUrl = (url) => {
    const videoId = url.split('v=')[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const handleNewSuggestion = () => {
    setIsRotating(true);
    onNewSuggestion();
    setTimeout(() => setIsRotating(false), 1000);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg mt-8 overflow-hidden">
      <div className="relative">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex items-end">
          <h2 className="text-3xl font-bold text-white p-6">{meal.strMeal}</h2>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onBackToCategories}
            className="flex items-center text-secondary hover:text-primary transition-colors duration-300"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to categories
          </button>
          <button
            onClick={handleNewSuggestion}
            className={`bg-accent text-white px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center ${isRotating ? 'animate-bounce' : 'hover:-translate-y-1'}`}
          >
            <RefreshCw className={`mr-2 ${isRotating ? 'animate-spin' : ''}`} size={20} />
            Not your taste? Try again!
          </button>
        </div>
        <div className={`relative ${expanded ? '' : 'h-40 overflow-hidden'}`}>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 md:pr-4 mb-4 md:mb-0">
              <h3 className="text-xl font-semibold text-secondary mb-2">Ingredients</h3>
              <ul className="list-disc list-inside">
                {ingredients.map(({ ingredient, measure }, index) => (
                  <li key={index} className="text-gray-600">
                    {measure} {ingredient}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2 md:pl-4">
              <h3 className="text-xl font-semibold text-secondary mb-2">Instructions</h3>
              <p className="text-gray-600">{meal.strInstructions}</p>
            </div>
          </div>
          {meal.strYoutube && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-secondary mb-2">Video Tutorial</h3>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={getYoutubeEmbedUrl(meal.strYoutube)}
                  title={`${meal.strMeal} video tutorial`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-lg"
                ></iframe>
              </div>
            </div>
          )}
          {!expanded && (
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
          )}
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-primary hover:text-opacity-80 flex items-center justify-center font-semibold mt-4"
        >
          {expanded ? (
            <>
              <ChevronUp className="mr-1" size={20} />
              Show less
            </>
          ) : (
            <>
              <ChevronDown className="mr-1" size={20} />
              Show more
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default MealDisplay;