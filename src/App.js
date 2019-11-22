import React, { Component } from 'react';
import './App.css';
import Todos from './Components/Todos';
import Header from './Components/layouts/Header';
import AddTodo from './Components/AddTodo';
import About from './Components/pages/About';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import uuid from 'uuid';
export class App extends Component {
  state = {
    todos: [
      {
        id: 1,
        title: 'take out the trash',
        completed: false
      },
      {
        id: 2,
        title: ' meeting with boss',
        completed: false
      },
      {
        id: 3,
        title: 'dinner with wife',
        completed: true
      }
    ]
  };
  markComplete = id => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    });
  };

  delTodo = id => {
    this.setState({
      todos: [...this.state.todos.filter(todo => todo.id !== id)]
    });
  };
  addTodo = title => {
    const newTodo = {
      id: uuid.v4(),
      title,
      completed: false
    };
    this.setState({ todos: [...this.state.todos, newTodo] });
  };

  render() {
    return (
      <Router>
        <div className="container">
          <Header />
          <Route
            exact
            path="/"
            render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos
                  todos={this.state.todos}
                  markComplete={this.markComplete}
                  delTodo={this.delTodo}
                />
              </React.Fragment>
            )}
          />
          <Route About="/about" component={About} />
        </div>
      </Router>
    );
  }
}

export default App;
