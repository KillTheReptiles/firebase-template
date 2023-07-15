import { onCall } from '../../config/callbacks/onCall';
import { createExample } from './create.example';

export const loader = (exports: any): void => {
  exports.createExample = onCall(createExample);
};
