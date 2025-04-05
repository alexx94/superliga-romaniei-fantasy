import supabase from '../config/supabase.js';

export const  authService = {
    /**
     * Register a new user in Supabase 
     * @param {string} email - User's email
     * @param {string} password - User's password
     * @returns {Promise} - Supabase response from signup
    */

    // Can be modified to include metadata etc. later on
    async signUp(email, password) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password
        });

        return { data, error };
    }

    // TODO: login function, and make sure to include in token the user role to reduce requests to db and speed
    // TODO: stocare token in cookies (httpOnly) si samesite strict si toate nebuniile
};

export default authService;