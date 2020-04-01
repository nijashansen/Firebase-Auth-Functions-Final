import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
import {DependencyFactory} from "./dependency-factory";


const serviceAccount = require('../secret.json');
const difa = new DependencyFactory();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://fir-auth-ac899.firebaseio.com'
});

exports.addOrderRemovesStock = functions.firestore
    .document('orders/{orderId}')
    .onCreate((snap, context) => {
        return difa.getStockController().lowerStock(snap, context);
    });

exports.productWritten = functions.firestore
    .document('products/{prodId}')
    .onWrite((snap, context) => {
        return difa.getProductController().writtenProducts(snap, context);
    });

exports.newProduct = functions.firestore
    .document('products/{prodId}')
    .onWrite((snap, context) => {
        return difa.getProductController().create(snap, context);
    });

exports.updateNameOfProducts = functions.firestore
    .document('products/{prodId}')
    .onUpdate((change, context) => {
        return difa.getProductController().updateAllProductNames(change, context);
    });

exports.topProductUpdated = functions.firestore
    .document('top-products/{prodId}')
    .onUpdate((snap, context) => {
        return difa.getProductController().updatedTopProduct(snap, context)
    });
