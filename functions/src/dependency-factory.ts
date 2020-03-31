import {ProductController} from "./products/product.controller";
import {ProductRepositoryFirebase} from "./products/product.repository.firebase";
import {ProductControllerFirebase} from "./products/product.controller.firebase";
import {ProductService} from "./products/product.service";
import {ProductRepository} from "./products/product.repository";
import {StockRepository} from "./stock/stock.repository";
import {StockRepositoryFirebase} from "./stock/stock.repository.firebase";
import {StockControllerFirebase} from "./stock/stock.controller.firebase";
import {StockService} from "./stock/stock.service";
import {StockController} from "./stock/stock.controller";

export class DependencyFactory {
    getProductController(): ProductController {
        const productRepo: ProductRepository = new ProductRepositoryFirebase();
        const stockRepo: StockRepository = new StockRepositoryFirebase();
        const service: ProductService = new ProductService(productRepo, stockRepo);
        return new ProductControllerFirebase(service);
    }

    getStockController(): StockController {
        const stockRepo: StockRepository = new StockRepositoryFirebase();
        const stockService: StockService = new StockService(stockRepo);
        return new StockControllerFirebase(stockService);
    }
}
