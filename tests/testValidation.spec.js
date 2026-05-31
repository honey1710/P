import {test,expect} from '@playwright/test'
const exceljs=require('exceljs');

test('download & upload', async({page})=>
    {
        await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');
        
            const downloadPromise =page.waitForEvent('download');
            await page.getByRole('button',{name:'Download'}).click();
            await downloadPromise;
        
        await page.locator('#fileinput').click();
       await page.locator('#fileinput').setInputFiles('C:/Users/hchauha1/Downloads/download.xlsx');

       


    })