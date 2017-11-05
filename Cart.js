var Order = require('./Order');

module.exports = Cart;

function Cart (name) {
    this.name = name;
    this.items = new Array();
    this.Orders = new Array();
};

Cart.prototype.printItems = function() {
    console.log('Name:', this.name);
    console.log('Items:', this.items);
};

Cart.prototype.totalPrice = function() {

    //Get the orders
    this.items.filter((item) => {
        return item.itemType ==='Order';
    }).forEach((order) => {
        this.Orders.push(new Order(order.itemNumber, order.unitPrice, order.quantity));
    });

    //Apply Coupons to orders where applicable
    this.items.filter((item) => {
        return item.itemType ==='Coupon';
    }).forEach((coupon) =>{
        if(coupon.discountType ==='AmountSpecificItems'){
            console.log(this.Orders[coupon.itemNumber -1]);
            this.Orders[coupon.itemNumber -1].coupons.push(coupon);
        } else if (coupon.discountType === 'PercentNextItem'){
            var order = this.Orders.find((order) => { return order.id > coupon.itemNumber});
            if(order){
                order.coupons.push(coupon);
            }
        }
        else{
            this.Orders.forEach((order) => {
                order.coupons.push(coupon);
            })
        }
    });
    
    var totalPrice = this.Orders.reduce((total, order) =>{
        return total + order.DiscountedPrice();
    }, 0);

    return totalPrice;
};

