import { ListType, TodosType } from "../../types";
import { ActionsTypes } from "../actions";

const GET_LIST_DATA_SUCCESS = "GET_LIST_DATA_SUCCESS";
const ADD_LIST_TITLE_SUCCESS = "ADD_LIST_TITLE_SUCCESS";
const ADD_TASK = "ADD_TASK";
const DELETE_TASK = "DELETE_TASK";
const TOGGLE_STATUS = "TOGGLE_STATUS";

let initalState = [] as Array<ListType>

type InitialStateType = typeof initalState;

export function listReducer(state = initalState, action: ActionsTypes): InitialStateType {
  
  switch(action.type) {
    case GET_LIST_DATA_SUCCESS: {      
      return action.list;
    }

    case ADD_LIST_TITLE_SUCCESS: {      
      const newState = JSON.parse(JSON.stringify(state));
      newState.push(action.listItem)
      return newState      
    }      

    case ADD_TASK: {          
      const newState = JSON.parse(JSON.stringify(state));
      const editingItem = newState.find((item: TodosType) => item.id === +action.todoId);
      editingItem.todos.push(action.newTask)
      return newState;
    }

    case DELETE_TASK: {      
      const newState = JSON.parse(JSON.stringify(state));
      const editingItem = newState.find((item: TodosType) => item.id === +action.todoId)
      const idx = editingItem.todos.findIndex((item: TodosType) => item.id === +action.taskId)
      editingItem.todos.splice(idx, 1)
      return newState;
    }

    case TOGGLE_STATUS: {      
      const newState = JSON.parse(JSON.stringify(state));
      const editingItem = newState.find((item: TodosType) => item.id === +action.todoId);
      const idx = editingItem.todos.findIndex((item: TodosType) => item.id === +action.taskId)
      editingItem.todos[idx].completed = !editingItem.todos[idx].completed       
      return newState
    }   

    default: return state;  
  }
}