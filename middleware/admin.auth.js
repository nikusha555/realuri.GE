import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {
    try {
        // Extract token from cookies instead of headers
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach admin details to the request object
        req.admin = decoded;

        next(); // Proceed to the next middleware or route
    } catch (error) {
        console.error('Auth Error:', error);
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

export default adminAuth;
