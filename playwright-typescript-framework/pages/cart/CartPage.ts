import {Locator, Page} from '@playwright/test';
import {BasePage} from '../base/BasePage';

export class CartPage extends BasePage {

    readonly cartTitle: Locator;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;

    constructor(page: Page) {
        super(page);
        this.cartTitle = page.locator('.title');
        this.checkoutButton = page.locator('#checkout');
        this.continueShoppingButton = page.locator('#continue-shopping');
    }

    async verifyCartLoaded() {
        await this.waitForElement(this.cartTitle);
    }

    async checkout() {
        await this.clickElement(this.checkoutButton);
    }

    async getCartItem(productName: string): Promise<Locator> {
     
        return this.page.locator('.cart_item').filter({
            has:this.page.locator('.inventory_item_name',{hasText: productName})
        });

    }

    async getCartProduct(productName: string): Promise<Locator> {
        return this.page.locator('.inventory_item_name',{hasText:productName});
    }

    async removeProductFromCart(productName: string) {
        const item=this.getCartItem(productName);
        (await item).getByRole('button', {name: 'Remove'}).click();
    }

}