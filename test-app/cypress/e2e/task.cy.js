import taskPage from '../pages/taskPage';

describe('Validación de campos y funcionalidades del módulo de tareas', () => {

    beforeEach(() => {
        cy.goUrl(); // Abre la aplicación antes de cada test
    });
    it('Creación de una tarea solo con titulo', () => {
        taskPage.writeTitle('Tarea solo título');
        taskPage.clickSubmit();

        cy.get('.task-list li').last().within(() => {
            cy.get('h2').should('not.exist', 'Tarea solo título');
        }).then(() => {
            const mensaje = 'El sistema permite crear una tarea sin descripción'
            console.log(mensaje);
            console.task('logTerminal', mensaje);
        });
    });
    it('Creación de una tarea solo con descripción', () => {
        taskPage.writeDescription('Descripción sin título');
        taskPage.clickSubmit();

        cy.get('.task-list li').last().within(() => {
            cy.get('p').first().should('not.exist', 'Descripción sin título');
        }).then(() => {
            const mensaje = 'El sistema permite crear una tarea sin título'
            console.log('mensaje');
            console.task('logTerminal', mensaje);
        });
    });
    it('Creación de una tarea con campos vacíos', () => {
        taskPage.clickSubmit();

        cy.get('.task-list li').should('not.exist')
            .then(() => {
                const mensaje = 'El sistema permite crear tareas con ambos campos vacíos'
                console.log('mensaje');
                console.task('logTerminal', mensaje);
            });
    });
    it('Creación de una tarea con título y descripción', () => {
        taskPage.writeTitle('Tarea válida');
        taskPage.writeDescription('Descripción válida');
        taskPage.clickSubmit();

        cy.get('.task-list li').last().within(() => {
            cy.get('h2').should('contain.text', 'Tarea válida');
            cy.get('p').first().should('contain.text', 'Descripción válida');
        })
            .then(() => {
                const mensaje = 'El sistema solo muestra la tarea con el campo descripción'
                console.log('mensaje');
                console.task('logTerminal', mensaje);
            });
    });
    it('Elimina correctamente una tarea existente', () => {
        // Crear una tarea para eliminar
        taskPage.writeTitle('Tarea a eliminar');
        taskPage.writeDescription('Descripción a eliminar');
        taskPage.clickSubmit();

        cy.contains('Descripción a eliminar').should('exist');
        cy.get('.task-list li').contains('Descripción a eliminar')
            .parent()
            .within(() => {
                cy.contains('Delete').click();
            })
        cy.contains('Descripción a eliminar').should('not.exist');
        console.log('La tarea se eliminó correctamente');
    });

});
