import { ref } from "firebase/database";
import React from "react";
import { useState } from "react";
import { sendData } from "./firebase/firebasemethod";
import { getDatabase, set, onValue } from "firebase/database";
const App = () => {
  const db = getDatabase();

  const [inpData, setinpData] = useState("");
  const [Items, setItems] = useState([]);

  const adData = () => {

    console.log(inpData)
    if (!inpData) {
    } else {
      setItems([...Items, inpData]);
      setinpData("");
    }
    set(ref(db, "users/"), Items);

    const dbRef = ref(db, "/user");
    return onValue(
      dbRef,
      (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const childData = childSnapshot.val();
          // arr.push(childData);
          console.log(childData);
          // ...
        });
      },

      {
        onlyOnce: false,
      }
    );

    // sendData(Items, "user", ref.user.uid)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  const deleteItem = (id) => {
    console.log(id);
    const upItemssData = Items.filter((element, index) => {
      console.log(index)
      return index == id==[];
    });
    setItems(upItemssData);
  };

  const removeData = () => {
    setItems([]);
  };

  return (
    <>
      <div>
        <input
          value={inpData}
          onChange={(e) => setinpData(e.target.value)}
          type="text"
        />
        <button onClick={adData}>Submit Data</button>
        <button onClick={removeData}>DeleteAllData</button>
      </div>
      <div>
        <ol>
          {Items.map((element, index) => {
            return (
              <>
                <li key={index}>
                  {element}{" "}
                  <button onClick={() => deleteItem(index)}>Delete</button>
                </li>
              </>
            );
          })}
        </ol>
      </div>
    </>
  );
};
export default App;
