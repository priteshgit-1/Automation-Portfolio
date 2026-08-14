import {test,expect} from '../../fixtures/baseFixture';
import users from '../../test-data/users.json';
import products from '../../test-data/products.json';

test.describe('Cart Module tests', () => {

    test.beforeEach(async({ loginPage, inventoryPage }) => {
        await loginPage.navigateToLogin();
        await loginPage.login(users.validUser.username, users.validUser.password);
        await inventoryPage.addProductToCart(products.products[0]);
        await inventoryPage.openCart();
    });

  test('Verify Product appears in Cart', async ({ cartPage }) => {
    await cartPage.verifyCartLoaded();
    await expect(await cartPage.getCartProduct(products.products[0])).toBeVisible();
  });

  test('Remove Product from Cart', async ({ cartPage, inventoryPage }) => {
    await cartPage.verifyCartLoaded();
    await cartPage.removeProductFromCart(products.products[0]);
    await expect(await cartPage.getCartProduct(products.products[0])).toHaveCount(0);
    await inventoryPage.openCart();
    await expect(await cartPage.getCartProduct(products.products[0])).toHaveCount(0);
  });

});
