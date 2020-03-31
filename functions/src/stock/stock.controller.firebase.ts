import {StockController} from "./stock.controller";
import {EventContext} from "firebase-functions";
import {DocumentSnapshot} from "firebase-functions/lib/providers/firestore";
import {StockService} from "./stock.service";

import {Order} from "../models/order";


export class StockControllerFirebase implements StockController{

    constructor(private stockService: StockService) {
    }

    lowerStock(snap: DocumentSnapshot, context: EventContext): Promise<Order> {
        const order = snap.data() as Order;
        return this.stockService.lowerStock(order);
    }

}
