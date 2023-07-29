import { db } from '../config/database/config';

// getDocuments is a function that returns all the documents from a collection
export const getDocuments = async (collection: string) => {
  const querySnapshot = await db.collection(collection).get();
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// getDocument is a function that returns a document from a collection
export const getDocument = async (collection: string, documentId: string) => {
  const docRef = db.collection(collection).doc(documentId);
  const doc = await docRef.get();
  if (doc.exists) {
    return { id: doc.id, ...doc.data() };
  } else {
    throw new Error('No such document!');
  }
};

// getDocumentsWhere is a function that returns all the documents from a collection that match with the conditions
interface WhereCondition {
  field: string;
  operator: FirebaseFirestore.WhereFilterOp;
  value: any;
}

export const getDocumentsWhere = async (collection: string, conditions: WhereCondition[]): Promise<any[]> => {
  let query: FirebaseFirestore.Query = db.collection(collection);
  conditions.forEach((condition) => {
    query = query.where(condition.field, condition.operator, condition.value);
  });
  const querySnapshot = await query.get();
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// createDocument is a function that creates a document in a collection
export const createDocument = async (collection: string, data: any, documentId?: string) => {
  if (documentId) {
    await db
      .collection(collection)
      .doc(documentId)
      .set({ ...data, updatedAt: new Date(), createdAt: new Date() }); // The field createdAt and updatedAt are added with the server timestamp

    return documentId;
  } else {
    const docRef = await db.collection(collection).add({ ...data, updatedAt: new Date(), createdAt: new Date() }); // The field createdAt and updatedAt are added with the server timestamp
    return docRef.id;
  }
};

// updateDocument is a function that updates a document in a collection
export const updateDocument = async (collection: string, documentId: string, data: any) => {
  // The field updatedAt is added with the server timestamp
  const docRef = db.collection(collection).doc(documentId);
  await docRef.update({ ...data, updatedAt: new Date() });
};

// deleteDocument is a function that deletes a document in a collection
export const deleteDocument = async (collection: string, documentId: string) => {
  const docRef = db.collection(collection).doc(documentId);
  await docRef.delete();
};
