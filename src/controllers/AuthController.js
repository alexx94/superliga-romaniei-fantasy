import { authService } from '../services/AuthService.js';

export const authController = {
    /**
    * Handle user signup
    * @param {object} req - Express request object
    * @param {object} res - Express response object
    */

    async signUp(req, res) {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        const { data, error } = await authService.signUp(email, password);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        // 201 -> request successful si una sau mai multe resurse au fost create (un user nou, si un nou rol user)
        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: data.user
        })
    },

    async login(req, res) {
        const { email, password } = req.body;    
        
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        const { data, error } = await authService.login(email, password);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        // only JWT that expires in 1h, no refresh token for now
        const access_token = data.session.access_token;
        
        res.cookie('sb-jwt', access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // right now its false cause  there's no production yet
            sameSite: 'Strict', // Disabled since I have two different domains, I need to use the same domain to make it work I think
            maxAge: 60 * 60 * 1000
        });

        return res.status(200).json({ user: data.user });
    }
};

export default authController;