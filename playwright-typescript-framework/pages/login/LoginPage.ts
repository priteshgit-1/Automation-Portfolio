import {Page, Locator} from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;  
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('#user-name'); 
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async navigateToLogin(){
    await this.navigateTo('/');
  }

  async enterUsername(username: string){
    await this.fill(this.usernameInput, username);
  }

  async enterPassword(password: string){
    await this.fill(this.passwordInput, password);
  }

  async clickLogin(){
    await this.clickElement(this.loginButton);
  }

  async login(username: string, password: string){
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  async getErrorMessage(): Promise<string>{
    return await this.errorMessage.textContent() ?? '';
  }

  async loginExpectingFailure(username:string, password:string){
    await this.login(username, password);
  }

}