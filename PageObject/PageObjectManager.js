const {loginPage}=require('../PageObject/loginPage');
const {DashboardPage}=require('../PageObject/DashboardPage');
const {CartPage}=require('../PageObject/CartPage');
const {PlaceOrderPage}=require('../PageObject/PlaceOrderPage');
const {OrderConfirmationPage}=require('../PageObject/OrderConfirmationPage');



class PageObjectManager{
    constructor(page){

        this.page=page;
        this.login = new loginPage(page);
        this.dashboard=new DashboardPage(page);
        this.cart=new CartPage(page);
        this.placeOrder=new PlaceOrderPage(page);
        this.orderConfirm=new OrderConfirmationPage(page);
    }

    getLogin()
    {
        return this.login;
    }

    getDashboard()
    {
        return this.dashboard;
    }

    getCart()
    {
        return this.cart;
    }

    getPlaceOrder()
    {
        return this.placeOrder;
    }

    getOrderConfirmation()
    {
        return this.orderConfirm;
    }

    

}
module.exports={PageObjectManager};