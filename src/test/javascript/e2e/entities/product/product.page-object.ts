import { element, by, ElementFinder } from 'protractor';

export class ProductComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-product div table .btn-danger'));
    title = element.all(by.css('jhi-product div h2#page-heading span')).first();

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

export class ProductUpdatePage {
    pageTitle = element(by.id('jhi-product-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    descriptionInput = element(by.id('field_description'));
    imageInput = element(by.id('file_image'));
    priceInput = element(by.id('field_price'));
    sizeSelect = element(by.id('field_size'));
    brandSelect = element(by.id('field_brand'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setImageInput(image) {
        await this.imageInput.sendKeys(image);
    }

    async getImageInput() {
        return this.imageInput.getAttribute('value');
    }

    async setPriceInput(price) {
        await this.priceInput.sendKeys(price);
    }

    async getPriceInput() {
        return this.priceInput.getAttribute('value');
    }

    async setSizeSelect(size) {
        await this.sizeSelect.sendKeys(size);
    }

    async getSizeSelect() {
        return this.sizeSelect.element(by.css('option:checked')).getText();
    }

    async sizeSelectLastOption() {
        await this.sizeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async brandSelectLastOption() {
        await this.brandSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async brandSelectOption(option) {
        await this.brandSelect.sendKeys(option);
    }

    getBrandSelect(): ElementFinder {
        return this.brandSelect;
    }

    async getBrandSelectedOption() {
        return this.brandSelect.element(by.css('option:checked')).getText();
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

export class ProductDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-product-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-product'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
