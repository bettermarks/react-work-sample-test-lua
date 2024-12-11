import React from 'react';
import styled from 'styled-components';
import {Todo} from '../types';
import {TodoItem, OnTodoChange} from './TodoItem';

export interface TodoListProps {
  todos: Array<Todo>;
  className?: string;
  todoChange: OnTodoChange;
}

const _TodoList: React.FC<TodoListProps> = ({todos, className, todoChange}) => {
  return (
    <ul data-cy='TodoList' className={className}>
      {todos
        .sort((t1, t2) => t2.createdTimestamp - t1.createdTimestamp)
        .map((todo, index) => (
          <TodoItem key={index} todo={todo} todoChange={todoChange} />
        ))}
    </ul>
  );
};

export const TodoList = styled(_TodoList)`
  list-style: none;
  padding: 0;
`;
