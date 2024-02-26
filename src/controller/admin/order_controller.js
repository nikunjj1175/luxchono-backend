const OrderModel = require("../../model/order_model");
const { productPipeline } = require("../product_controller");
const ApiError = require("../../util/error");

async function getAllOrder(_req, res, next) {
    try {
        const orders = await OrderModel.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: "user",
                    pipeline: [
                        {
                            $project: {
                                username: 1,
                                email: 1,
                                phoneNo: 1,
                            }
                        }
                    ]
                }
            },
            {
                $unwind: "$user"
            },
            {
                $unwind: "$products"
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'products.product',
                    foreignField: '_id',
                    as: "product",
                    pipeline: [
                        ...productPipeline
                    ]
                }
            },
            {
                $unwind: "$product"
            },
            {
                $project: {
                    _id: 1,
                    orderId: 1,
                    paymentId: 1,
                    product: "$product",
                    orderProductPrice: "$products.orderProductPrice",
                    quantity: "$products.quantity",
                    totalAmount: 1,
                    discountAmount: 1,
                    paymentAmount: 1,
                    status: 1,
                    user: 1,
                    fullName: 1,
                    phoneNo: 1,
                    alternativePhoneNo: 1,
                    state: 1,
                    city: 1,
                    address: 1,
                    pincode: 1,
                    addressType: 1,
                    isCancelled: 1,
                    date: 1,
                    latitude: 1,
                    longitude: 1,
                    deliveryDate: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    __v: 1
                }
            },
            {
                $group: {
                    _id: "$_id",
                    orderId: { $first: "$orderId" },
                    paymentId: { $first: "$paymentId" },
                    products: {
                        $push: {
                            product: "$product",
                            orderProductPrice: "$orderProductPrice",
                            quantity: "$quantity"
                        }
                    },
                    totalAmount: { $first: "$totalAmount" },
                    discountAmount: { $first: "$discountAmount" },
                    paymentAmount: { $first: "$paymentAmount" },
                    status: { $first: "$status" },
                    user: { $first: "$user" },
                    fullName: { $first: "$fullName" },
                    phoneNo: { $first: "$phoneNo" },
                    alternativePhoneNo: { $first: "$alternativePhoneNo" },
                    state: { $first: "$state" },
                    city: { $first: "$city" },
                    address: { $first: "$address" },
                    pincode: { $first: "$pincode" },
                    addressType: { $first: "$addressType" },
                    isCancelled: { $first: "$isCancelled" },
                    date: { $first: "$date" },
                    latitude: { $first: "$latitude" },
                    longitude: { $first: "$longitude" },
                    deliveryDate: { $first: "$deliveryDate" },
                    createdAt: { $first: "$createdAt" },
                    updatedAt: { $first: "$updatedAt" },
                    __v: { $first: "$__v" }
                }
            },
            { $sort: { createdAt: -1 } }
        ]).exec();
        res.status(200).json({ statusCode: 200, success: true, data: orders });
    } catch (e) {
        return next(new ApiError(400, "Internal server error"));
    }
}

module.exports = { getAllOrder };