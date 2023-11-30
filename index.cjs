const { createCipheriv, randomBytes, createDecipheriv } = require('crypto');

const fs = require('fs');

/// Cipher and encrypt

function encryptImage(inputFilePath, outputFilePath, key, iv){
    const inputBuffer = fs.readFileSync(inputFilePath);

    const cipher = createCipheriv('aes256', key, iv);
    cipher.setAutoPadding(true)

    const encryptedBuffers = [cipher.update(inputBuffer), cipher.final()];
    const encryptedMessage = Buffer.concat(encryptedBuffers);

    fs.writeFileSync(outputFilePath, encryptedMessage);

}

// Decipher and decrypt

function decryptImage(inputFilePath, newOutFilePath, key, iv){

    const inputBuffer = fs.readFileSync(inputFilePath);
    const encryptedMessage = inputBuffer

    const decipher = createDecipheriv('aes256', key, iv);
    decipher.setAutoPadding(true);

    const decryptedBuffers = [decipher.update(encryptedMessage) , decipher.final()];
    const decryptedMessage = Buffer.concat(decryptedBuffers);

    // console.log(`Deciphered: ${decryptedMessage.toString('utf-8')}`);

    fs.writeFileSync(newOutFilePath, decryptedMessage);
}

// ===================================

const inputFilePath = 'D:\\CODES\\NodeJS\\images\\Screenshot 2023-10-12 193543.png'
const outputFilePath = 'D:\\CODES\\NodeJS\\images\\encrypted_images\\encrypted-image.enc';
const key = randomBytes(32);
const iv = randomBytes(16);

encryptImage(inputFilePath, outputFilePath, key, iv);

const newOutputFilePath = 'D:\\CODES\\NodeJS\\images' + '\\decrypted_images'+'\\Screenshot 2023-10-12 193543.png';

decryptImage(outputFilePath, newOutputFilePath, key, iv);