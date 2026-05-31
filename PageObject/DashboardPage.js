import { test, expect } from '@playwright/test';

class DashboardPage
{
    constructor(page)
    {
        this.page=page;
        this.HomeAutomation=page.getByText('Automation Practice')
        this.card=page.locator('.card');
        this.gotToCartPage=page.getByRole('listitem').getByRole('button',{name:'Cart'});
        this.productAddedMsg=page.getByLabel('Product Added To Cart');
    }

    async searchProductAndAddToCart(productName)
    {
        await expect(this.HomeAutomation).toHaveText('Automation Practice');
        await this.card.first().waitFor();
       // card.filter({hasText: 'IPHONE 13 PRO'}).getByRole('button',{name:'Add To Cart'}).click();
        await this.card.filter({hasText: productName}).getByRole('button',{name:'Add To Cart'}).click();
        console.log("total items "+ await this.card.count());  
        await expect(this.productAddedMsg).toContainText('Product Added To Cart');
        console.log("product added"+this.productAddedMsg.textContent());
        await this.gotToCartPage.click();
    }
}
module.exports={DashboardPage};