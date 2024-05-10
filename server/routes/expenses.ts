import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const expensesRoute = new Hono();

/**
 type Expense = {
     "id": number,
     "title": string,
     "amount": number
 };
*/

const expenseSchema = z.object({
    "id": z.number().int().positive().min(0),
    "title": z.string().min(3).max(100),
    "amount": z.number().int().positive()
});

const createPostSchema = expenseSchema.omit({ "id": true });

type Expense = z.infer<typeof expenseSchema>;

const fakeExpenses: Expense[] = [
    { id: 0, title: "Groceries", amount: 50 },
    { id: 1, title: "Utilities", amount: 100 },
    { id: 2, title: "Rent", amount: 150 }
];


expensesRoute

.get('/', c => {
    return c.json({ expenses: fakeExpenses });
})

.post('/', zValidator("json", createPostSchema), async c => {

    const expense = await c.req.valid("json");
    fakeExpenses.push({ ...expense, id: fakeExpenses.length });
    c.status(201);
    return c.json(expense);

    /**
     const expense: Expense = await c.req.json();
     const data = await c.req.json();
     const expense = createPostSchema. parse(data);
    */
   
})

.get('/total-spent', c => {
    const total = fakeExpenses.reduce((sum, { amount }) => sum + amount,0);
    return c.json({ total });
})

.get("/:id{[0-9]+}", c => {
    const id = +c.req.param("id");
    const expense = fakeExpenses.find(expense => expense.id === id);
    if(!expense){
        return c.notFound(); //c.status(404);
    }
    return c.json({ expense });
})

.delete("/:id{[0-9]+}", c => {
    const id = +c.req.param("id");
    const idx = fakeExpenses.findIndex(expense => expense.id === id);
    if(idx == -1){
        return c.notFound(); //c.status(404);
    }
    const deletedExpense = fakeExpenses.splice(idx,1)[0];
    return c.json({ expense: deletedExpense });
});

export default expensesRoute;