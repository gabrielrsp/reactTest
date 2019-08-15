import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import createStore from "redux-mock-store";

import TodoList from "../../TodoList";
import { Creators as TodosActions } from "../../store/ducks/todos";

const mockStore = createStore();

const INITIAL_STATE = {
  todos: { data: ["Fazer café", "Estudar React"] }
};

const store = mockStore(INITIAL_STATE);

it("should render the list", () => {
  const wrapper = mount(
    <Provider store={store}>
      <TodoList />
    </Provider>
  );

  console.log(wrapper.html());
  expect(wrapper.find("li").length).toBe(2);
});

it("should be able to add new todos", () => {
  const wrapper = mount(
    <Provider store={store}>
      <TodoList />
    </Provider>
  );

  wrapper.find("TodoList").setState({ newTodo: "Novo todo" });
  wrapper.find("button").simulate("click");

  expect(store.getActions()).toContainEqual(TodosActions.addTodo("Novo todo"));
});
