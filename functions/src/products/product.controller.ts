import {Change, EventContext} from "firebase-functions";
import {DocumentSnapshot} from "firebase-functions/lib/providers/firestore";
import {Product} from "../models/product";

export interface ProductController {
    writtenProducts(snap: Change<DocumentSnapshot>, context: EventContext): Promise<void>;

    updatedTopProduct(snap: Change<DocumentSnapshot>, context: EventContext): Promise<void>;

    create(snap: Change<DocumentSnapshot>, context: EventContext): Promise<Product>;

    updateAllProductNames(change: Change<DocumentSnapshot>, context: EventContext): Promise<Product>;
}
