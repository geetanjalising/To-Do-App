import React, { useEffect, useState } from 'react';
import "./index.css";
import { FaEdit} from 'react-icons/fa';
import { GrAdd} from 'react-icons/gr';
import Typical from  'react-typical';
import Todolist from './Todolist.js';

function App() {
  const getLocalItems = () => {
    let list = localStorage.getItem('lists')
    console.log(list);
    if (list) {
      return JSON.parse(localStorage.getItem('lists'));
    }
    else {
      return [];
    }
  }
  const [inputList, setInputList] = useState("");
  const [Items, setItems] = useState(getLocalItems());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  function itemEvent(event) {
    setInputList(event.target.value);
  }


  function addListItems() {
    if (!inputList) {
      alert('plzz fill the data');
    }
    else if (inputList && !toggleSubmit) {
      setItems(
        Items.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: inputList }
          }
          return elem;
        })

      )
      setToggleSubmit(true);
      setInputList('');
      setIsEditItem(null);
    }
    else {
      const allInputData = { id: new Date().getTime().toString(), name: inputList }
      setItems((oldItems) => {
        return [...oldItems, allInputData];
      })
      setInputList("");
    }
  };

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(Items))
  }, [Items]);

  const removeAll = () => {
    setItems([]);
  }

  const editItem = (id) => {
    let newEditItem = Items.find((elem) => {
      return elem.id === id
    });
    console.log(newEditItem);
    setToggleSubmit(false);
    setInputList(newEditItem.name);
    setIsEditItem(id);
  }


  const deleteItem = (index) => {
    console.log("deleted");
    setItems((oldItems) => {
      return oldItems.filter((arrElem) => {
        return index !== arrElem.id;
      })
    })    
  };


  return (
    <> 
      <div className='main_div'>
       
        <div className='center_div'>
          <Typical className="typical"
          loop={Infinity}
          steps={[
            "Subtracting from your list of priorities is as important as adding to it",
            1000,
            ]}/>
            {/* <p>Subtracting from your list of priorities is as important as adding to it.</p> */}
          <br />
          <h1>My Todo List</h1>
          <br />
          <input type="text" placeholder='Add todo' value={inputList} onChange={itemEvent} />
          {
            toggleSubmit ? <button className='add' onClick={addListItems}> <GrAdd/> </button> : <button className='add' onClick={addListItems}> <FaEdit/> </button>
          }

          <ol>
            {/* { <li>{inputList}</li> } */}
            {Items.map((itemval) => {
              // return <li>{itemval}</li>
              console.log(itemval);
              return <Todolist
                key={itemval.id}
                text={itemval.name}
                id={itemval.id}
                onSelect1={deleteItem}
                onSelect2={editItem}
              />
            })}
          </ol>
          <button className='clear' onClick={removeAll}>Clear All</button>
        </div>
      </div>
    </>
  );
}
export default App;