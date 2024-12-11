import React from 'react';
import styled from 'styled-components';
import {TodosFooter} from './components/TodosFooter';
import {TodosHeader} from './components/TodosHeader';
import {OnSubmit, TodoInput} from './components/TodoInput';
import {TodoList} from './components/TodoList';
import {Todo} from './types';
import {TodoStatusBar} from './components/TodoStatusBar';
import {OnTodoChange} from './components/TodoItem';

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 400px;
  margin: 0 auto;
  height: 100vh;
`;

export interface AppState {
  todos: Array<Todo>;
}

export const App: React.FC = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const updateTotalDone = () => todos.filter(todo => todo.done).length;
  const [totalDone, setTotalDone] = React.useState(updateTotalDone);

  React.useEffect(() => {
    (async () => {
      const response = await fetch('http://localhost:3001/todos');
      setTodos(await response.json());
      setTotalDone(updateTotalDone);
    })();
  }, [updateTotalDone]);

  const createTodo: OnSubmit = async text => {
    const newTodo = {
      text,
      done: false,
      createdTimestamp: Date.now(),
    };

    const response = await fetch('http://localhost:3001/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    });
    if (!response.ok) {
      window.alert(
        `Unexpected error ${response.status}: ${response.statusText}`
      );
      return text;
    }
    setTodos([...todos, await response.json()]);
    return '';
  };

  const updateTodo: OnTodoChange = async (todo: Todo) => {
    const response = await fetch(`http://localhost:3001/todos/${todo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    if (!response.ok) {
      window.alert(
        `Unexpected error ${response.status}: ${response.statusText}`
      );
      return todo;
    }
    setTotalDone(updateTotalDone);
    return todo;
  };

  return (
    <AppContainer className='App'>
      <TodosHeader>
        <TodoStatusBar total={todos.length} totalDone={totalDone} />
      </TodosHeader>
      <TodoInput onSubmit={createTodo} />
      <TodoList todos={todos} todoChange={updateTodo} />
      <TodosFooter>
        <TodoStatusBar total={todos.length} totalDone={totalDone} />
      </TodosFooter>
    </AppContainer>
  );
};
