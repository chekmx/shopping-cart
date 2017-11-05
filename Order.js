module.exports = Order;

function Order (id, price, quantity) {
    this.id = id;
    this.unitPrice = price;
    this.quantity = quantity;
    this.coupons = new Array();
};

Order.prototype.DiscountedPrice = function(){
    var discountedPrice = this.unitPrice * this.quantity;
    this.coupons.forEach((coupon) => {
        if(coupon.discountType ==="PercentAllItems" || coupon.discountType ==="PercentNextItem"){
            discountedPrice = discountedPrice * (100 - coupon.discountAmount) / 100;
        }else if(coupon.discountType =="AmountSpecificItems"){
            discountedPrice = discountedPrice - coupon.discountAmount;
        }
    });
    return discountedPrice;
};

