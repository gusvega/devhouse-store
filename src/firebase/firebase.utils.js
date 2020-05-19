import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: 'AIzaSyCV1RLeXKxN4Ivy23AHJ096AtkGFVm5YIc',
	authDomain: 'devhouse-db.firebaseapp.com',
	databaseURL: 'https://devhouse-db.firebaseio.com',
	projectId: 'devhouse-db',
	storageBucket: 'devhouse-db.appspot.com',
	messagingSenderId: '856241225067',
	appId: '1:856241225067:web:da472f8102fd8a616aa02e',
	measurementId: 'G-9NW0GEV28C'
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);

	const snapShot = await userRef.get();

	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();
		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData
			});
		} catch (error) {
			console.log('error creating user', error.message);
		}
	}

	return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
