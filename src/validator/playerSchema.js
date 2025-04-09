import Joi from "joi";

const VALID_TEAMS = [
    "SCM-Gloria-Buzau",
    "Botosani",
    "Hermannstadt",
    "Rapid-Bucuresti",
    "UTA-Arad",
    "Universitatea-Cluj",
    "Farul-Constanta",
    "Politehnica-Iasi",
    "Otelul-Galati",
    "CFR-Cluj",
    "Dynamo-Bucuresti",
    "Unirea-Slobozia",
    "Sepsi-Sfantu-Gheorghe",
    "FCSB",
    "Petrolul-Ploiesti",
    "CS-Universitatea-Craiova"
]; 

const VALID_POSITIONS = ["GK", "DF", "MF", "FW"];

// Blueprint for how a valid player object should look like
// Use this inside the middleware to validate the input, and then display messages/errors accordingly
const playerSchema = Joi.object({
    // I can customize this in the future, as I will improve my app and my database to be more complex
    player: Joi.string()
        .min(2)
        .pattern(/^[a-zA-Z\s]+$/)
        .required(),
    
    team: Joi.string()
        .valid(...VALID_TEAMS)
        .required(),

    position: Joi.string()
        .pattern(new RegExp(`^(${VALID_POSITIONS.join('|')})(,(${VALID_POSITIONS.join('|')}))*$`))
        .optional(),

    age: Joi.number().integer().min(16).max(40).optional(),
    games: Joi.number().integer().min(0).optional(),
    games_starts: Joi.number().integer().min(0).optional(),
    minutes: Joi.number().integer().min(0).optional(),
    goals: Joi.number().integer().min(0).optional(),
    assists: Joi.number().integer().min(0).optional(),
    goals_pens: Joi.number().integer().min(0).optional(),
    pens_made: Joi.number().integer().min(0).optional(),
    cards_yellow: Joi.number().integer().min(0).optional(),
    cards_red: Joi.number().integer().min(0).optional(),
    nation: Joi.string().optional(),
});

export function validatePlayerObj(player) {
    const { error } = playerSchema.validate(player);

    if (error) {
        return {
            isValid: false,
            message: error.details[0].message
        }
    }

    return {
        isValid: true,
        message: "Player input is valid."
    }
}