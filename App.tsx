
import React, { useState, useEffect, useCallback } from 'react';
import Layout from './components/Layout';
import RecipeCard from './components/RecipeCard';
import RecipeDetails from './components/RecipeDetails';
import { generateRecipes } from './services/geminiService';
import { Recipe, ViewType, SearchFilters } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('discover');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({
    dietary: '',
    maxTime: 30,
    ingredients: ''
  });

  // Load saved recipes from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('tiny-tummies-saved');
    if (saved) {
      try {
        setSavedRecipes(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved recipes", e);
      }
    }
  }, []);

  // Save recipes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tiny-tummies-saved', JSON.stringify(savedRecipes));
  }, [savedRecipes]);

  const handleFetchRecipes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const results = await generateRecipes(filters);
      setRecipes(results);
    } catch (err) {
      setError("Mmm, something went wrong in the kitchen. Please try again!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleSave = useCallback((e: React.MouseEvent | null, recipe: Recipe) => {
    if (e) e.stopPropagation();
    setSavedRecipes(prev => {
      const isAlreadySaved = prev.some(r => r.id === recipe.id);
      if (isAlreadySaved) {
        return prev.filter(r => r.id !== recipe.id);
      } else {
        return [...prev, recipe];
      }
    });
  }, []);

  const handleViewDetails = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setActiveView('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isRecipeSaved = (recipeId: string) => {
    return savedRecipes.some(r => r.id === recipeId);
  };

  return (
    <Layout 
      activeView={activeView} 
      onViewChange={(v) => {
        setActiveView(v);
        if (v !== 'details') setSelectedRecipe(null);
      }}
    >
      {activeView === 'discover' && (
        <div className="animate-fade-in">
          <section className="mb-12 text-center max-w-2xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4 tracking-tight">
              What's on the menu <span className="text-orange-500">today?</span>
            </h2>
            <p className="text-lg text-gray-500 mb-8">
              Nutritious, child-approved meals that the whole family will love. Ready in 30 minutes or less.
            </p>

            <div className="bg-white p-6 rounded-3xl shadow-lg border border-orange-50 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Dietary</label>
                <select 
                  className="w-full bg-gray-50 border-none rounded-2xl px-4 py-3 text-gray-700 focus:ring-2 focus:ring-orange-200 outline-none cursor-pointer"
                  value={filters.dietary}
                  onChange={(e) => setFilters({...filters, dietary: e.target.value})}
                >
                  <option value="">Any Diet</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Dairy-Free">Dairy-Free</option>
                  <option value="Gluten-Free">Gluten-Free</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Max Time</label>
                <select 
                  className="w-full bg-gray-50 border-none rounded-2xl px-4 py-3 text-gray-700 focus:ring-2 focus:ring-orange-200 outline-none cursor-pointer"
                  value={filters.maxTime}
                  onChange={(e) => setFilters({...filters, maxTime: parseInt(e.target.value)})}
                >
                  <option value="15">15 mins</option>
                  <option value="30">30 mins</option>
                  <option value="45">45 mins</option>
                  <option value="60">60 mins</option>
                </select>
              </div>
              <div className="flex items-end">
                <button 
                  onClick={handleFetchRecipes}
                  disabled={isLoading}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-2xl shadow-lg shadow-orange-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  )}
                  {isLoading ? 'Mixing...' : 'Find Ideas'}
                </button>
              </div>
            </div>
            {error && <p className="mt-4 text-red-500 text-sm font-medium">{error}</p>}
          </section>

          {recipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {recipes.map((recipe) => (
                <RecipeCard 
                  key={recipe.id} 
                  recipe={recipe} 
                  onView={handleViewDetails}
                  onToggleSave={handleToggleSave}
                  isSaved={isRecipeSaved(recipe.id)}
                />
              ))}
            </div>
          ) : !isLoading && (
            <div className="text-center py-20 bg-orange-50/30 rounded-[40px] border-2 border-dashed border-orange-100">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 text-orange-500 rounded-full mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">No recipes yet</h3>
              <p className="text-gray-500 max-w-xs mx-auto">Use the search bar above to generate custom meal ideas for your family.</p>
            </div>
          )}
        </div>
      )}

      {activeView === 'saved' && (
        <div className="animate-fade-in">
          <header className="mb-10">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">My Cookbook</h2>
            <p className="text-gray-500">Your curated collection of family favorites.</p>
          </header>

          {savedRecipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {savedRecipes.map((recipe) => (
                <RecipeCard 
                  key={recipe.id} 
                  recipe={recipe} 
                  onView={handleViewDetails}
                  onToggleSave={handleToggleSave}
                  isSaved={true}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-[40px] border border-gray-100">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white text-gray-300 rounded-full mb-6 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">Your cookbook is empty</h3>
              <p className="text-gray-500 max-w-xs mx-auto mb-8">Save recipes you love to find them easily next time.</p>
              <button 
                onClick={() => setActiveView('discover')}
                className="bg-orange-500 text-white font-bold py-3 px-8 rounded-2xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-100"
              >
                Browse Recipes
              </button>
            </div>
          )}
        </div>
      )}

      {activeView === 'details' && selectedRecipe && (
        <div className="animate-fade-in">
          <RecipeDetails 
            recipe={selectedRecipe} 
            onBack={() => setActiveView('discover')}
            onToggleSave={handleToggleSave}
            isSaved={isRecipeSaved(selectedRecipe.id)}
          />
        </div>
      )}
    </Layout>
  );
};

export default App;
