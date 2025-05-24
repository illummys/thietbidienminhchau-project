    const jwt = require('jsonwebtoken');

    module.exports = (req, res, next) => {
    const auth = req.headers.authorization;
    
    if (!auth || !auth.startsWith('Bearer '))
        return res.status(401).json({ message: 'No token provided' });

    const token = auth.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        console.log("JWT_SECRET (verify):", process.env.JWT_SECRET);

        req.admin = payload;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
    };
