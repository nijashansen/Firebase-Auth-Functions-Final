import * as admin from "firebase-admin";
import {ProductRepository} from "./product.repository";
import {Product} from "../models/product";

export class ProductRepositoryFirebase implements ProductRepository{
    topProductsPath = 'top-products';
    setTopProducts(product: Product): Promise<any> {
        return this.db().doc(`${this.topProductsPath}/${product.uId}`).set(
            product
        );
    };

    deleteTopProducts(uId: string): Promise<any> {
        return this.db().doc(`${this.topProductsPath}/${uId}`).delete();
    }

    db(): FirebaseFirestore.Firestore {
        return admin.firestore();
    }
}
