import {StockRepository} from "./stock.repository";
import {Order} from "../models/order";

export class StockService {

    constructor(private stockRepository: StockRepository) {
    }

    async lowerStock(order: Order): Promise<Order> {
        await this.stockRepository.lowerStock(order);
        return Promise.resolve(order);
    }

}
