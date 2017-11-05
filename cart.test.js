const expect = require('expect');

var Cart = require('./Cart');

it('should return the correct total price', () => {
    var myCart = new Cart('SteveCart');
    myCart.items.push({
        itemType: 'Coupon',
        discountType: 'AmountSpecificItems',
        discountAmount: 2,
        itemNumber: 1
    },{
        itemType: 'Coupon',
        discountType: 'PercentAllItems',
        discountAmount: 50,
        itemNumber: 2
    },{
        itemType: 'Coupon',
        discountType: 'PercentNextItem',
        discountAmount: 50,
        itemNumber: 3
    },{ 
        itemType: 'Order',
        unitPrice: 10,
        quantity: 1,
        itemNumber: 4
    },{
        itemType: 'Order',
        unitPrice: 1,
        quantity: 5,
        itemNumber: 5
    });
    var res = myCart.totalPrice();
    expect(res).toBe(4.5);
});