import {test,expect} from '../../fixtures/baseFixture';
import users from '../../test-data/users.json';
import products from '../../test-data/products.json';

test.describe('Inventory Module',()=>{

    test.beforeEach(async({loginPage})=>{
        await loginPage.navigateToLogin();
        await loginPage.login(users.validUser.username, users.validUser.password);
    });

    test('Add Backpack to Cart',async({inventoryPage})=>{
        await inventoryPage.addProductToCart(products.products[0]);
        expect(await inventoryPage.getCartBadgeCount()).toBe(1);
    });
});