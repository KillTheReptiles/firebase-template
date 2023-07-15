// Here you need to put all the routes of the loaders
// example:
// import { loader as loaderProduct } from '../../functions/product/loader.product';
import { loader as loaderExample } from '../../functions/example/loader.example';

export function loadAllFunctions(exports: any) {
  // loaderProduct(exports);
  loaderExample(exports);
}
