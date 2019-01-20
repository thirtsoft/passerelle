/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { BrandComponentsPage, BrandDeleteDialog, BrandUpdatePage } from './brand.page-object';

const expect = chai.expect;

describe('Brand e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let brandUpdatePage: BrandUpdatePage;
    let brandComponentsPage: BrandComponentsPage;
    let brandDeleteDialog: BrandDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Brands', async () => {
        await navBarPage.goToEntity('brand');
        brandComponentsPage = new BrandComponentsPage();
        expect(await brandComponentsPage.getTitle()).to.eq('passerelleApp.brand.home.title');
    });

    it('should load create Brand page', async () => {
        await brandComponentsPage.clickOnCreateButton();
        brandUpdatePage = new BrandUpdatePage();
        expect(await brandUpdatePage.getPageTitle()).to.eq('passerelleApp.brand.home.createOrEditLabel');
        await brandUpdatePage.cancel();
    });

    it('should create and save Brands', async () => {
        const nbButtonsBeforeCreate = await brandComponentsPage.countDeleteButtons();

        await brandComponentsPage.clickOnCreateButton();
        await promise.all([brandUpdatePage.setBrandNameInput('brandName')]);
        expect(await brandUpdatePage.getBrandNameInput()).to.eq('brandName');
        await brandUpdatePage.save();
        expect(await brandUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await brandComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Brand', async () => {
        const nbButtonsBeforeDelete = await brandComponentsPage.countDeleteButtons();
        await brandComponentsPage.clickOnLastDeleteButton();

        brandDeleteDialog = new BrandDeleteDialog();
        expect(await brandDeleteDialog.getDialogTitle()).to.eq('passerelleApp.brand.delete.question');
        await brandDeleteDialog.clickOnConfirmButton();

        expect(await brandComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
