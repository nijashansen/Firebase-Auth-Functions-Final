import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
import {DependencyFactory} from "./dependency-factory";

const serviceAccount = require('../secret.json');
const dependencyFactory = new DependencyFactory();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://fir-auth-ac899.firebaseio.com'
});

exports.productWritten = functions.firestore
    .document('products/{prodId}')
    .onWrite((snap, context) => {
        return dependencyFactory.getProductController().writtenProducts(snap, context);
    });

exports.products = functions.https.onRequest((request, response) => {
    admin.firestore().collection('products')
        .get()
        .then(product => {
            const listOfProduct: any = [];

            product.forEach(products => {
                let prod = products.data();
                prod.id = products.id;
                listOfProduct.push(prod)
            });
    response.send(listOfProduct)
    }).catch(err => {console.log(err)});
 });

exports.topProductUpdated = functions.firestore
    .document('top-products/{prodId}')
    .onUpdate((snap, context) => {
        return dependencyFactory.getProductController().updatedTopProduct(snap, context);
    });
