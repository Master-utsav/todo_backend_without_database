const { todos, users } = require("../localServerData/data.js");

async function handelAddTodo(req, res) {
  try {
    const { title } = req.body;

    if (!title) return res.status(400).json({ message: 'Title is required' });

    const newTodo = {
      id: todos.length + 1,
      userId: req.user.id,
      title,
      isCompleted: false
    };

    todos.push(newTodo);

    res.status(201).json({ message: 'Todo added', todo: newTodo });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

async function handelFetchTodo(req, res) {
  try {
    const userTodos = todos.filter((todo) => todo.userId === req.user.id);
    res.json(userTodos);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

async function handelDeleteTodo(req, res) {
  try {
    const todoId = parseInt(req.params.id);
    const initialTodoLength = todos.length;

    todos = todos.filter((todo) => todo.id !== todoId || todo.userId !== req.user.id);

    if (todos.length === initialTodoLength) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

async function handelMarkTodo(req, res) {
  try {
    const todoId = parseInt(req.params.id);
    const todo = todos.find((todo) => todo.id === todoId && todo.userId === req.user.id);

    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    todo.isCompleted = !todo.isCompleted;
    res.json({ message: 'Todo updated', todo });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

async function handelUpdateTodo(req, res) {
  try {
    const todoId = parseInt(req.params.id);
    const { title } = req.body;

    if (!title) return res.status(400).json({ message: 'Title is required' });

    const todo = todos.find((todo) => todo.id === todoId && todo.userId === req.user.id);

    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    todo.title = title;
    res.json({ message: 'Todo updated', todo });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

module.exports = { handelFetchTodo, handelAddTodo, handelDeleteTodo, handelMarkTodo, handelUpdateTodo };
