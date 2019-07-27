import React from 'react';
import './App.css';
//JSX
const SmallComponent = (props)=>{
  console.log(props);
  return(
    <div>

    </div>
  );

};
class App extends React.Component {
  // state={
  //   name:'123'
  // }
  state = {
    todos:[],
    inputValue:'',
  };
  handleFormSubmit = (event)=>{
    event.preventDefault();
    const todoContent = this.state.inputValue;
    const newTodo={
      content: todoContent,
      finished:false,
    };
    this.setState({
      todos:[...this.state.todos,newTodo],
    });
  }
  render() {
    console.log(this.state.todos);
    return (
      <div class="app">
        <form onSubmit={this.handleFormSubmit}>
            <input type="text" value={this.state.inputValue} onChange={(event)=>{
                this.setState({
                  inputValue:event.target.value,
                });
            }}></input>
            <input type="submit" value="Submit"></input>
        </form>
        {this.state.todos.map((item,index)=>{
          return(
            <div key={index}>
                <input type='checkbox' checked={item.finished} onChange={(event)=>{
                    const newTodos = this.state.todos.map((todo,i)=>{
                      if(index ===i){
                        return{
                          content:todo.content,
                          finished:event.target.checked,
                        }
                      }
                      else{
                        return todo;
                      }
                    });
                    this.setState({
                      todos: newTodos
                    });
                }}/>{item.finished ? <strike>{item.content}</strike>: <span>{item.content}</span>}<button onClick={(event)=>{
                  const newTodos = this.state.todos.filter((todo,i)=>{
                    if(index ===i){
                      return false;
                    }
                    return true;
                  });
                  this.setState({
                      todos:newTodos,
                  })
                }}
                >Delete</button>
            </div>
          );
        })}
    </div>
    );
  }
}

export default App;