const admin = require('firebase-admin');
import serviceAccount from '../firebaseKey/firebase-service-key.json';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gramhive.appspot.com'

});

export async function uploadFileToFirebase(filePath: string, fileBuffer: Buffer, contentType: string): Promise<string> {
    const bucket = admin.storage().bucket();
    console.log('');
    
    
    try {
        await bucket.file(filePath).save(fileBuffer, {
            metadata: { contentType }
        });

        const file = bucket.file(filePath);
        const signedUrl = await file.getSignedUrl({
            action: 'read',
            expires: Date.now() + 15 * 60 * 1000,
        });

        console.log('File uploaded successfully');
        console.log('Signed URL:', signedUrl);

        return signedUrl[0]; 
    } catch (error) {
        console.error('Error uploading file to Firebase Storage:', error);
        throw error;
    }
}