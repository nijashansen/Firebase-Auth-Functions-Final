import {Product} from "../models/product";
import {Stock} from "../models/stock";
import {Order} from "../models/order";


export interface StockRepository {
    create(prodId: string, product: Product, number: number): Promise<Stock>;

    lowerStock(order: Order): Promise<void>;

    updateProductName(prodId: any, productAfter: Product): Promise<void>;
}
