import {Page, Locator}  from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class InventoryPage extends BasePage {

    readonly productsTitle: Locator;
    readonly shoppingCart: Locator;;
    readonly cartBadge: Locator;
   
    constructor(page: Page){

        super(page);       
        this.productsTitle=page.locator('.title');
        this.shoppingCart=page.locator('.shopping_cart_link');
        this.cartBadge=page.locator('.shopping_cart_badge');
    }

    private getProductContainer(productName:string):Locator{
        return this.page.locator('.inventory_item')
        .filter({
            has:this.page.locator('.inventory_item_name',{
                hasText:productName
            })
        });
    }

    async verifyInventoryPageLoaded(){
        await this.productsTitle.waitFor();
    }

    async getPageTitle(): Promise<string>{
        return await this.productsTitle.textContent() ?? '';
    }

    async getCartBadgeCount(): Promise<number>{
        const count=await this.cartBadge.textContent();
        return Number(count);
    }

    async addProductToCart(productName:string){
        const product=this.getProductContainer(productName);
        await product.getByRole('button',{name:'Add to Cart'}).click();
    }

    async removeProductFromCart(productName:string){
        const product=this.getProductContainer(productName);
        await product.getByRole('button',{name:'Remove'}).click();
    }

    async getProduct(productName:string):Promise<Locator>{
        return this.page.locator('.inventory_item_name', { hasText: productName });
    }

    async openCart(){
        await this.shoppingCart.click();
    }
}