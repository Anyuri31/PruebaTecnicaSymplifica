const { getAllTasks, createTask, deleteTask } = require("../../test-api/taskService");
const { Task } = require("../../test-api/sequelize/models");

// Mock de Task
jest.mock("../../test-api/sequelize/models", () => ({
    Task: {
        findAll: jest.fn(),
        create: jest.fn(),
        destroy: jest.fn(),
    },
}));

describe("Task Service - pruebas unitarias", () => {
    beforeEach(() => {
        jest.clearAllMocks(); // limpia mocks antes de cada test
    });

    test("GET all tasks - devuelve lista de tareas", async () => {
        Task.findAll.mockResolvedValue([{ id: 1, title: "Tarea 1" }]);
        const tasks = await getAllTasks();
        expect(tasks).toHaveLength(1);
        expect(tasks[0].title).toBe("Tarea 1");
    });

    test("CREATE task - crea tarea correctamente", async () => {
        const data = { title: "Nueva tarea", description: "Prueba", completed: false };
        Task.create.mockResolvedValue({ id: 1, ...data });

        const result = await createTask(data);

        expect(Task.create).toHaveBeenCalledWith(data);
        expect(result).toEqual({ id: 1, ...data });
    });

    test("DELETE task - elimina tarea correctamente", async () => {
        Task.destroy.mockResolvedValue(1); // devuelve 1 fila eliminada
        const result = await deleteTask(1);
        expect(result).toBe(1);
    });

    it("GET all tasks - devuelve error si falla la BD", async () => {
        Task.findAll.mockRejectedValue(new Error("DB error"));
        await expect(getAllTasks()).rejects.toThrow("DB error");
    });
    it("CREATE task - Deberia fallar si los campos están vacíos", async () => {
        await expect(createTask({ title: "", description: "", completed: false }))
            .rejects.toThrow("Validation error");
    });
    
});


