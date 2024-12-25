import { Receipe } from "../models/receipeModel.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";


export const createRecipe = async (req, res) => {
    try {
        const { title, description, ingredients, instructions, category } = req.body;
        let imageUrl = null;

        if (req.file) {
            const dataUri = getDataUri(req.file); 
            const uploadedImage = await cloudinary.uploader.upload(dataUri, {
                folder: 'recipes'  
            });

            imageUrl = {
                id: uploadedImage.public_id,
                url: uploadedImage.secure_url
            };
        }

        const newRecipe = new Receipe({
            title,
            description,
            ingredients: ingredients.split(','),
            instructions,
            category,
            image: imageUrl
        });

        await newRecipe.save();  
        res.status(201).json({ message: 'Recipe created successfully', recipe: newRecipe });
    } catch (error) {
        res.status(500).json({ message: 'Error creating recipe', error });
    }
};

export const getRecipeById = async (req, res) => {
    try {
        const recipe = await Receipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching recipe', error });
    }
};

export const getAllRecipes = async (req, res) => {
    try {
        const recipes = await Receipe.find();
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching recipes', error });
    }
};

export const updateRecipe = async (req, res) => {
    try {
        const { title, description, ingredients, instructions, category } = req.body;
        let imageUrl = null;

        
        if (req.file) {
            const dataUri = getDataUri(req.file); 
            const uploadedImage = await cloudinary.uploader.upload(dataUri, {
                folder: 'recipes'
            });

            imageUrl = {
                id: uploadedImage.public_id,
                url: uploadedImage.secure_url
            };
        }

        const updatedRecipe = await Receipe.findByIdAndUpdate(
            req.params.id,
            {
                title,
                description,
                ingredients: ingredients.split(','), 
                instructions,
                category,
                image: imageUrl
            },
            { new: true } 
        );

        if (!updatedRecipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        res.status(200).json({ message: 'Recipe updated successfully', recipe: updatedRecipe });
    } catch (error) {
        res.status(500).json({ message: 'Error updating recipe', error });
    }
};

export const deleteRecipe = async (req, res) => {
    try {
        const recipe = await Receipe.findByIdAndDelete(req.params.id);

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        
        if (recipe.image && recipe.image.id) {
            await cloudinary.uploader.destroy(recipe.image.id);
        }

        res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting recipe', error });
    }
};
