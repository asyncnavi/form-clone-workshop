import { collection, doc, addDoc, getDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { FormSchema, Response } from "../types";
import { db } from "../firebase/config";

/**
 * 🔥 Save a new form to Firestore
 * @param form - FormSchema object to be saved
 * @returns Saved form ID
 */
export const saveForm = async (form: Omit<FormSchema, "id" | "created_at">) => {
  try {
    const formRef = await addDoc(collection(db, "forms"), {
      ...form,
      created_at: serverTimestamp(), 
    });

    console.log("Form saved with ID:", formRef.id);
    return formRef.id;
  } catch (error) {
    console.error("Error saving form:", error);
    throw error;
  }
};

/**
 * 🔥 Fetch a specific form by ID
 * @param formId - ID of the form to fetch
 * @returns FormSchema object or null if not found
 */
export const getFormById = async (formId: string): Promise<FormSchema | null> => {
  try {
    const formDoc = await getDoc(doc(db, "forms", formId));
    if (!formDoc.exists()) return null;

    return { id: formDoc.id, ...formDoc.data() } as FormSchema;
  } catch (error) {
    console.error("Error fetching form:", error);
    throw error;
  }
};

/**
 * 🔥 Save a response to a form
 * @param formId - ID of the form being responded to
 * @param userId - ID of the user submitting the response (nullable)
 * @param answers - Object containing field responses
 * @returns Response ID
 */
export const saveFormResponse = async (
  formId: string,
  userId: string | null,
  answers: Record<string, any>
) => {
  try {
    const responseRef = await addDoc(collection(db, `forms/${formId}/responses`), {
      user_id: userId || null,
      submitted_at: serverTimestamp(),
      answers,
    });

    console.log("Response saved with ID:", responseRef.id);
    return responseRef.id;
  } catch (error) {
    console.error("Error saving response:", error);
    throw error;
  }
};

/**
 * 🔥 Fetch all responses for a given form
 * @param formId - ID of the form
 * @returns List of responses
 */
export const fetchFormResponses = async (formId: string): Promise<Response[]> => {
  try {
    const responsesRef = collection(db, `forms/${formId}/responses`);
    const snapshot = await getDocs(responsesRef);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Response[];
  } catch (error) {
    console.error("Error fetching responses:", error);
    throw error;
  }
};
