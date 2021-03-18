import React, {Component} from 'react';
import classes from './MainPage.module.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TodosList from '../TodosList/TodosList';
import { connect } from 'react-redux';
import { getListData, addListTitle } from '../../redux/actions';
import { TodosType, ListType } from '../../types';
import { AppStateType } from '../../redux/reducers/rootReducer';

type StateType = {
  id: number,
  title: string,
  todos: Array<TodosType>
}

type MapStatePropsType = {  
  list: Array<ListType>
}  

type MapDispatchPropsType = {  
  getListData: (arg: string) => void,
  addListTitle: (arg: string, newTitle: any) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType

class MainPage extends Component<PropsType, StateType> {
  
  state = {
    id: +'',
    title: '',
    todos: []
  }    

  componentDidMount() {
    setTimeout(() => {
      this.props.getListData('http://localhost:8000/list/')
    }, 100);
    
  }

  onKeyPressHandler = (e: any) => {    
  if (e.key === 'Enter') {
    e.preventDefault()
    if (e.target.value) {
      let newTitle = {...this.state}
    this.props.addListTitle('http://localhost:8000/list/', newTitle)
    e.target.value = ''
    this.setState({
      title: '',
    }) 
    }    
  }  
  }

  addTitleHandler = () => {
    if (this.state.title) {
      let newTitle = {...this.state}
      this.props.addListTitle('http://localhost:8000/list/', newTitle)
      this.setState({
      title: '',
    })  
    }        
  }  

  updateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: e.target.value,
      id: Date.now()
    })    
  }
  
  render() {    
  return(
    <div className={classes.MainPage}>
      <div className={classes.top}>
        <ul>
          {this.props.list.map((item, index) => {
            return(              
              <TodosList 
                key={index}
                title={item.title}
                todos={item.todos}
                id={item.id}                  
              />              
            )
          })}
        </ul>
      </div>

      <div className={classes.bottom}>
        <form noValidate autoComplete="off">
          <TextField className={classes.text_field} id="standard-basic" label="New list..."
                      onChange={this.updateTitle} onKeyPress={this.onKeyPressHandler} value={this.state.title} />
          <div className="btn">
            <Button className={classes.btn} variant="contained" onClick={this.addTitleHandler}>Create</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({  
  list: state.listReducer
}) 

let mapDispatchToProps = {addListTitle, getListData}

export default connect<MapStatePropsType, MapDispatchPropsType, {} , AppStateType>(mapStateToProps, mapDispatchToProps)(MainPage)

