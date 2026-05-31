
//imports Playwright's testing functions (test, expect) and its API request feature (request) from the Playwright Test library 
const  {test,expect,request} =require ('@playwright/test');

//json format api request payload 
const logindatapayload={userEmail: "himtesting1710@gmail.com", userPassword: "Test@123"};
const createOrderPayload={orders:[{country:"Cuba",productOrderedId:"67a8dde5c0d3e6622a297cc8"}]};
let token;
let apicontext;

test('get token',async()=>
    {
        //create a new api context (just like page context)
       apicontext =await request.newContext({ ignoreHTTPSErrors: true}); 

        //post method which accepts url , paylooad
        const response=await apicontext.post('https://rahulshettyacademy.com/api/ecom/auth/login', 
        {
            //pass headers  & payload  
            data:logindatapayload   
            
        });

        //validate status code 
        expect(response.ok).toBeTruthy();

        //convert response into json 
        const json= await response.json();

        //extract any attribute from response json (here token)
         token=json.token;

let createOrderResponse;
         try{
            console.log(createOrderPayload);
             createOrderResponse=await apicontext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
                {
                    data:createOrderPayload,
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization': 'Bearer ${token}'
                    },
                }
            );
    
            //console.log('Full response:', JSON.stringify(createOrderResponse, null, 2));
        }
             catch (error) {
            console.error('Error:', error.response?.data || error.message);
        }
           const createOrderResponseJson=await createOrderResponse.json();
            const getOrderId= createOrderResponseJson.orders[0]
            console.log("hiiiiiiiiiiiiiiiiiiiiii"+createOrderResponseJson.orders[0]);
            expect(createOrderResponseJson.ok).toBeTruthy();
       
    });

    test.skip('create order',async()=>
        
        {
            let createOrderResponse;
             console.log(token);
             try{
             createOrderResponse=await apicontext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
                {
                    data:createOrderPayload,
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization':token
                    }
                }
            );
    
            console.log('Full response:', JSON.stringify(createOrderResponse, null, 2));
        }
             catch (error) {
            console.error('Error:', error.response?.data || error.message);
        }
           const createOrderResponseJson=await createOrderResponse.json();
            const getOrderId= createOrderResponseJson.orders[0]
            console.log("hiiiiiiiiiiiiiiiiiiiiii"+createOrderResponseJson.orders[0]);
            expect(createOrderResponseJson.ok).toBeTruthy();
        });

    

test.skip('place order using api ', async ({ page }) => {


    //set token in cookies 
    //addInitScript method injects a script into the page before it loads, setting a token value in localStorage. 
    //token is  extracted from a login API call & can be set in cookies, allowing to bypass the login UI & simulate an authenticated session.
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);
    await page.goto('https://rahulshettyacademy.com/client');

    const HomeAutomation = page.getByText('Automation Practice')
    const card = page.locator('.card');
    const gotToCartPage = page.getByRole('listitem').getByRole('button', { name: 'Cart' });
    const productAddedMsg = page.getByLabel('Product Added To Cart');
    const cartpageInfoWrap = page.locator('.infoWrap');
    const selectCountry = page.getByPlaceholder('Select Country');
    const placeOrder = page.getByText('Place Order');

    await expect(HomeAutomation).toHaveText('Automation Practice');
    await card.first().waitFor();
    card.filter({ hasText: 'IPHONE 13 PRO' }).getByRole('button', { name: 'Add To Cart' }).click();


    console.log("total items " + await card.count());



    await expect(productAddedMsg).toContainText('Product Added To Cart');
    console.log("product added" + productAddedMsg.textContent());
    await gotToCartPage.click();
    await cartpageInfoWrap.first().waitFor();
    cartpageInfoWrap.filter({ hasText: 'IPHONE 13 PRO' }).getByRole('button', { name: 'Buy Now' }).click();

    await selectCountry.pressSequentially('ind');
    await page.getByRole('button', { name: 'India' }).nth(1).click();


    await placeOrder.click();
    await (expect(page.locator('tbody h1')).toHaveText('Thankyou for the order.'));
    const ordId=await page.locator('.em-spacer-1 label.ng-star-inserted').textContent();
    const ordId1=(ordId.split('|')[1]).trim();
    const orders=page.getByRole('listitem').getByRole('button', { name: 'ORDERS' });
    const orderRow=page.locator('tr');
    await orders.click()
    await orderRow.filter({hasText:ordId1}).getByRole('button',{name:'View'}).click();
    await (expect(page.locator('.email-title')).toBeVisible());

}
);
