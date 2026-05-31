import { test, expect } from '@playwright/test';
const {PageObjectManager}=require('../PageObject/PageObjectManager');
const dataSet=JSON.parse(JSON.stringify(require('../TestData/e2eTestData.json')));
/** 
const {loginPage}=require('../PageObject/loginPage');
const {DashboardPage}=require('../PageObject/DashboardPage');
const {CartPage}=require('../PageObject/CartPage');
const {PlaceOrderPage}=require('../PageObject/PlaceOrderPage');
const {OrderConfirmationPage}=require('../PageObject/OrderConfirmationPage');


test('e2e pom', async ({ page }) => {
    const login = new loginPage(page);
    const dashboard=new DashboardPage(page);
    const cart=new CartPage(page);
    const placeOrder=new PlaceOrderPage(page);
    const orderConfirm=new OrderConfirmationPage(page);

    const productName='IPHONE 13 PRO';

    await login.login('himtesting1710@gmail.com','Test@123');
    await dashboard.searchProductAndAddToCart(productName);
    await cart.buyNow(productName);
    await placeOrder.fillShippingAddressAndPlaceOrder();
    await orderConfirm.confirmOrder();

    });
    
    */

    test('page object manager testing',async({page})=>{

        const pageManager=new PageObjectManager(page);
        const login=pageManager.getLogin();
        const dashboard=pageManager.getDashboard();
        const cart=pageManager.getCart();
        const placeOrder=pageManager.getPlaceOrder();
        const orderConfirm=pageManager.getOrderConfirmation();

        //const productName='IPHONE 13 PRO';

       // await login.login('himtesting1710@gmail.com','Test@123');
       await login.login(dataSet.user,dataSet.pwd);
        await dashboard.searchProductAndAddToCart(dataSet.productName);
        await cart.buyNow(dataSet.productName);
        await placeOrder.fillShippingAddressAndPlaceOrder(dataSet.country);
        await orderConfirm.confirmOrder();


    })