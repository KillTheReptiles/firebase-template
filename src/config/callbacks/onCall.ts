import { region, https } from 'firebase-functions';
import type { Runnable, HttpsFunction } from 'firebase-functions';

// this is a helper function to create a callable function with the correct region

// TODO: Find a way to not use "https" import but importing CallableContext directly
export const onCall = (
  callback: (data: any, context: https.CallableContext) => any,
  worldRegion = 'southamerica-east1'
): HttpsFunction & Runnable<any> => {
  return region(worldRegion).https.onCall(callback);
};
