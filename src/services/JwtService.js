import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();
const secretKey = process.env.JWT_SECRET;
// Expiration date is set to 1 hour (3600s) in Supabase, no need to custom write other stuff here
// The entire JWT and claims are also handled in Supabase, where I included custom claims

const jwtService = {
    decodeToken(token) {
        return jwt.decode(token);
    },

    verifyJwt(token) {
        try {
            return jwt.verify(token, secretKey);
        } catch (error) {
            return null;
        }
    },

    extractRole(token) {
        const decoded = this.decodeToken(token);
        return decoded.user_role;
    }

};

export default jwtService;

