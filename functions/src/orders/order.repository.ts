import {Product} from "../models/product";

export interface OrderRepository {

    updateStockCount(product: Product): Promise<Product>;

}
