import {test , expect} from '@playwright/test';
import * as XLSX from 'xlsx';
import  fs from 'fs';
import { isGeneratorFunction, isStringObject } from 'util/types';

const excelFilePath = 'TestData\\loginExcel.xlsx';
const fileBuffer = fs.readFileSync(excelFilePath);
const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
const sheetName = workbook.SheetNames[1];
const worksheet = workbook.Sheets[sheetName];
const jsonData = XLSX.utils.sheet_to_json(worksheet);

test.describe('Excel Data Driven Testing', () => {

    jsonData.forEach(({Links }) => {
        test(`Testing link: ${Links}`, async ({ page }) => {
            await page.goto('https://demowebshop.tricentis.com/');
            await page.getByRole('link', { name: Links, exact: false }).first().click();
            await expect(page).toHaveURL(`https://demowebshop.tricentis.com/${Links}`,{ignoreCase:true});
        });
    });
});

