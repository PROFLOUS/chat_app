//UserSearched document in firestore

import firebase from "../firebase";
import "firebase/compat/firestore";
const db = firebase.firestore().collection("/UserSearched");
const getById = (id) => {
  return db.doc(id).get();
};
const create = (data) => {
  return db.add(data);
};
const update = (id, value) => {
  return db.doc(id).update(value);
};
const remove = (id) => {
  return db.doc(id).delete();
};
const UserSearchedService = {
  getById,
  create,
  update,
  remove,
};
export default UserSearchedService;
