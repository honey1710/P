import { test, expect } from '@playwright/test';
class OrderConfirmationPage{
    constructor(page){
        this.page=page;
        this.orderConfirmationMsg=this.page.locator('tbody h1');
        this.orderNum=this.page.locator('.em-spacer-1 label.ng-star-inserted')


    }

    async confirmOrder(){
        await (expect (this.orderConfirmationMsg).toHaveText('Thankyou for the order.'));
        console.log(await this.orderNum.textContent());
    }
}
module.exports={OrderConfirmationPage};