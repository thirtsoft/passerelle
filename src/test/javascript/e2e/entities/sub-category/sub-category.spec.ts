/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SubCategoryComponentsPage, SubCategoryDeleteDialog, SubCategoryUpdatePage } from './sub-category.page-object';

const expect = chai.expect;

describe('SubCategory e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let subCategoryUpdatePage: SubCategoryUpdatePage;
    let subCategoryComponentsPage: SubCategoryComponentsPage;
    let subCategoryDeleteDialog: SubCategoryDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load SubCategories', async () => {
        await navBarPage.goToEntity('sub-category');
        subCategoryComponentsPage = new SubCategoryComponentsPage();
        expect(await subCategoryComponentsPage.getTitle()).to.eq('passerelleApp.subCategory.home.title');
    });

    it('should load create SubCategory page', async () => {
        await subCategoryComponentsPage.clickOnCreateButton();
        subCategoryUpdatePage = new SubCategoryUpdatePage();
        expect(await subCategoryUpdatePage.getPageTitle()).to.eq('passerelleApp.subCategory.home.createOrEditLabel');
        await subCategoryUpdatePage.cancel();
    });

    it('should create and save SubCategories', async () => {
        const nbButtonsBeforeCreate = await subCategoryComponentsPage.countDeleteButtons();

        await subCategoryComponentsPage.clickOnCreateButton();
        await promise.all([
            subCategoryUpdatePage.setNameInput('name'),
            subCategoryUpdatePage.categorySelectLastOption(),
            subCategoryUpdatePage.productSelectLastOption()
        ]);
        expect(await subCategoryUpdatePage.getNameInput()).to.eq('name');
        const selectedAlcohol = subCategoryUpdatePage.getAlcoholInput();
        if (await selectedAlcohol.isSelected()) {
            await subCategoryUpdatePage.getAlcoholInput().click();
            expect(await subCategoryUpdatePage.getAlcoholInput().isSelected()).to.be.false;
        } else {
            await subCategoryUpdatePage.getAlcoholInput().click();
            expect(await subCategoryUpdatePage.getAlcoholInput().isSelected()).to.be.true;
        }
        await subCategoryUpdatePage.save();
        expect(await subCategoryUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await subCategoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last SubCategory', async () => {
        const nbButtonsBeforeDelete = await subCategoryComponentsPage.countDeleteButtons();
        await subCategoryComponentsPage.clickOnLastDeleteButton();

        subCategoryDeleteDialog = new SubCategoryDeleteDialog();
        expect(await subCategoryDeleteDialog.getDialogTitle()).to.eq('passerelleApp.subCategory.delete.question');
        await subCategoryDeleteDialog.clickOnConfirmButton();

        expect(await subCategoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
