
import React from 'react';
import { Recipe } from '../types';

interface RecipeDetailsProps {
  recipe: Recipe;
  onBack: () => void;
  onToggleSave: (e: React.MouseEvent | null, recipe: Recipe) => void;
  isSaved: boolean;
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ recipe, onBack, onToggleSave, isSaved }) => {
  return (
    <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-orange-50 max-w-4xl mx-auto">
      {/* Header Section without Image */}
      <div className="bg-orange-500 px-8 py-12 sm:px-12 sm:py-16 text-white relative">
        <div className="flex justify-between items-start mb-8">
          <button 
            onClick={onBack}
            className="p-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full transition-all text-white"
            aria-label="Go back"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <button 
            onClick={(e) => onToggleSave(e, recipe)}
            className={`px-6 py-2 rounded-full backdrop-blur-md font-bold transition-all flex items-center gap-2 ${isSaved ? 'bg-white text-orange-500 shadow-lg' : 'bg-white/20 text-white hover:bg-white/30'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={isSaved ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {isSaved ? 'Saved' : 'Save Recipe'}
          </button>
        </div>

        <div className="max-w-2xl">
          <div className="flex flex-wrap gap-2 mb-6">
            {recipe.tags.map((tag, idx) => (
              <span key={idx} className="px-3 py-1 bg-white/20 text-white text-[10px] font-bold rounded-full uppercase tracking-widest backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">{recipe.title}</h2>
          <p className="text-lg text-orange-50 leading-relaxed opacity-90">
            {recipe.description}
          </p>
        </div>
      </div>

      <div className="p-8 sm:p-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-8 border-b border-orange-50 mb-10">
          <div className="text-center sm:text-left">
            <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">Prep</p>
            <p className="text-xl font-bold text-gray-800">{recipe.prepTime}</p>
          </div>
          <div className="text-center sm:text-left">
            <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">Cook</p>
            <p className="text-xl font-bold text-gray-800">{recipe.cookTime}</p>
          </div>
          <div className="text-center sm:text-left">
            <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">Serves</p>
            <p className="text-xl font-bold text-gray-800">{recipe.servings}</p>
          </div>
          <div className="text-center sm:text-left">
            <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">Skill</p>
            <p className="text-xl font-bold text-gray-800">{recipe.difficulty}</p>
          </div>
        </div>

        {/* Kid Friendly Tip */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-2xl mb-12 flex gap-4 items-start shadow-sm">
          <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-500 shadow-sm mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 className="font-bold text-blue-800 mb-1">Kid-Friendly Tip</h4>
            <p className="text-blue-700 text-sm leading-relaxed">{recipe.kidFriendlyTip}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 text-sm">1</span>
              Ingredients <span className="text-xs font-normal text-gray-400 ml-1">(Metric)</span>
            </h3>
            <ul className="space-y-4">
              {recipe.ingredients.map((ing, idx) => (
                <li key={idx} className="flex justify-between items-start pb-3 border-b border-orange-50/50">
                  <span className="text-gray-700 text-sm">{ing.item}</span>
                  <span className="font-bold text-orange-600 text-sm whitespace-nowrap ml-2">{ing.amount}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 bg-green-50 rounded-2xl p-6 border border-green-100">
              <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Health Notes
              </h4>
              <ul className="space-y-2">
                {recipe.nutritionalHighlights?.map((point, idx) => (
                  <li key={idx} className="text-xs text-green-700 flex gap-2 leading-relaxed">
                    <span className="text-green-400">•</span> {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 text-sm">2</span>
              Method
            </h3>
            <div className="space-y-6">
              {recipe.instructions.map((step, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center font-bold text-xs">
                    {idx + 1}
                  </div>
                  <p className="text-gray-600 leading-relaxed text-[15px] pt-1.5">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
