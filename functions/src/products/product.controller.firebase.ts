import {ProductService} from "./product.service";
import {Change, EventContext} from "firebase-functions";
import {DocumentSnapshot} from "firebase-functions/lib/providers/firestore";
import {ProductController} from "./product.controller";
import {Product} from "../models/product";

export class ProductControllerFirebase implements ProductController{

    constructor(private productService: ProductService) {
    }

    writtenProducts(snap: Change<DocumentSnapshot>, context: EventContext): Promise<void> {
        const productBefore = snap.before.data() as Product;
        const productAfter = snap.after.data() as Product;
        return this.productService.writeProducts(context.params.prodId, productBefore, productAfter)
    }

    updatedTopProduct(snap: Change<DocumentSnapshot>, context: EventContext): Promise<void> {
        const productBefore = snap.before.data() as Product;
        const productAfter = snap.after.data() as Product;
        return this.productService.updateTopProduct(context.params.prodId, productBefore, productAfter);
    }

    create(snap: Change<DocumentSnapshot>, context: EventContext): Promise<Product> {
        const product = snap.after.data() as Product;
        return this.productService.create(context.params.prodId, product);
    }
}
