import React, {useState, useEffect} from 'react';
import './App.css';
import Todo from './components/Todo';


function App() {
  const [todos, setTodos] = useState([])
  const [deleted, setDeleted] = useState(false)
  const [todo, setTodo] = useState({
    text: '',
    isComplete: false
  })
  
  useEffect(() => {
    // last thing to execute in the component
    fetch('http://localhost:5000/todos')
      .then(response => response.json())
      .then(data => {
        setTodos(data);
      });
  }, [])
  const onFormSubmit = (e) => {
    setTodos([])
    e.preventDefault();
    let newTodo = {
      text: todo,
      isComplete: false
    }
    
    fetch('http://localhost:5000/todos', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(newTodo)
    })
      .then(response => response.json())
      .then(data => {
        setTodos([...todos, data])
      });
    setTodo({
      text: '',
      isComplete: false
    })
  }
  const onInputChange = (e) => {
    setTodo(e.target.value);
  }
  const onTodoClick = (todo) => {
    console.log(`id = ${todo.id} & text = ${todo.text}`)
    const updatedTodo = {
      text: todo.text,
      isComplete: !todo.isComplete
    }

    fetch(`http://localhost:5000/todos/${todo.id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(updatedTodo)
    })
      .then(response => response.json())
      .then(data => {
        setTodos([...todos.filter((stateTodo) => stateTodo.id !== todo.id), data])
      });
    
  }
  const onTodoDelete= (todo) => {
    setDeleted(!deleted)
    console.log(`id = ${todo.id} & text = ${todo.text}`)
  

    fetch(`http://localhost:5000/todos/${todo.id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'DELETE',
      // body: JSON.stringify(updatedTodo)
    })
      .then(response => response.json())
      .then(data => {
        setTodos([...todos.filter((stateTodo) => stateTodo.id !== todo.id), data])
      });
    
  }
  return (
    <>
      <h1>todos</h1>
      <form onSubmit={onFormSubmit}>
        <input value={todo.text} onChange={onInputChange} type="text" className="input" placeholder="Enter your todo" autoComplete="off"/>

        <ul className="todos">
          {
            todos.map((todo, i) => {
              return <Todo onClick={onTodoClick} onDoubleClick={onTodoDelete} className={deleted? "deleted" :""}  todo={todo}></Todo>
            })
          }
        </ul>
      </form>
      <small>Left click to toggle completed. <br/> Right click to delete todo</small>
    </>  
  )
}

export default App;