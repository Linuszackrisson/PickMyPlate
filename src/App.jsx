import React, { useState, useEffect } from 'react';
import { Loader2, UtensilsCrossed, Linkedin, Globe } from 'lucide-react';
import CategorySelector from './components/CategorySelector';
import MealDisplay from './components/MealDisplay';
import ApiInfoModal from './components/ApiInfoModal';
import profilePic from './assets/profile-pic.png'

function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then(response => response.json())
      .then(data => {
        setCategories(data.categories);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        setError('Failed to load categories. Please try again later.');
        setLoading(false);
      });
  }, []);

  const fetchRandomMeal = async (category) => {
    setLoading(true);
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      const data = await response.json();
      const randomMeal = data.meals[Math.floor(Math.random() * data.meals.length)];
      const mealDetailsResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${randomMeal.idMeal}`);
      const mealDetails = await mealDetailsResponse.json();
      setMeal(mealDetails.meals[0]);
    } catch (error) {
      console.error('Error fetching meal:', error);
      setError('Failed to load meal. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    fetchRandomMeal(category);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setMeal(null);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-between p-4">
      <ApiInfoModal />
      <header className="w-full text-center mb-8">
        <h1 
          className="text-5xl font-bold text-primary mb-2 flex items-center justify-center cursor-pointer" 
          onClick={handleBackToCategories}
        >
          <UtensilsCrossed className="mr-2" size={48} />
          PickMyPlate
        </h1>
        <p className="text-lg text-text max-w-2xl mx-auto">
          "Choosing a meal can be challenging. This web app doesn't necessarily make it easier, but it does make it a little more fun!"
        </p>
      </header>

      <main className="w-full max-w-4xl">
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <>
            <div className="mb-8">
              {!selectedCategory && !loading ? ( // Kontrollera att loading är false
                <CategorySelector categories={categories} onSelectCategory={handleSelectCategory} />
              ) : null}
            </div>

            {selectedCategory && (
              <div className="mt-8">
                {loading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="animate-spin text-primary" size={48} />
                  </div>
                ) : meal ? (
                  <MealDisplay 
                    meal={meal} 
                    onNewSuggestion={() => fetchRandomMeal(selectedCategory)} 
                    onBackToCategories={handleBackToCategories}
                  />
                ) : null}
              </div>
            )}
          </>
        )}
      </main>

      <footer className="w-full text-center mt-8 flex flex-col items-center">
        <div className="flex items-center mb-2">
          <p className="text-text mr-2">Made by Linus Zackrisson</p>
          <img src={profilePic} alt="Linus Zackrisson" className="rounded-full h-8 w-8 shadow-lg" />
        </div>
        <div className="flex space-x-4">
          <a href="https://se.linkedin.com/in/linus-zackrisson-367542273" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition-colors duration-300 flex items-center">
            <Linkedin size={20} className="mr-1" />
            LinkedIn
          </a>
          <a href="https://linuszackrisson.com/" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition-colors duration-300 flex items-center">
            <Globe size={20} className="mr-1" />
            Personal Website
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
