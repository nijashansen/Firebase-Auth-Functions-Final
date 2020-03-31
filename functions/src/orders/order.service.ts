import {OrderRepository} from "./order.repository";
import {StockRepository} from "../stock/stock.repository";
import {Order} from "../models/order";

export class OrderService {
    constructor(private orderRepository: OrderRepository, private stockRepository: StockRepository) {
        console.log(this.orderRepository);
        console.log(this.stockRepository);
    }

    execute(order: Order): Promise<Order> {
        if(!order.orderLines || order.orderLines.length < 1) {
            throw new TypeError('You need orderlines to execute a order');
        }
        console.log('order', order);
        this.stockRepository.lowerStock(order).then(r => {
            console.log(r)
        }).catch(reason => {
            console.log('it wont work' + reason)
        });
        return Promise.resolve(order);
    }
}
