import { Receipe } from "../models/receipeModel.js";
import { User } from "../models/userModel.js";

// Save a recipe
export const saveRecipe = async (req, res) => {
    try {
        const userId = req.user._id; 
        const recipeId = req.params.id; 

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const recipe = await Receipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        if (user.savedReceipe.includes(recipeId)) {
            return res.status(400).json({ message: 'Recipe already saved' });
        }

        user.savedReceipe.push(recipeId);
        await user.save();

        res.status(200).json({ message: 'Recipe saved successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error saving recipe', error });
    }
};

// Get saved recipes
export const getSavedRecipes = async (req, res) => {
    try {
        const userId = req.user._id; 

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const savedRecipes = await Receipe.find({
            '_id': { $in: user.savedReceipe }
        });

        res.status(200).json(savedRecipes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching saved recipes', error });
    }
};

// Remove a saved recipe (only from the saved list)
export const removeSavedRecipe = async (req, res) => {
    try {
        const userId = req.user._id; 
        const recipeId = req.params.id; 

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.savedReceipe.includes(recipeId)) {
            return res.status(400).json({ message: 'Recipe not found in saved list' });
        }

        user.savedReceipe = user.savedReceipe.filter(id => id.toString() !== recipeId);
        await user.save();

        res.status(200).json({ message: 'Recipe removed from saved list', user });
    } catch (error) {
        res.status(500).json({ message: 'Error removing saved recipe', error });
    }
};
