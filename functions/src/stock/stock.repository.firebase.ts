import * as admin from "firebase-admin";
import {StockRepository} from "./stock.repository";
import {Stock} from "../models/stock";
import {Product} from "../models/product";
import FieldValue = admin.firestore.FieldValue;
import {Order} from "../models/order";

export class StockRepositoryFirebase implements StockRepository{
    stockPath = 'stock';

    db(): FirebaseFirestore.Firestore {
        return admin.firestore();
    }

    async create(prodId: string, product: Product, count: number): Promise<Stock> {
        const stock: Stock = { count: count, product: product};
        await this.db().doc(`${this.stockPath}/${prodId}`).set(stock);
        return Promise.resolve(stock);
    }

    async lowerStock(order: Order): Promise<void> {
        const stock = this.db().collection(`${this.stockPath}`).doc(order.prodId);
        await stock.update({count: FieldValue.increment(-order.amount)}).catch();
        return Promise.resolve();
    }

    async updateProductName(prodId: any, productAfter: Product) {
        const stock = this.db().collection(`${this.stockPath}`).doc(productAfter.Id);
        await stock.update({name: productAfter.name}).catch();
        return Promise.resolve();
    }
}
