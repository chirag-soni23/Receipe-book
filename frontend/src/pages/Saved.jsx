import React, { useState } from 'react';
import { useSaved } from '../context/SavedReceipe';
import { IoTrashOutline } from "react-icons/io5";

const Saved = () => {
  const { savedRecipes, removeSavedRecipe } = useSaved();
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleView = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleDelete = (recipeId) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      removeSavedRecipe(recipeId);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-gray-800">Saved Recipes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
        {savedRecipes.map((recipe) => (
          <div key={recipe._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={recipe.image && recipe.image.url}
              alt={recipe.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">{recipe.title}</h2>
              <p className="text-sm text-gray-600 mt-2">{recipe.description}</p>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => handleView(recipe)}
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition-colors duration-300"
                >
                  View
                </button>
                <button
                  onClick={() => handleDelete(recipe._id)}
                  className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-500 transition-colors duration-300"
                >
                  <IoTrashOutline size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-lg w-full sm:max-w-md md:max-w-lg">
            <h2 className="text-2xl font-semibold text-gray-800">{selectedRecipe.title}</h2>
            <img
              src={selectedRecipe.image && selectedRecipe.image.url}
              alt={selectedRecipe.title}
              className="w-full h-48 object-cover rounded-md mt-4"
            />
            <p className="mt-4 text-gray-700">{selectedRecipe.description}</p>
            <p className="mt-2 text-gray-600"><strong>Ingredients:</strong> {selectedRecipe.ingredients}</p>
            <p className="mt-2 text-gray-600"><strong>Instructions:</strong> {selectedRecipe.instructions}</p>
            <p className="mt-2 text-gray-600"><strong>Category:</strong> {selectedRecipe.category}</p>
            <button
              onClick={() => setSelectedRecipe(null)}
              className="bg-gray-600 text-white py-2 px-4 rounded-md mt-4 hover:bg-gray-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Saved;
