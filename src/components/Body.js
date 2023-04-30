import React from 'react';
import { useState } from 'react';
import { BsPencil, BsTrash } from 'react-icons/bs';

const Body = () => {
  const [todoItem, setTodoItem] = useState('');
  const [todoList, setTodoList] = useState(['TODO1', 'TODO2', 'TODO3']);
  const [completedList, setCompletedList] = useState([]);
  const [itemToEdit, setItemToEdit] = useState("TODO4");
  const [newValue, setNewValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  function deleteTodoItem(itemToDelete) {
    const updatedList = todoList.filter(item => item !== itemToDelete);
    setTodoList(updatedList);
  }

  function addTodoItem(itemToAdd) {
    const updatedList = [...todoList];
    updatedList.push(itemToAdd);
    setTodoList(updatedList);
  }

  function addToCompletedList(itemToAddInCompletedList) {
    const updatedList = [...completedList];
    updatedList.push(itemToAddInCompletedList);
    setCompletedList(updatedList);
  }

  function editTodoItem(itemToEdit) {
    setItemToEdit(itemToEdit);
    setIsEditing(true);
  }

  function saveEditItem(itemToEdit, newValue) {
    const updatedList = [...todoList];
    for(let i = 0; i < updatedList.length; i++) {
        if(updatedList[i] === itemToEdit) {
            updatedList[i] = newValue;
        }
    }
    setTodoList(updatedList);
  }

  return (
    <div className="container my-5">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add Todo"
          value={todoItem}
          onChange={(e) => setTodoItem(e.target.value)}
        />
        <button
          className="btn btn-dark"
          type="button"
          onClick={() => addTodoItem(todoItem)}
        >
          Add Item
        </button>
      </div>
      <ul className="list-group">
        {todoList.map((currentTodoItem, index) => {
            if (currentTodoItem === itemToEdit && isEditing === true) {
                return (
                    <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        <input type="text" value={newValue} placeholder = {currentTodoItem} className="form-control" style = {{margin : "4px", padding : "5px"}} onChange = {(e) => {
                            setNewValue(e.target.value);
                        }
                        }></input>
                        <button className="btn btn-dark me-2" onClick = {() => saveEditItem(itemToEdit, newValue)}>Save</button>
                        <button className="btn btn-dark" onClick = {() => setIsEditing(false)}>Cancel</button>
                    </div>
                )
            } else {
                return (
                    <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        {currentTodoItem} {completedList.includes(currentTodoItem) === true ? "- Done" : ""}
                        <div>
                            <button className="btn btn-dark me-2" onClick = {() => editTodoItem(currentTodoItem)}> <BsPencil /> Edit</button>
                            <button className="btn btn-dark me-2" onClick={() => addToCompletedList(currentTodoItem)}>Complete</button>
                            <button className="btn btn-dark" onClick={() => deleteTodoItem(currentTodoItem)}> <BsTrash></BsTrash> Delete</button>
                        </div>
                    </div>
                );
            }
        })}
      </ul>
    </div>
  );
};

export default Body;
