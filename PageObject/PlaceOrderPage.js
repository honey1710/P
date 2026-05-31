class PlaceOrderPage{
    constructor(page){
        this.page=page;
        this.selectCountry=this.page.getByPlaceholder('Select Country');
        this.placeOrder=this.page.getByText('Place Order');

    }

    async fillShippingAddressAndPlaceOrder(country)
    {
        //await this.selectCountry.pressSequentially('ind');
        //await this.page.getByRole('button',{name:'India'}).nth(1).click();
        await this.selectCountry.pressSequentially(country);
        await this.page.getByRole('button',{name:country}).click();
        await this.placeOrder.click();
    }
}
module.exports={PlaceOrderPage};