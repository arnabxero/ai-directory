import jwt from 'jsonwebtoken';

function generateToken(data) {
    try {
        const generated_token = jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_VALIDITY });
        return generated_token;
    } catch (e) {
        return false;
    }
}

function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, {
            ignoreExpiration: true,
        });

        return true;
    } catch (error) {
        return false;
    }
}


function verifyTokenStrict(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        return true;
    } catch (error) {
        return false;
    }
}

function isExpired(token) {
    try {
        const decoded = jwt.decode(token);
        if (!decoded || !decoded.exp) {
            return true;
        }
        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp < currentTime;
    } catch (error) {
        console.error(error);
        return true;
    }
}


function regenerateToken(token) {
    try {
        if (isExpired(token)) {
            const decoded = jwt.decode(token);

            delete decoded.iat;
            delete decoded.exp;

            const newData = { ...decoded };
            const newToken = generateToken(newData);

            return newToken;
        } else {
            return token;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

module.exports = {
    generateToken,
    verifyToken,
    isExpired,
    regenerateToken,
    verifyTokenStrict,
};
