import firebase, { database } from "../../firebase";

export const actionUserName = () => (dispatch) => {
  setTimeout(() => {
    return dispatch({ type: "CHANGE_USER", value: "Syaifuddin Zuhri" });
  }, 2000);
};

export const registerUserAPI = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: "CHANGE_LOADING", value: true });
    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((res) => {
        console.log("Success: ", res);
        dispatch({ type: "CHANGE_LOADING", value: false });
        resolve(true);
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        dispatch({ type: "CHANGE_LOADING", value: false });
        // ...
        reject(false);
      });
  });
};

export const loginUserAPI = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: "CHANGE_LOADING", value: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((res) => {
        localStorage.setItem("userData", JSON.stringify(res));
        const dataUser = {
          email: res.user.email,
          uid: res.user.uid,
          emailVerified: res.user.emailVerified,
          refreshToken: res.user.refreshToken,
        };
        dispatch({ type: "CHANGE_LOADING", value: false });
        dispatch({ type: "CHANGE_ISLOGIN", value: true });
        dispatch({ type: "CHANGE_USER", value: dataUser });
        resolve(dataUser);
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        dispatch({ type: "CHANGE_LOADING", value: false });
        dispatch({ type: "CHANGE_ISLOGIN", value: false });
        // ...
        reject(false);
      });
  });
};

export const addDataToAPI = (data) => (dispatch) => {
  database.ref("users/" + data.userId).push({
    title: data.title,
    date: data.date,
    content: data.content,
  });
};

export const getDataFromAPI = (userId) => (dispatch) => {
  const urlNotes = database.ref("users/" + userId);
  return new Promise((resolve, reject) => {
    urlNotes.on("value", function (snapshot) {
      // Convert Object to Array
      const data = [];
      Object.keys(snapshot.val()).map((key) => {
        data.push({
          id: key,
          data: snapshot.val()[key],
        });
      });
      dispatch({ type: "SET_NOTES", value: data });
      resolve(snapshot.val());
    });
  });
};

export const updateDataFromAPI = (data) => (dispatch) => {
  const urlNotes = database.ref(`users/${data.userId}/${data.noteId}`);
  return new Promise((resolve, reject) => {
    urlNotes.set(
      {
        title: data.title,
        date: data.date,
        content: data.content,
      },
      (err) => {
        if (err) {
          reject(false);
        } else {
          resolve(true);
        }
      }
    );
  });
};

export const deleteDataFromAPI = (data) => (dispatch) => {
  const urlNotes = database.ref(`users/${data.userId}/${data.noteId}`);
  return new Promise((resolve, reject) => {
    urlNotes.remove();
  });
};
