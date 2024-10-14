import React from 'react';

const SELECTED_CATEGORIES = [
  'Breakfast',
  'Beef',
  'Chicken',
  'Pork',
  'Lamb',
  'Seafood',
  'Pasta',
  'Vegetarian',
  'Vegan',
  'Dessert',
  'Miscellaneous',
  'Random'
];

const getCategoryEmoji = (category) => {
  const emojiMap = {
    'Breakfast': '🍳',
    'Beef': '🥩',
    'Chicken': '🍗',
    'Pork': '🥓',
    'Lamb': '🍖',
    'Seafood': '🐟',
    'Pasta': '🍝',
    'Vegetarian': '🥕',
    'Vegan': '🥬',
    'Dessert': '🍰',
    'Miscellaneous': '🍱',
    'Random': '🎲',
  };

  return emojiMap[category] || '🍽️';
};

const CategorySelector = ({ categories, onSelectCategory }) => {
  const handleCategoryClick = (category) => {
    if (category === 'Random') {
      const availableCategories = categories.map(cat => cat.strCategory);
      const randomCategory = availableCategories[Math.floor(Math.random() * availableCategories.length)];
      onSelectCategory(randomCategory);
    } else {
      onSelectCategory(category);
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {SELECTED_CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center hover:bg-accent hover:text-white transform hover:-translate-y-1 border-2 border-transparent hover:border-primary"
        >
          <span className="text-4xl mb-2" role="img" aria-label={category}>
            {getCategoryEmoji(category)}
          </span>
          <span className="text-sm font-medium">{category}</span>
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;