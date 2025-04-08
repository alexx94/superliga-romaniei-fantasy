import jwtService from '../services/JwtService.js';

const authorizeRoles = (roles) => (req, res, next) => {
    const token = req.cookies['sb-jwt'];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const valid = jwtService.verifyJwt(token);
    if (!valid) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const userRole = valid?.user_role;

    if (!roles.includes(userRole)) {
        return res.status(403).json({ message: 'Forbidden' });
    }

    req.user = valid;
    next();
};

export default authorizeRoles;