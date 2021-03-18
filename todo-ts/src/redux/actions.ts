import axios from "axios";
import { TodosType, ListType } from "../types";
import { Dispatch } from "redux";

const GET_LIST_DATA_SUCCESS = "GET_LIST_DATA_SUCCESS";
const ADD_LIST_TITLE_SUCCESS = "ADD_LIST_TITLE_SUCCESS";
const ADD_TASK = "ADD_TASK";
const DELETE_TASK = "DELETE_TASK";
const TOGGLE_STATUS = "TOGGLE_STATUS";

function getListData(url: string) {
  return (dispatch: Dispatch<ActionsTypes>) => {
    axios.get(url)
    .then(response => response.data)
    .then(list => dispatch(getListDataSuccess(list)))
  }  
}

function addListTitle(url: string, newTitle: TodosType) {    
  return (dispatch: Dispatch<ActionsTypes>) => {
    axios.post(url, newTitle)
    .then(response => response.data)
    .then(listItem => dispatch(addListTitleSuccess(listItem)))
  }  
}

type GetListDataSuccessType = {
  type: typeof GET_LIST_DATA_SUCCESS,
  list: Array<ListType>
}
const getListDataSuccess = (list: Array<ListType>): GetListDataSuccessType => ({type: "GET_LIST_DATA_SUCCESS", list: list})   

type AddListTitleSuccessType = {
  type: typeof ADD_LIST_TITLE_SUCCESS,
  listItem: ListType
}
const addListTitleSuccess = (listItem: ListType): AddListTitleSuccessType => ({type: "ADD_LIST_TITLE_SUCCESS", listItem: listItem})

type AddTaskActionType = {
  type: typeof ADD_TASK,
  newTask: TodosType,
  todoId: number
}
const addTask = (newTask: TodosType, todoId: number): AddTaskActionType => ({type: "ADD_TASK", newTask: newTask, todoId: todoId})

type DeleteTaskActionType = {
  type: typeof DELETE_TASK,
  taskId: number,
  todoId: number
}
const deleteTask = (taskId: number, todoId: number): DeleteTaskActionType => ({type: "DELETE_TASK", taskId: taskId, todoId: todoId})

type ToggleStatusActionType = {
  type: typeof TOGGLE_STATUS,
  taskId: number,
  todoId: number
}
const toggleStatus = (taskId: number, todoId: number): ToggleStatusActionType => ({type: "TOGGLE_STATUS", taskId: taskId, todoId: todoId})

export type ActionsTypes = GetListDataSuccessType | AddListTitleSuccessType | AddTaskActionType |
DeleteTaskActionType | ToggleStatusActionType

export {
  getListData,
  addListTitle,
  addTask,
  deleteTask,
  toggleStatus,
  addListTitleSuccess,
  getListDataSuccess
}



