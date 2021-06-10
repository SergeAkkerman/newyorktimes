import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyAVt-pjd5k3sjMWh3XCnkp1gXNMT1HbU00",
	authDomain: "linkuptest2-188b4.firebaseapp.com",
	databaseURL: "https://linkuptest2-188b4-default-rtdb.firebaseio.com",
	projectId: "linkuptest2-188b4",
	storageBucket: "linkuptest2-188b4.appspot.com",
	messagingSenderId: "322688091766",
	appId: "1:322688091766:web:c0fe0dba32002a6d678157",
};

const fire = firebase.initializeApp(firebaseConfig);
export default fire;
