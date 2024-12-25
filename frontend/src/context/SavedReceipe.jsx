import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const SavedContext = createContext();

export const useSaved = () => {
  return useContext(SavedContext);
};

export const SavedProvider = ({ children }) => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSavedRecipes = async () => {
    try {
      const response = await axios.get('/api/getsave');
      setSavedRecipes(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching saved recipes');
      setLoading(false);
    }
  };

  const saveRecipe = async (recipeId) => {
    try {
      const response = await axios.post(`/api/save/${recipeId}`);
      if (response.status === 200) {
        setSavedRecipes(prevState => [...prevState, response.data]);
        window.location.reload();
      }
    } catch (err) {
      setError('Error saving recipe');
    }
  };

  const removeSavedRecipe = async (recipeId) => {
    try {
      const response = await axios.delete(`/api/delete/${recipeId}`);
      if (response.status === 200) {
        setSavedRecipes(prevState => prevState.filter(recipe => recipe._id !== recipeId));
      }
    } catch (err) {
      setError('Error removing saved recipe');
    }
  };

  useEffect(() => {
    fetchSavedRecipes();
  }, []);

  return (
    <SavedContext.Provider
      value={{
        savedRecipes,
        saveRecipe,
        removeSavedRecipe,
        loading,
        error,
      }}
    >
      {children}
    </SavedContext.Provider>
  );
};
