import taskPage from "../pages/taskPage";

Cypress.Commands.add('goUrl', ()=> {
    cy.visit('http://localhost:3000');
    cy.url().should('eq', 'http://localhost:3000/');
});