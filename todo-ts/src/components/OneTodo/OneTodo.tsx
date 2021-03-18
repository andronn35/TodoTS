import React, {Component} from 'react';
import classes from './OneTodo.module.css';
import TextField from '@material-ui/core/TextField';
import TodoItem from '../TodoItem/TodoItem';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { addTask, deleteTask, toggleStatus  } from '../../redux/actions'; 
import { ListType, TodosType } from '../../types';
import { AppStateType } from '../../redux/reducers/rootReducer';

type MapStatePropsType = {  
  list: Array<ListType> 
}  

type OwnProps = {
  match: any
}

type MapDispatchPropsType = {  
  deleteTask: (taskId: number, todoId: number) => void
  toggleStatus: (taskId: number, todoId: number) => void
  addTask: (newTask: any, todoId: number) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnProps

type StateType = {
  id: number,
  name: string, 
  complete: boolean,
  radioFilter?: string,
  searchValue?: string
}

class OneTodo extends Component<PropsType, StateType> { 

  state = {    
    id: +'',
    name: '', 
    complete: false,
    radioFilter: '',
    searchValue: ''
  }  

  onCrossClick = (taskId: number) => {
    let todoId = this.props.match.params.id
    this.props.deleteTask(taskId, todoId)
  }

  onNameClick = (taskId: number) => {    
    let todoId = this.props.match.params.id   
    this.props.toggleStatus(taskId, todoId)
  }

  updateNewTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      name: e.target.value,
      
    })
  }

  onKeyPressHandler = (e: any) => {
  if (e.key === 'Enter'&& e.target.value) {
    let newTask = 
      {
        id: Date.now(),
        name: this.state.name, 
        completed: false
      }
    let todoId = this.props.match.params.id
    this.props.addTask(newTask, todoId)
    e.target.value = ''
  }
}

  changeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchValue: e.target.value
    })
  }

  changeRadioUndone = (e: React.MouseEvent<HTMLElement> | any) => {
    this.setState({
      radioFilter: e.target.value
    })
  }

  changeRadioAll = (e: React.MouseEvent<HTMLElement> | any) => {
    this.setState({
      radioFilter: e.target.value
    })
  }  

  search = (items: Array<TodosType> , term: string) => {
    if (term.length === 0) {
      return items
    }
    return items.filter(item => item.name.indexOf(term) > -1)   
  }

  filter = (items: Array<TodosType> , filter: string) => {
    switch(filter) {
      case 'all':
        return items;
      case 'undone':
        return items.filter(item => !item.completed)  
      default: return items  
    }
  } 
  
  render() {

  const localList = this.props.list;
  const todoId = this.props.match.params.id
  const myList = localList.find((value) => {    
    return value.id === +todoId
  }) 

  const { searchValue, radioFilter } = this.state

  let visibleItems
  if(myList !== undefined) {
    visibleItems = this.filter(this.search(myList.todos, searchValue), radioFilter)
  }
  
  return (
    
    <div className={classes.OneTodo}>
      <div className={classes.todo_option}>
        <form>
          <TextField className="text-field" id="standard-basic" label="Search..."
                    onChange={this.changeSearch}/>                     
          <div className={classes.radiobuttons}>
            <div>
              <input type="radio" id="contactChoice1" name="todos" defaultChecked onClick={this.changeRadioAll} value="all"/>            
              <label htmlFor="contactChoice1">All</label>
            </div>

            <div>
              <input type="radio" id="contactChoice2" name="todos" onClick={this.changeRadioUndone} value="undone"/>            
              <label htmlFor="contactChoice2">Undone</label>
            </div>
          </div>
        </form>

        <div className={classes.list}>
          <ul>
            {visibleItems && visibleItems.map((item, index) => {
              return (
                <TodoItem 
                  key={index}
                  id={item.id}
                  name={item.name}
                  completed={item.completed}
                  onCrossClick={this.onCrossClick}
                  onNameClick={this.onNameClick}                  
                />
              )
            })}            
          </ul>
        </div>

      </div>

      <div className={classes.add_todo}>
        <TextField className="text-field" id="standard-basic" label="Add todo..."
          onKeyPress={this.onKeyPressHandler} onChange={this.updateNewTask}/>
      </div>
    </div>
  )
}
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  list: state.listReducer
}) 

let mapDispatchToProps = {addTask, deleteTask, toggleStatus}

export default compose(connect<MapStatePropsType, MapDispatchPropsType, OwnProps , AppStateType>
  (mapStateToProps, mapDispatchToProps),withRouter) (OneTodo);