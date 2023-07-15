import { db } from '../config/database/config';

export const getDocuments = async (collection: string) => {
  const querySnapshot = await db.collection(collection).get();
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getDocument = async (collection: string, documentId: string) => {
  const docRef = db.collection(collection).doc(documentId);
  const doc = await docRef.get();
  if (doc.exists) {
    return { id: doc.id, ...doc.data() };
  } else {
    throw new Error('No such document!');
  }
};

export const getDocumentsWhere = async (
  collection: string,
  field: string,
  operator: FirebaseFirestore.WhereFilterOp,
  value: any
) => {
  const querySnapshot = await db.collection(collection).where(field, operator, value).get();
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

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

export const updateDocument = async (collection: string, documentId: string, data: any) => {
  // The field updatedAt is added with the server timestamp
  const docRef = db.collection(collection).doc(documentId);
  await docRef.update({ ...data, updatedAt: new Date() });
};

export const deleteDocument = async (collection: string, documentId: string) => {
  const docRef = db.collection(collection).doc(documentId);
  await docRef.delete();
};
