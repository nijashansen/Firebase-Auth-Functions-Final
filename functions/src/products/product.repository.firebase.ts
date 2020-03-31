import * as admin from "firebase-admin";
import {ProductRepository} from "./product.repository";
import {Product} from "../models/product";

export class ProductRepositoryFirebase implements ProductRepository{
    topProductsPath = 'top-products';
    productsPath = 'products';

    setTopProducts(product: Product): Promise<any> {
        return this.db().doc(`${this.topProductsPath}/${product.Id}`).set(product);
    };

    deleteTopProducts(uId: string): Promise<any> {
        return this.db().doc(`${this.topProductsPath}/${uId}`).delete();
    }

    db(): FirebaseFirestore.Firestore {
        return admin.firestore();
    }

    async create(product: Product): Promise<Product> {
        await this.db().doc(`${this.productsPath}`).create(product);
        return Promise.resolve(product);
    }
}
