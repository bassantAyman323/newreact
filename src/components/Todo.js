
function Todo({todo, onClick,onDoubleClick}) {
   
    if(todo.isComplete){
        // do something
    }else {
        // do something else
    }
    

    return (
        <li className={todo.isComplete? 'completed': ''} 
        onClick={() => onClick(todo)} onDoubleClick={() => onDoubleClick(todo)}>{todo.text}</li>
    )
}

export default Todo;