import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login/LoginPage';
import { InventoryPage } from '../pages/inventory/InventoryPage';
import { CartPage } from '../pages/cart/CartPage';

export type MyFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({page}, use)=>{
    await use(new InventoryPage(page));
  },

  cartPage: async ({page}, use)=>{
    await use(new CartPage(page));
  },
  
});

export { expect } from '@playwright/test';
