import React from 'react';
import classes from './TodosList.module.css';
import { NavLink } from 'react-router-dom';
import { TodosType } from '../../types';

type PropsType = {
  key: number
  title: string,
  todos: Array<TodosType>,
  id: number
}

const TodosList: React.FC<PropsType> = (props) => {

  let doneTask = props.todos.filter(todo => todo.completed === true).length
  let allTasks = props.todos.length
  
  return (
    <div className={classes.TodosList}>
      <li>
        <NavLink to={'/todo/' + props.id}>{props.title}</NavLink> ({doneTask+"/"+allTasks})
      </li>
    </div>
  )
}

export default TodosList;