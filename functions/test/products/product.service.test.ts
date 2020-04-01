import {IMock, Mock, Times} from "moq.ts";
import {ProductRepository} from "../../src/products/product.repository";
import {ProductService} from "../../src/products/product.service";
import {Product} from "../../src/models/product";
import {StockRepository} from "../../src/stock/stock.repository";
import {Stock} from "../../src/models/stock";

describe('ProductService', () => {
    let productRepository: IMock<ProductRepository>;
    let stockRepository: IMock<StockRepository>;
    let productService: ProductService;
    const product: Product = {price: 100, name: 'HP', Id: 'ab'};
    const stock: Stock = {product: product, count: 5};
    beforeEach(() => {
        productRepository = new Mock<ProductRepository>()
            .setup(Repo => Repo.create(product))
            .returns(Promise.resolve(product));

        stockRepository = new Mock<StockRepository>()
            .setup(stockRepo => stockRepo.create(product.Id, product, 5))
            .returns(Promise.resolve(stock));

        productService = new ProductService(productRepository.object(), stockRepository.object());
    });

    it('Product Service need a stock repo and a product repo', () => {
        const productServiceDefined = new ProductService(productRepository.object(), stockRepository.object());
        expect(productServiceDefined).toStrictEqual(productServiceDefined);
    });

    it('should check if stock repo has a create function', async () => {
        await productService.create(product.Id, product);
        stockRepository.verify(stockRepo => stockRepo.create(product.Id, product, 1000000), Times.Exactly(1))
    });

    it('should create a new product and return it', async () => {
        const productAfter: Product = await productService.create(product.Id, product);
        expect(productAfter).toBe(product);
    });


    it('should add stock of 1000000 to a newly created product', async () => {
        await productService.create(product.Id, product);
        stockRepository.verify(stockRepo => stockRepo.create(product.Id, product, 1000000), Times.Exactly(1));
    });


});
