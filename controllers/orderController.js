import Order from "../models/order.js";
import Product from "../models/product.js";
import { isItAdmin, isItCustomer } from "./userController.js";

export async function createOrder(req,res){

    const data = req.body;

    const orderInfo = {
        orderedItems : []
        
    }

    if(req.user == null){
        res.status(401).json({
            message : "Please login and try again"
        })
        return
    }

    orderInfo.email = req.user.email;

    const lastOrder = await Order.find().sort({orderDate:-1}).limit(1);
    console.log(lastOrder)

    if(lastOrder.length == 0) {
        orderInfo.orderId = "ORD0001"
    }else{
        const lastOrderId = lastOrder[0].orderId; //ORD0065
        const lastOrderNumberInString = lastOrderId.replace("ORD", ""); //0065 : but still string value. we have to convert it to Integer type(next line we will do it)
        const lastOrderNumber = parseInt(lastOrderNumberInString); //Integer value
        const currentOrderNumber = lastOrderNumber + 1;
        const formattedNumber = String(currentOrderNumber).padStart(4, '0');

        orderInfo.orderId = "ORD" + formattedNumber;

    }

    let oneDayCost = 0;

                for(let i=0; i<data.orderedItems.length; i++){

                    try{
                        const product = await Product.findOne({key : data.orderedItems[i].key})

                        if(product == null){
                            res.status(404).json({
                                message : "Product with key " + data.orderedItems[i].key + " not found"
                            })
                            return;
                        }
                        if(product.availability == false){
                            res.status(400).json({
                                message : "Product with key " + data.orderedItems[i].key + "is not available"
                            })
                            return;
                        }
                        orderInfo.orderedItems.push({
                        
                        product : {
                            key : product.key,
                            name : product.name,
                            image : product.image[0],
                            price : product.price,
                            
                        },
                        quantity : data.orderedItems[i].qty
                           
                        })

                        oneDayCost += product.price * data.orderedItems[i].qty;

                    }catch(error){
                        res.status(500).json({
                            error : "failed to create order"
                        })
                    }
                }
    
    orderInfo.days = data.days;
    orderInfo.startingDate = data.startingDate;
    orderInfo.endingDate = data.endingDate;
    orderInfo.totalAmount = oneDayCost * data.days;

    try{
        const newOrder = new Order(orderInfo);
        const result = await newOrder.save();
        res.json({
            message : "Order created successfully",
            order : result
        })
    }catch(error){
        res.status(500).json({
            error : "failed to create order",
        })
        console.log(error);
    }
}

export async function getQuote(req, res) {
    console.log(req.body)
	const data = req.body;
	const orderInfo = {
		orderedItems: [],
	};
	let oneDayCost = 0;
	for (let i = 0; i < data.orderedItems.length; i++) {
		try {
			const product = await Product.findOne({ key: data.orderedItems[i].key });
			if (product == null) {
				res.status(404).json({
					message:
						"Product with key " + data.orderedItems[i].key + " not found",
				});
				return;
			}
			if (product.availability == false) {
				res.status(400).json({
					message:
						"Product with key " +
						data.orderedItems[i].key +
						" is not available",
				});
				return;
			}
			orderInfo.orderedItems.push({
				product: {
					key: product.key,
					name: product.name,
					image: product.image[0],
					price: product.price,
				},
				quantity: data.orderedItems[i].qty,
			});

			oneDayCost += product.price * data.orderedItems[i].qty;
		} catch (e) {
			res.status(500).json({
				message: "Failed to create order",
			});
			return;
		}
	}

	orderInfo.days = data.days;
	orderInfo.startingDate = data.startingDate;
	orderInfo.endingDate = data.endingDate;
	orderInfo.totalAmount = oneDayCost * data.days;
	try {
		res.json({
			message: "Order quatation",
			total: orderInfo.totalAmount,
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({
			message: "Failed to create order",
		});
	}
}

export async function getOrders(req, res) {

    
        if(isItCustomer(req)){
            try{
                const orders =  await Order.find({email : req.user.email});
                res.json({
                    orders
                })
            }catch(e){
                res.status(500).json({
                    message : "Failed to get orders"
            })
            
            }

        }else if(isItAdmin(req)){
            try{
                const orders =  await Order.find();
                res.json({
                    orders
                })
            }catch(e){
                res.status(500).json({
                    message : "Failed to get orders"
            })
            
            }
        }else{
            res.status(403).json({
                message : "You are not authorized to perform this action. please login and try again"
            })
        }
   
}