import React, { useState } from 'react';
import { useRecipe } from '../context/Receipe';

const Home = () => {
  const { recipes, deleteRecipe, updateRecipe } = useRecipe();
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [editingRecipe, setEditingRecipe] = useState(null);

  const handleView = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleDelete = (recipeId) => {
    deleteRecipe(recipeId); 
  };

  const handleEdit = (recipe) => {
    setEditingRecipe(recipe);
    setSelectedRecipe(null); 
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedRecipe = {
      ...editingRecipe,
      title: e.target.title.value,
      description: e.target.description.value,
      ingredients: e.target.ingredients.value,
      instructions: e.target.instructions.value,
      category: e.target.category.value,
      image: e.target.image.files[0] || editingRecipe.image.url
    };
    updateRecipe(editingRecipe._id, updatedRecipe);
    setEditingRecipe(null); 
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="border p-4 rounded-md shadow-md">
            <img
              src={recipe.image && recipe.image.url}
              alt={recipe.title}
              className="w-full h-48 object-cover rounded-md"
            />
            <h2 className="text-xl font-semibold mt-2">{recipe.title}</h2>
            <p className="text-sm text-gray-500 mt-2">{recipe.description}</p>
            <p className="text-sm mt-2"><strong>Category:</strong> {recipe.category}</p>
            <p className="text-sm mt-2"><strong>Ingredients:</strong> {recipe.ingredients}</p>
            <p className="text-sm mt-2"><strong>Instructions:</strong> {recipe.instructions}</p>

            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => handleView(recipe)}
                className="bg-blue-500 text-white py-2 px-4 rounded-md"
              >
                View
              </button>
              <div>
                <button
                  onClick={() => handleDelete(recipe._id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-md mr-2"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEdit(recipe)}
                  className="bg-yellow-500 text-white py-2 px-4 rounded-md"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-lg">
            <h2 className="text-2xl font-semibold">{selectedRecipe.title}</h2>
            <img
              src={selectedRecipe.image && selectedRecipe.image.url}
              alt={selectedRecipe.title}
              className="w-full h-48 object-cover rounded-md mt-4"
            />
            <p className="mt-4">{selectedRecipe.description}</p>
            <p className="mt-2"><strong>Ingredients:</strong> {selectedRecipe.ingredients}</p>
            <p className="mt-2"><strong>Instructions:</strong> {selectedRecipe.instructions}</p>
            <p className="mt-2"><strong>Category:</strong> {selectedRecipe.category}</p>
            <button
              onClick={() => setSelectedRecipe(null)}
              className="bg-gray-500 text-white py-2 px-4 rounded-md mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {editingRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-lg">
            <h2 className="text-2xl font-semibold">Edit Recipe</h2>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-semibold">Title</label>
                <input
                  type="text"
                  id="title"
                  defaultValue={editingRecipe.title}
                  className="w-full px-4 py-2 border rounded-md mt-2"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-semibold">Description</label>
                <textarea
                  id="description"
                  defaultValue={editingRecipe.description}
                  className="w-full px-4 py-2 border rounded-md mt-2"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="ingredients" className="block text-sm font-semibold">Ingredients</label>
                <input
                  type="text"
                  id="ingredients"
                  defaultValue={editingRecipe.ingredients}
                  className="w-full px-4 py-2 border rounded-md mt-2"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="instructions" className="block text-sm font-semibold">Instructions</label>
                <textarea
                  id="instructions"
                  defaultValue={editingRecipe.instructions}
                  className="w-full px-4 py-2 border rounded-md mt-2"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-semibold">Category</label>
                <input
                  type="text"
                  id="category"
                  defaultValue={editingRecipe.category}
                  className="w-full px-4 py-2 border rounded-md mt-2"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="image" className="block text-sm font-semibold">Image</label>
                <input
                  type="file"
                  id="image"
                  className="w-full px-4 py-2 border rounded-md mt-2"
                />
              </div>
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setEditingRecipe(null)}
                  className="bg-gray-500 text-white py-2 px-4 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-md"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
