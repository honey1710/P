// @ts-check
import { test, expect } from '@playwright/test';

test('Client App get all elemnts text', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/Client');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
  await page.locator('#username').fill('rahulshettyacadem');
  await page.locator('#password').fill('learning');
  await page.locator('#signInBtn').click();
  console.log(await page.locator("[style*='block']").textContent());
  await expect (page.locator("[style*='block']")).toHaveText('Incorrect');

});

test('get all element on dashborad', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
  await page.locator('#username').fill('rahulshettyacademy');
  await page.locator('#password').fill('learning');
  
  await page.locator("[value='user']").click();
  await page.locator('#okayBtn').click();
  await page.locator('select.form-control').selectOption('consult');
  await page.locator('#terms').check();
  expect (page.locator('#terms')).toBeChecked();
  await page.locator('#terms').uncheck();
  expect ((await page.locator('#terms').isChecked())).toBeFalsy();
  console.log(page.locator('#terms').isChecked());
  await page.locator('#signInBtn').click();
  await page.locator('.card-title a').first().click();
  await page.locator("[class='navbar navbar-expand-sm bg-dark navbar-dark']").first().waitFor();
   console.log (page.locator("[class='navbar navbar-expand-sm bg-dark navbar-dark']").first().textContent());
  
});

test('handling new tab', async({browser})=>
  { 
    const newcontext=await browser.newContext();
    const page =await newcontext.newPage();
    
     await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
     const blinkingText= page.locator('.blinkingText').first();
     const [newPage]= await Promise.all(
      [
        newcontext.waitForEvent('page'),
        blinkingText.click()

      ]);

      const red=await newPage.locator('.red').textContent();
      console.log(red);

  });

  
test('Register',async ({page})=>
{
    await page.goto('https://rahulshettyacademy.com/client');
    
    await page.locator('a.btn1').click();
    await page.locator('#firstName').fill('Him');
     await page.locator('#lastName').fill('Testing');
     await page.locator('#userEmail').fill('himtesting1710@gmail.com');
     await page.locator('#userMobile').fill('7879787987');
     await page.locator('select[formcontrolname="occupation"]').selectOption('Doctor');
     await page.locator('input[formcontrolname="gender"]').first().click();
     await page.locator('#userPassword').fill('Test@123')
     await page.locator('#confirmPassword').fill('Test@123');
     await page.locator("input[formcontrolname='required']").check();
     await page.locator("input[value='Register']").scrollIntoViewIfNeeded();
     await page.locator("input[value='Register']").click();
     await expect (page.locator('.h1.headcolor')).toHaveText('Account Created Successfully');
     
});

test('place order', async({page})=>
{
  await page.goto('https://rahulshettyacademy.com/client');
  const user=page.getByPlaceholder('email@example.com');
  const pwd=page.getByPlaceholder('enter your passsword')
  const btnLogin=page.getByRole('button',{name:'Login'})
  const HomeAutomation=page.getByText('Automation Practice')
  const card=page.locator('.card');
 // const addToCart=card.locator("button[class*='btn w-10 rounded']");
  const gotToCartPage=page.getByRole('listitem').getByRole('button',{name:'Cart'});
  //div[aria-label='Product Added To Cart']
  const productAddedMsg=page.getByLabel('Product Added To Cart');
  const cartpageInfoWrap=page.locator('.infoWrap');
  const selectCountry=page.getByPlaceholder('Select Country');
  const placeOrder=page.getByText('Place Order');
  

  await user.fill('himtesting1710@gmail.com');
  await pwd.fill('Test@123');
  await btnLogin.click();

  await expect(HomeAutomation).toHaveText('Automation Practice');
  await card.first().waitFor();
  card.filter({hasText: 'IPHONE 13 PRO'}).getByRole('button',{name:'Add To Cart'}).click();
  
  
  console.log("total items "+ await card.count());


  
  await expect(productAddedMsg).toContainText('Product Added To Cart');
  console.log("product added"+productAddedMsg.textContent());
  await gotToCartPage.click();
  await cartpageInfoWrap.first().waitFor();
cartpageInfoWrap.filter({hasText:'IPHONE 13 PRO'}).getByRole('button',{name:'Buy Now'}).click();

  await selectCountry.pressSequentially('ind');
  await page.getByRole('button',{name:'India'}).nth(1).click();
  

  await placeOrder.click();
  await (expect (page.locator('tbody h1')).toHaveText('Thankyou for the order.'));
  console.log(await page.locator('.em-spacer-1 label.ng-star-inserted').textContent());

}
);


test('handling alerts', async({page})=>
  {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    
    
  // On method will Listen for dialog events (alert, confirm, prompt)
  page.on('dialog', async dialog => {
    console.log('Dialog message:', dialog.message());
    await dialog.accept(); // Accepts the alert
  });

  //this click will open dialog box 
  await page.locator('#alertbtn').click();


  const frames=page.frameLocator('#courses-iframe');
  await frames.locator("ul li a[href*='lifetime']:visible").nth(0).click();
  await expect(frames.locator('.text h2')).toBeVisible();
  console.log(frames.locator('.text h2').textContent());

  }),

  test('Screenshot',async({page})=>
    {
       await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
       await page.locator('#hide-textbox').click();
       await page.screenshot({path:'screenshotHide.png'});
       await page.locator('#show-textbox').click();
       //page screenshot
       await page.screenshot({path:'screenshotShow.png'});

       //element screenshot only
       await page.locator('#displayed-text').screenshot({path:'screenshotElement.png'});


    })

    test('Visual testing by matching screenshot',async({page})=>
      {
        //Visual testing by matching screenshot
        await page.goto('https://www.google.com/');
        expect(await page.screenshot()).toMatchSnapshot('google.png');
      })



