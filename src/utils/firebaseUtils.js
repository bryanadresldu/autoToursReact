// src/utils/firebaseUtils.js
import { collection, getDocs } from "firebase/firestore";
import { dbFirebase } from "../firebase";

// Obtener todos los tours desde Firestore
export const obtenerTours = async () => {
  try {
    const querySnapshot = await getDocs(collection(dbFirebase, "tours"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error al obtener los tours:", error);
    return [];
  }
};
