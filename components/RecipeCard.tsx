
import React from 'react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  onView: (recipe: Recipe) => void;
  onToggleSave: (e: React.MouseEvent, recipe: Recipe) => void;
  isSaved: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onView, onToggleSave, isSaved }) => {
  return (
    <div 
      className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-orange-100 flex flex-col h-full"
      onClick={() => onView(recipe)}
    >
      <div className="p-6 pb-0 flex justify-between items-start">
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-orange-100 text-orange-600 text-[10px] font-bold rounded-full uppercase tracking-wider">
            {recipe.difficulty}
          </span>
          <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full uppercase tracking-wider">
            {recipe.prepTime}
          </span>
        </div>
        <button 
          onClick={(e) => onToggleSave(e, recipe)}
          className={`p-2 rounded-full transition-all ${isSaved ? 'bg-orange-500 text-white' : 'bg-gray-50 text-gray-400 hover:text-orange-500 hover:bg-orange-50'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={isSaved ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
      
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight group-hover:text-orange-600 transition-colors">
          {recipe.title}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-3 mb-6 leading-relaxed">
          {recipe.description}
        </p>
      </div>

      <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-4 text-[11px] text-gray-400 font-bold uppercase tracking-tight">
          <div className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {recipe.cookTime} cook
          </div>
          <div className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {recipe.servings} Serves
          </div>
        </div>
        <div className="text-orange-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
