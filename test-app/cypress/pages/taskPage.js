class taskPage {
    constructor() {
        this.tittle = 'input[name="title"]'
        this.description = 'textarea[name="description"]'
        this.completed = 'input[name="completed"]'
        this.submitButton = 'button[type="submit"]'
        this.deleteButton = '("button", "Delete").eq(0)'
    } 

    writeTitle(title) {
        cy.get(this.tittle).clear().type(title)
    }
    writeDescription(description) {
        cy.get(this.description).clear().type(description)
    }
    checkCompleted() {
        cy.get(this.completed).check()
    }
    clickSubmit() {
        cy.get(this.submitButton).click()
    }
    clickDeleteTask() {
        cy.get(this.deleteButton).first().click()
    }
    clickCompleteTask() {
        cy.get('input[type="checkbox"]').first().check()
    }
}
export default new taskPage();

