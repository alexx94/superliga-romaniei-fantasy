import supabase from '../config/supabase.js';

export const authService = {
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
    },

    async login(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        
        return { data, error };
    }   
};

export default authService;