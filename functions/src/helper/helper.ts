import {ProductRepository} from "../products/product.repository";
import {IMock, Mock} from "moq.ts";
import {OrderRepository} from "../orders/order.repository";
import {StockRepository} from "../stock/stock.repository";
import {Product} from "../models/product";
import {Stock} from "../models/stock";
import {Order} from "../models/order";
import {OrderLine} from "../models/orderline";



export class Helper {

    getProductRepositoryMock(): IMock<ProductRepository> {
        return new Mock<ProductRepository>()
            .setup(repo => repo.create(this.getProduct1()))
            .returns(Promise.resolve(this.getProduct1()));
    }

    getOrderRepositoryMock(): IMock<OrderRepository> {
        return new Mock<OrderRepository>();
    }

    getStockRepositoryMock(): IMock<StockRepository> {
        return new Mock<StockRepository>()
            .setup(stockRepo => stockRepo.create(this.getProduct1().Id ,this.getProduct1(), 5))
            .returns(Promise.resolve(this.getStock1()))
            .setup(stockRepo => stockRepo.lowerStock(this.getOrder1()))
            .returns(Promise.resolve());
    }

    getProduct1(): Product {
        return this.product1;
    }

    getProduct2(): Product {
        return this.product2;
    }

    getStock1(): Stock {
        return this.stock1;
    }

    getOrder1(): Order {
        return this.order1;
    }

    getOrderLine1(): OrderLine {
        return this.ol1;
    }

    stock1: Stock = {
        count: 1,
        product: this.getProduct1()
    };

    product1: Product = {
        name: 'Product 1',
        Id: 'p1',
        price: 22,
    };

    product2: Product = {
        name: 'Product 2',
        Id: 'p2',
        price: 23,
    };

    ol1: OrderLine = {
        Id: 'ol1',
        product: this.getProduct1(),
    };

    order1: Order = {
        prodId: 'o1',
        orderLines: [this.getOrderLine1()],
        amount: 1
    };

}
