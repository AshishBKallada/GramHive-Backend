const jwt = require('jsonwebtoken');

export const adminTokenGenerator = (Id: string) => {
    return jwt.sign({ Id }, 'nagato-pain', { expiresIn: '1d' });
}