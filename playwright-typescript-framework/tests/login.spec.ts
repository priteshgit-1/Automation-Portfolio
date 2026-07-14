import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';

test('user can log in successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await homePage.verifyLoaded();

  await expect(page).toHaveURL(/inventory/);
});
