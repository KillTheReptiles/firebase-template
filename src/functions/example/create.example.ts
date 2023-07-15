import { DB_COLLECTION } from '../../database/collections';
import { createDocument } from '../../database/querys';

export const createExample = async (data: any, context: any) => {
  createDocument(DB_COLLECTION.EXAMPLE, data);
};
