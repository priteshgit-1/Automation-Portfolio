import {Page, Locator}   from '@playwright/test';

export class BasePage {

    
    constructor(protected readonly page: Page) {}

    async navigateTo(url: string) {
        await this.page.goto(url);
    }

    async clickElement(locator: Locator): Promise<void> {
        await locator.click();
    }

    async fill(locator: Locator, text:string): Promise<void> {
        await locator.fill(text);
    }

    async getText(locator: Locator): Promise<string> {
        return await locator.textContent() ?? '';
    }

    async waitForElement(locator: Locator): Promise<void> {
        await locator.waitFor({state: 'visible'});
    }



}