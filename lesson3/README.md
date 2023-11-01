//

//Create API
//and fetch data from js
//store them in a db

//task complete crud
//How to send data to backend
//store them in a db

//

//create a product
product schema
{
productId: name;
product_name: string;
inStock: number;
available: boolean;
foreignID: userId;
}

Orders
{
user: id;
products: [{
product_id: number;
product_name: string;
}];
}

POST /api/v1/product
GET /api/v1/product
GET /api/v1/product?query="product name"
PUT /api/v1/product
request body
{
product_name: ,

    }

//
