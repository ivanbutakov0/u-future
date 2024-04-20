// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configurations
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: 'ufuture-66779.firebaseapp.com',
	projectId: 'ufuture-66779',
	storageBucket: 'ufuture-66779.appspot.com',
	messagingSenderId: '765162359503',
	appId: '1:765162359503:web:31e02d86478c4d8c4e85ba',
	measurementId: 'G-7V0YZ2SKZW',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)
