import {test, expect} from '../../fixtures/baseFixture';
import users from '../../test-data/users.json';

test.describe('Login Module',()=>{

  test.beforeEach(async({loginPage})=>{
    await loginPage.navigateToLogin();
  });

  test('Valid Login',async({page, loginPage, inventoryPage})=>{
    await loginPage.login(users.validUser.username, users.validUser.password);
    await inventoryPage.verifyInventoryPageLoaded();
    expect(await inventoryPage.getPageTitle()).toBe('Products');
  });

  test('Invalid Username and Valid Password',async({loginPage})=>{
    await loginPage.loginExpectingFailure('Invalid Username',users.validUser.password);
    await expect(loginPage.errorMessage).toContainText('Epic sadface: Username and password do not match any user in this service');
  });

  test('Valid Username and Invalid Password', async({loginPage})=>{
    await loginPage.loginExpectingFailure(users.validUser.username, 'Invalid Password');
    await expect(loginPage.errorMessage).toContainText('Epic sadface: Username and password do not match any user in this service');
  });

  test('Blank Username and Valid Password',async({loginPage})=>{
    await loginPage.loginExpectingFailure('',users.validUser.password);
    await expect(loginPage.errorMessage).toContainText('Epic sadface: Username is required'); 
  });

  test('Valid Username and Blank Password',async({loginPage})=>{
    await loginPage.loginExpectingFailure(users.validUser.username, '');
    await expect(loginPage.errorMessage).toContainText('Epic sadface: Password is required');
  });

  test('Blank Username and Blank Password',async({loginPage})=>{
    await loginPage.loginExpectingFailure('', '');
    await expect(loginPage.errorMessage).toContainText('Epic sadface: Username is required');
  });

  test('Locked Users',async({loginPage})=>{
    await loginPage.login(users.invalidUser.username, users.invalidUser.password);
    await expect(loginPage.errorMessage).toContainText('Epic sadface: Sorry, this user has been locked out.');
    });

});