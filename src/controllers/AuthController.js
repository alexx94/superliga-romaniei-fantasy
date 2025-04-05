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
    }
};

export default authController;