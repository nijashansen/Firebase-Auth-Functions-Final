import {OrderRepository} from "./order.repository";
import {Product} from "../models/product";
import * as admin from "firebase-admin";

export class OrderRepositoryFirebase implements OrderRepository {

    updateStockCount(product: Product): Promise<Product> {
        return Promise.resolve(product);
    }

    db(): FirebaseFirestore.Firestore {
        return admin.firestore();
    }

}
