import {Locator, Page, expect} from '@playwright/test';
import {BasePage} from '../base/BasePage';

export class CheckoutPage extends BasePage{

    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly finishButton: Locator;
    readonly checkoutTitle: Locator;
    readonly confirmationMessage: Locator;

    constructor(page: Page){
        super(page);
        this.firstNameInput = page.locator('#first-name');
        this.lastNameInput = page.locator('#last-name');
        this.postalCodeInput = page.locator('#postal-code');
        this.continueButton = page.locator('#continue');
        this.finishButton=page.locator('#finish');
        this.checkoutTitle=page.locator('.title');
        this.confirmationMessage=page.locator('.complete-header');
    }

    async verifyCheckoutPageLoaded(): Promise<void>{
        await expect(this.page).toHaveURL(/checkout-step-one\.html/);
        await expect(this.firstNameInput).toBeVisible();
        await expect(this.lastNameInput).toBeVisible();
        await expect(this.postalCodeInput).toBeVisible();
    }

    async enterCheckoutInformation(firstName: string, lastName: string, postalCode: string): Promise<void>{
        await this.fill(this.firstNameInput, firstName);
        await this.fill(this.lastNameInput, lastName);
        await this.fill(this.postalCodeInput, postalCode);
    }

    async continueToOverview(): Promise<void>{
        await this.clickElement(this.continueButton);
    }

    async finishOrder(): Promise<void>{
        await this.clickElement(this.finishButton);
    }

    async getConfirmationMessage(): Promise<string>{
        return await this.getText(this.confirmationMessage);
    }


}