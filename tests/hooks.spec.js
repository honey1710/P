import {test,expect} from '@playwright/test';

test.beforeEach(async ({ page }) => {
    console.log("Before Each Hook");
});

test.afterEach(async ({ page }) => {
    console.log("After Each Hook");
});

test.beforeAll(async () => {
    console.log("Before All Hook");
});

test.afterAll(async () => {
    console.log("After All Hook");
});
