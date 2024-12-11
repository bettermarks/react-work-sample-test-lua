import React, {useState} from 'react';
import styled from 'styled-components';
import {Todo} from '../types';

const TodoText = styled.span<{done: boolean}>`
  text-decoration: ${p => (p.done ? 'line-through' : 'none')};
`;

const TodoCheckbox = styled.input`
  margin-right: 8px;
`;

const updateTodo = async (todo: Todo) => {
  const response = await fetch(`http://localhost:3001/todos/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    window.alert(`Unexpected error ${response.status}: ${response.statusText}`);
    return todo;
  }
};

export interface TodoItemProps {
  todo: Todo;
  className?: string;
}

const _TodoItem: React.FC<TodoItemProps> = ({todo, className}) => {
  const [checked, setChecked] = useState(todo.done);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    todo.done = event.target.checked.valueOf();
    setChecked(todo.done);
    updateTodo(todo);
  };

  return (
    <li data-cy='TodoItem' className={className}>
      <TodoCheckbox type='checkbox' checked={checked} onChange={handleChange} />
      <TodoText done={todo.done}>{todo.text}</TodoText>
    </li>
  );
};

export const TodoItem = styled(_TodoItem)`
  display: flex;
  padding: 8px;
`;
