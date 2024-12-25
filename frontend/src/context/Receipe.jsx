import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await axios.get("/api/receipe");
        setRecipes(response.data); 
      } catch (error) {
        toast.error("Failed to fetch recipes.");
      }
    }
    fetchRecipes();
  }, []);  

  const addRecipe = async (newRecipe) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("title", newRecipe.title);
    formData.append("description", newRecipe.description);
    formData.append("ingredients", newRecipe.ingredients);
    formData.append("instructions", newRecipe.instructions);
    formData.append("category", newRecipe.category);
    if (newRecipe.image) formData.append("image", newRecipe.image);

    try {
      const response = await axios.post("/api/receipe/create", formData); 
      setRecipes([response.data.recipe, ...recipes]);
      toast.success("Recipe added successfully!");
    } catch (error) {
      toast.error("Failed to add recipe.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateRecipe = async (recipeId, updatedRecipe) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", updatedRecipe.title);
    formData.append("description", updatedRecipe.description);
    formData.append("ingredients", updatedRecipe.ingredients);
    formData.append("instructions", updatedRecipe.instructions);
    formData.append("category", updatedRecipe.category);
    if (updatedRecipe.image) formData.append("image", updatedRecipe.image);

    try {
      const response = await axios.put(`/api/receipe/${recipeId}`, formData); 
      const updatedRecipes = recipes.map((recipe) =>
        recipe._id === recipeId ? response.data.recipe : recipe
      );
      setRecipes(updatedRecipes);
      toast.success("Recipe updated successfully!");
    } catch (error) {
      toast.error("Failed to update recipe.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteRecipe = async (recipeId) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(`/api/receipe/${recipeId}`); 
      setRecipes(recipes.filter(recipe => recipe._id !== recipeId));
      toast.success("Recipe deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete recipe.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        addRecipe,
        updateRecipe,
        deleteRecipe,
        isLoading,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipe = () => useContext(RecipeContext);
