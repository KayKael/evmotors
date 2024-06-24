import { combineReducers } from 'redux';

const initialState = {
  todos: [],
  count: 0
};

const todosReducer = (state = initialState.todos, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload];
    default:
      return state;
  }
};

const counterReducer = (state = initialState.count, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  todos: todosReducer,
  count: counterReducer
});

export default rootReducer;
