import React, {useReducer} from 'react';
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
  const [congratsVisibility, setCongratsVisibility] = React.useState('none');
  type CounterAction = {type: 'ADD'} | {type: 'REMOVE'} | {type: 'INITIAL'};
  const [totalDone, dispatchDoneCounter] = useReducer(
    (state: number, action: CounterAction): number => {
      switch (action.type) {
        case 'ADD':
          return state + 1;
        case 'REMOVE':
          return state - 1;
        case 'INITIAL':
          return todos.filter(todo => todo.done).length;
        default:
          return 0;
      }
    },
    0
  );

  React.useEffect(() => {
    (async () => {
      const response = await fetch('http://localhost:3001/todos');
      setTodos(await response.json());
      // setTotalDone(todos.filter(todo => todo.done).length);
      dispatchDoneCounter({type: 'INITIAL'});
    })();
  }, []);

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
    let totalDoneCount = todos.filter(todo => todo.done).length;
    if (todo.done && totalDoneCount === todos.length) {
      setCongratsVisibility('flex');
    }
    dispatchDoneCounter(todo.done ? {type: 'ADD'} : {type: 'REMOVE'});
    return todo;
  };

  return (
    <AppContainer className='App'>
      <TodosHeader>
        <TodoStatusBar
          total={todos.length}
          totalDone={totalDone}
          // TODO: create a new component for the banner instead of adding in both header and footer
          congratsBannerVisibility={congratsVisibility}
        />
      </TodosHeader>
      <TodoInput onSubmit={createTodo} />
      <TodoList todos={todos} todoChange={updateTodo} />
      <TodosFooter>
        <TodoStatusBar
          total={todos.length}
          totalDone={totalDone}
          congratsBannerVisibility={'none'}
        />
      </TodosFooter>
    </AppContainer>
  );
};
