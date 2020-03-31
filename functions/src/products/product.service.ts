import {ProductRepository} from "./product.repository";
import {Product} from "../models/product";
import {StockRepository} from "../stock/stock.repository";



export class ProductService {
    constructor(private productRepository: ProductRepository, private stockRepository: StockRepository) {
    }

    writeProducts(
        prodId: string,
        productBefore: Product,
        productAfter: Product,
    ): Promise<void> {
        if (productAfter) {
            return this.productRepository.setTopProducts({
                Id: prodId,
                name: productAfter.name,
                price: productAfter.price,
            })
        } else {
            return this.productRepository.deleteTopProducts(prodId);
        }
    }

    updateTopProduct(prodId: string, productBefore: Product, productAfter: Product): Promise<void> {
        const name = productAfter.name.toUpperCase();
        return this.productRepository.setTopProducts({
            Id: prodId,
            name: name,
            price: productAfter.price,
        });
    }

    async create(prodId: string, product: Product): Promise<Product> {
        await this.stockRepository.create(prodId, product, 1000000);
        return Promise.resolve(product);
    }
}
