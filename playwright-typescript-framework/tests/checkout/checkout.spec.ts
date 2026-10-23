import {test,expect} from '../../fixtures/baseFixture';
import user from '../../test-data/users.json';
import checkoutData from '../../test-data/checkout.json';
import products from '../../test-data/products.json';

test.describe('Checkout Module',()=>{

    test.beforeEach
    (async({loginPage,inventoryPage,cartPage})=>{
        await loginPage.navigateToLogin();
        await loginPage.login(user.validUser.username,user.validUser.password);
        await inventoryPage.addProductToCart(products.products[0]);
        await inventoryPage.openCart();

    });

    test('Complete order successfully', async({
        cartPage,CheckoutPage
    })=>{
        await cartPage.verifyCartLoaded();
        await cartPage.checkout();
        await CheckoutPage.verifyCheckoutPageLoaded();
        await CheckoutPage.enterCheckoutInformation(checkoutData.validCustomer.firstName,checkoutData.validCustomer.lastName,checkoutData.validCustomer.postalCode);
        await CheckoutPage.continueToOverview();
        await CheckoutPage.finishOrder();
        const confirmationMessage=await CheckoutPage.getConfirmationMessage();
        expect(confirmationMessage).toBe('Thank you for your order!');
    });

});