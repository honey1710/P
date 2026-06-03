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
  const user=page.locator('#userEmail');
  const pwd=page.locator('#userPassword');
  const btnLogin=page.locator('#login');
  const HomeAutomation=page.locator('div h3');
  const card=page.locator('.card');
 // const addToCart=card.locator("button[class*='btn w-10 rounded']");
  const gotToCartPage=page.locator("button[routerlink*=cart]");
  //div[aria-label='Product Added To Cart']
  const productAddedMsg=page.locator('.toast-message');
  const cartpageInfoWrap=page.locator('.infoWrap');
  const selectCountry=page.locator("input[placeholder*='Select Country']");
  const placeOrder=page.locator("a[class*='action__submit']");
  

  await user.fill('himtesting1710@gmail.com');
  await pwd.fill('Test@123');
  await btnLogin.click();

  await expect(HomeAutomation).toHaveText('Automation');
  await card.first().waitFor();
  console.log("total items "+ await card.count());

  for(let i =0;i<await card.count();++i)
{
      const cardItem = card.nth(i);
      console.log(await cardItem.locator('b').textContent());
      if ((await cardItem.locator('b').textContent())?.trim().toLowerCase()==='iphone 13 pro')
      {
        console.log('i phone found');
        page.pause;
          await cardItem.locator("button[class*='btn w-10 rounded']").click();
          break;
      }
  }
  
  await expect(productAddedMsg).toContainText('Product Added To Cart');
  console.log("product added"+productAddedMsg.textContent());
  await gotToCartPage.click();
  await cartpageInfoWrap.first().waitFor();
console.log("total cart items "+ await cartpageInfoWrap.count());
  for(let i =0;i<await cartpageInfoWrap.count();++i)
  {
      if ((await cartpageInfoWrap.nth(i).locator('h3').textContent())?.trim().toLowerCase()==='iphone 13 pro')
      {
          await cartpageInfoWrap.nth(i).locator("button[class*='primary']").click();
          break;
      }
  }
  await selectCountry.pressSequentially('ind')
  await page.locator("section[class*='list'] button").first().waitFor();
  
  for (let i=0; i<await page.locator("section[class*='list'] button").count();++i)
  {
     console.log(await page.locator("section[class*='list'] button").nth(i).textContent());
    if ((await page.locator("section[class*='list'] button").nth(i).textContent())?.trim()==='India')
    {
      console.log('found');
      await page.locator("section[class*='list'] i").nth(i).click();
      break;
    }
  }

  await placeOrder.click();
  await (expect (page.locator('tbody h1')).toHaveText('Thankyou for the order.'));
  console.log(await page.locator('.em-spacer-1 label.ng-star-inserted').textContent());

}
);

