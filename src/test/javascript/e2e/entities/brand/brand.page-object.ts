import { element, by, ElementFinder } from 'protractor';

export class BrandComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-brand div table .btn-danger'));
    title = element.all(by.css('jhi-brand div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class BrandUpdatePage {
    pageTitle = element(by.id('jhi-brand-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    brandNameInput = element(by.id('field_brandName'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setBrandNameInput(brandName) {
        await this.brandNameInput.sendKeys(brandName);
    }

    async getBrandNameInput() {
        return this.brandNameInput.getAttribute('value');
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class BrandDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-brand-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-brand'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
