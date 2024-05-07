const admin = require('firebase-admin');

import serviceAccount from '../firebaseKey/firebase-service-key.json';


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gramhive.appspot.com'

});

export async function uploadFileToFirebase(filePath: string, fileBuffer: Buffer, contentType: string): Promise<string> {
console.log('FN called');

    const bucket = admin.storage().bucket();
    try {
        await bucket.file(filePath).save(fileBuffer, {
            metadata: { contentType }
        });
        console.log('File uploaded successfully');
        return `https://storage.googleapis.com/${bucket.name}/${filePath}`;
    } catch (error) {
        console.error('Error uploading file to Firebase Storage:', error);
        throw error;
    }
}