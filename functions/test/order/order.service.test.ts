import {Helper} from "../../src/helper/helper";
import {IMock, Times} from "moq.ts";
import {StockRepository} from "../../src/stock/stock.repository";
import {OrderRepository} from "../../src/orders/order.repository";
import {OrderService} from "../../src/orders/order.service";

describe('OrderService', () => {
    let testHelper: Helper;
    let stockRepository: IMock<StockRepository>;
    let orderRepository: IMock<OrderRepository>;
    let orderService: OrderService;
    beforeEach(() => {
        testHelper = new Helper();
        orderRepository = testHelper.getOrderRepositoryMock();
        stockRepository = testHelper.getStockRepositoryMock();
        orderService = new OrderService(orderRepository.object(), stockRepository.object());
    });

    it('OrderService needs a orderRepository and a stockRepository', () => {
        orderService = new OrderService(orderRepository.object(), stockRepository.object());
        expect(orderService).toBeDefined()
    });

    it('When Executing order I need atleast 1 orderline', () => {
        const order = testHelper.getOrder1();
        order.orderLines = [];
        expect(() => {orderService.execute(order)}).toThrowError(TypeError);
        expect(() => {orderService.execute(order)}).toThrowError('You need orderlines to execute a order');
    });

    it('When I execute a order1 stock should go down with the correct amount of products bought with a orderline count of 1', async () => {
        const order = testHelper.getOrder1();
        const orderAfterExecute = await orderService.execute(order);
        stockRepository.verify(stockRepo => stockRepo.lowerStock(order.orderLines[0].product),
            Times.Exactly(1));
        expect(orderAfterExecute).toBeDefined();
    });
});
