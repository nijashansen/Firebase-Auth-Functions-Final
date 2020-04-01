import {IMock, Mock, Times} from "moq.ts";
import {StockRepository} from "../../src/stock/stock.repository";
import {Order} from "../../src/models/order";
import {StockService} from "../../src/stock/stock.service";
import {Product} from "../../src/models/product";

describe('StockService', () => {
    const order: Order = { amount: 2, prodId: 'abc', orderLines: []};
    const product: Product = { Id: 'abbbbb', price: 299, name: 'johhny' };
    let stockRepository: IMock<StockRepository>;
    let stockService: StockService;
    beforeEach(() => {
        stockRepository = new Mock<StockRepository>()
            .setup(instance => instance.lowerStock(order))
            .returns(Promise.resolve())
            .setup(instance => instance.create(product.Id, product, 5))
            .returns(Promise.resolve());


        stockService = new StockService(stockRepository.object());
    });

    it('should have a function to lower stock', async () => {
        await stockService.lowerStock(order);
        stockRepository.verify(stockRepo => stockRepo.lowerStock(order), Times.Exactly(1));
    });

    it('should lower stock by the amount that parsed in', async () => {

    });

});
