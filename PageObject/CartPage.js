class CartPage{
        constructor(page){
        this.page=page;
        this.cartpageInfoWrap=page.locator('.infoWrap');
    }

    async buyNow(productName){
    
    await this.cartpageInfoWrap.first().waitFor();
    await this.cartpageInfoWrap.filter({hasText:productName}).getByRole('button',{name:'Buy Now'}).click();
    }
}
module.exports={CartPage};