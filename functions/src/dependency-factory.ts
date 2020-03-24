import {ProductController} from "./products/product.controller";
import {ProductRepositoryFirebase} from "./products/product.repository.firebase";
import {ProductControllerFirebase} from "./products/product.controller.firebase";
import {ProductService} from "./products/product.service";
import {ProductRepository} from "./products/product.repository";


export class DependencyFactory {
    getProductController(): ProductController {
        const repo: ProductRepository = new ProductRepositoryFirebase();
        const service: ProductService = new ProductService(repo);
        return new ProductControllerFirebase(service);
    }
}
