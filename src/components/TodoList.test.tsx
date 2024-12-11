import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {TodoList} from './TodoList';
import {Todo} from '../types';

test('populates TodoList and assert they are listed by most recent', async () => {
  const user = userEvent.setup();

  const todos: Todo[] = [
    { id: '1', text: 'First todo', done: false, createdTimestamp: 1000 },
    { id: '2', text: 'Second todo', done: false, createdTimestamp: 2000 }
  ];
  const {getByText} = render(<TodoList todos={todos} />);
  const items = screen.getAllByRole('listitem');

  expect(items[0]).toHaveTextContent("Second todo");
  expect(items[1]).toHaveTextContent("First todo");
});
