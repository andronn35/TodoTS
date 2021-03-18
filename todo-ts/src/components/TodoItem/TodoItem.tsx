import React from 'react';
import classes from './TodoItem.module.css';

type PropsTypes = {
  key: number,
  id: number,
  name: string,
  completed: boolean,
  onCrossClick: (taskId: number) => void,
  onNameClick: (taskId: number) => void   
}

const TodoItem: React.FC<PropsTypes>  = (props) => {

  let taskId = props.id
  let cls = [classes.name]
  props.completed ? cls.push(classes.done) : cls.push(classes.undone)
  
  return (
    <div className={classes.TodoItem}>      
        <li>
          <div className={classes.taskString}>
            <div className={cls.join(' ')} onClick={() => props.onNameClick(taskId)}>{props.name}</div>
            <div className={classes.cross} onClick={() => props.onCrossClick(taskId)}> X </div>
          </div>
        </li>  
    </div>
  )
}

export default TodoItem;