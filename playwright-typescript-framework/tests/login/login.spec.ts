import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import users from '../../test-data/users.json';

test('Verify User can login successfully', async({page})=>{

  const loginPage = new LoginPage(page);

  await loginPage.navigateToLogin();
  await loginPage.login(users.validUser.username, users.validUser.password);
  await expect(page).toHaveURL(/inventory.html/);
});
