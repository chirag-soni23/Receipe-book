import React, { useState } from 'react';
import { useRecipe } from '../context/Receipe';
import { UserData } from '../context/User';
import { IoSaveOutline } from "react-icons/io5";
import { IoSaveSharp } from "react-icons/io5";

const Home = () => {
  const { user } = UserData();
  const { recipes, deleteRecipe, updateRecipe } = useRecipe();
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [editingRecipe, setEditingRecipe] = useState(null);

  const handleView = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleDelete = (recipeId) => {
    if (confirm("you want to delete receipe ?")) {
      deleteRecipe(recipeId);
    }
  };

  const handleEdit = (recipe) => {
    if (confirm("you want to update receipe ?")) {
      setEditingRecipe(recipe);
      setSelectedRecipe(null);
    }
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
      image: e.target.image.files[0] || editingRecipe.image.url,
    };
    updateRecipe(editingRecipe._id, updatedRecipe);
    setEditingRecipe(null);
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out">
            <img
              src={recipe.image && recipe.image.url}
              alt={recipe.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className='flex items-center justify-between'>
                <h2 className="text-xl font-semibold text-gray-800">{recipe.title}</h2>
                <div className="relative group">
                  <IoSaveOutline size={24} className="cursor-pointer" />
                  <span className="absolute top-0 right-0 transform translate-y-6 opacity-0 group-hover:opacity-100 text-sm bg-gray-800 text-white rounded py-1 px-2 transition-opacity duration-300">
                    Save
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">{recipe.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                <strong>Category:</strong> {recipe.category}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                <strong>Ingredients:</strong> {recipe.ingredients}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                <strong>Instructions:</strong> {recipe.instructions}
              </p>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => handleView(recipe)}
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition-colors duration-300"
                >
                  View
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDelete(recipe._id)}
                    className={`bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-500 transition-colors duration-300 ${user.role == "admin" ? "block" : "hidden"}`}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEdit(recipe)}
                    className={`bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-500 transition-colors duration-300 ${user.role == "admin" ? "block" : "hidden"}`}
                  >
                    Edit
                  </button>
                </div>
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

      {editingRecipe && (
        <div className="fixed inset-0 p-4 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-lg w-full sm:max-w-md md:max-w-lg">
            <h2 className="text-2xl font-semibold text-gray-800">Edit Recipe</h2>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mt-4">Title</label>
                <input
                  type="text"
                  id="title"
                  defaultValue={editingRecipe.title}
                  className="w-full px-4 py-2 border rounded-md mt-2"
                />
              </div>
              <div className="flex gap-2">
                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-semibold text-gray-700">Description</label>
                  <textarea
                    id="description"
                    defaultValue={editingRecipe.description}
                    className="w-full px-4 py-2 border rounded-md mt-2"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="ingredients" className="block text-sm font-semibold text-gray-700">Ingredients</label>
                  <input
                    type="text"
                    id="ingredients"
                    defaultValue={editingRecipe.ingredients}
                    className="w-full px-4 py-2 border rounded-md mt-2"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <div className="mb-4">
                  <label htmlFor="instructions" className="block text-sm font-semibold text-gray-700">Instructions</label>
                  <textarea
                    id="instructions"
                    defaultValue={editingRecipe.instructions}
                    className="w-full px-4 py-2 border rounded-md mt-2"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="category" className="block text-sm font-semibold text-gray-700">Category</label>
                  <input
                    type="text"
                    id="category"
                    defaultValue={editingRecipe.category}
                    className="w-full px-4 py-2 border rounded-md mt-2"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="image" className="block text-sm font-semibold text-gray-700">Image</label>
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
                  className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500"
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
