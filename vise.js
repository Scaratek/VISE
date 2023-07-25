const crypto = require('crypto');
const fs = require('fs');

function Generate() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>?';
    const token = Array.from({ length: 64 }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
    return token;
}

function Encode(token, text) {
    const cipher = crypto.createCipher('aes-256-ctr', token);
    let encodedText = cipher.update(text, 'utf8', 'hex');
    encodedText += cipher.final('hex');
    return encodedText;
}

function Decode(token, encodedText) {
    const decipher = crypto.createDecipher('aes-256-ctr', token);
    let text = decipher.update(encodedText, 'hex', 'utf8');
    text += decipher.final('utf8');
    return text;
}

function Export(token, filePath) {
    fs.writeFileSync(filePath, token);
}

function Import(filePath) {
    try {
        const token = fs.readFileSync(filePath, 'utf8').trim();
        return token;
    } catch (error) {
        console.error('Error reading the token file:', error.message);
        return null;
    }
}

module.exports = {
    Generate,
    Encode,
    Decode,
    Export,
    Import,
};