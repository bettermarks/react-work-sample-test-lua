import React from 'react';
import styled from 'styled-components';
import {Todo} from '../types';

const TodoText = styled.span<{done: boolean}>`
  text-decoration: ${p => (p.done ? 'line-through' : 'none')};
`;

const TodoCheckbox = styled.input`
  margin-right: 8px;
`;

export type OnTodoChange = (todo: Todo) => Promise<Todo>;

export interface TodoItemProps {
  todo: Todo;
  todoChange: OnTodoChange;
  className?: string;
}

const _TodoItem: React.FC<TodoItemProps> = ({todo, className, todoChange}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    todo.done = event.target.checked.valueOf();
    todoChange(todo);
  };

  return (
    <li data-cy='TodoItem' className={className}>
      <TodoCheckbox
        type='checkbox'
        checked={todo.done}
        onChange={handleChange}
      />
      <TodoText done={todo.done}>{todo.text}</TodoText>
    </li>
  );
};

export const TodoItem = styled(_TodoItem)`
  display: flex;
  padding: 8px;
`;
