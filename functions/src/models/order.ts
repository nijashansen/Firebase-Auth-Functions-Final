import {OrderLine} from "./orderline";

export interface Order {
    prodId: string,
    amount: number,
    orderLines: OrderLine[]
}
