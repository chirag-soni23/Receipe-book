import { createContext, useContext, useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);

    // Fetch all recipes
    async function fetchAllRecipes() {
        try {
            setLoading(true);
            const { data } = await axios.get("/api/receipe/getall");
            setRecipes(data);
            setLoading(false);
        } catch (error) {
            toast.error("Failed to load recipes");
            setLoading(false);
        }
    }

    // Fetch a single recipe by ID
    async function fetchSingleRecipe(id) {
        try {
            const { data } = await axios.get(`/api/receipe/get/${id}`);
            return data;
        } catch (error) {
            toast.error("Failed to load recipe");
        }
    }

    // Add a new recipe
    async function addRecipe(title, ingredients, instruction, category, image, navigate) {
        setBtnLoading(true);
        try {
            const { data } = await axios.post("/api/receipe/create", { title, ingredients, instruction, category, image });
            toast.success(data.message);
            fetchAllRecipes(); // Refresh recipes list
            setBtnLoading(false);
            navigate("/recipes");
        } catch (error) {
            toast.error(error.response.data.message);
            setBtnLoading(false);
        }
    }

    // Update an existing recipe
    async function updateRecipe(id, title, ingredients, instruction, category, image) {
        setBtnLoading(true);
        try {
            const { data } = await axios.put(`/api/receipe/update/${id}`, { title, ingredients, instruction, category, image });
            toast.success(data.message);
            fetchAllRecipes(); // Refresh recipes list
            setBtnLoading(false);
        } catch (error) {
            toast.error(error.response.data.message);
            setBtnLoading(false);
        }
    }

    // Delete a recipe
    async function deleteRecipe(id) {
        try {
            const { data } = await axios.delete(`/api/receipe/delete/${id}`);
            toast.success(data.message);
            fetchAllRecipes(); 
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        fetchAllRecipes();
    }, []);

    return (
        <RecipeContext.Provider value={{
            recipes, 
            loading, 
            btnLoading, 
            addRecipe, 
            updateRecipe, 
            deleteRecipe, 
            fetchSingleRecipe
        }}>
            {children}
            <Toaster />
        </RecipeContext.Provider>
    );
};

export const RecipeData = () => useContext(RecipeContext);
