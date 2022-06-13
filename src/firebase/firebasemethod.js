import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app from "./firebaseconfig";
import { getDatabase, ref, set, onValue, push } from "firebase/database";

const auth = getAuth(app);
const database = getDatabase(app);

// firebase Authentication methods

let signUpUser = (obj) => {
  return createUserWithEmailAndPassword(auth, obj.email, obj.password, obj.uid);
};

let logInUser = (obj) => {
  return signInWithEmailAndPassword(auth, obj.email, obj.password);
};
// firebase Authentication methods

// firebase Database methods

let sendData = (obj, nodeName, id) => {
  let objkey = ref(database, nodeName);
  obj.id = push(objkey).key;
  console.log(obj.id);

  let refrence = ref(database, `${nodeName}/${id ? id : obj.id} `);
  return set(refrence, obj);
};

//get data method //

let getData = (nodeName) => {
  const dbRef = ref(database, nodeName);

  onValue(
    dbRef,
    (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        console.log(childData);
        // ...
      });
    },

    {
      onlyOnce: false,
    }
  );
  //get data method //
};

// firebase Database methods

export { signUpUser, logInUser, sendData, getData };
