import { validatePlayerObj } from "../validator/playerSchema.js";

const validatePlayerRequest = (req, res, next) => {
    // To be valid it has to have at least name and team, since these are required in my database,
    // based on the current implementation. For this I am using Joi to perform the validation.
    
    // TODO: check if the player is already in database

    const playerDTO = req.body;
    const result = validatePlayerObj(playerDTO);

    console.log("PlayerDTO: ", playerDTO);
    if (!result.isValid) {
        return res.status(400).json({
            message: result.message,
            data: playerDTO
        });
    }

    next();
};

export default validatePlayerRequest;