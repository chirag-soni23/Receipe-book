import { Receipe } from "../models/receipeModel.js";
import { User } from "../models/userModel.js";

// saved receipe
export const savedReceipe = async (req, res) => {
    try {
        const { userId, receipeId } = req.body; 
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const receipe = await Receipe.findById(receipeId);
        if (!receipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        if (user.savedReceipe.includes(receipeId)) {
            return res.status(400).json({ message: 'Recipe already saved' });
        }

        user.savedReceipe.push(receipeId);
        await user.save();

        res.status(200).json({ message: 'Recipe saved successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error saving recipe', error });
    }
};

// get saved receipe
export const getSavedReceipe = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
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
