import React from 'react';
import "./index.css";
import { FaEdit} from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';


const Todolist = (props) => {

    return (
        <>
            {console.log("Hello")}
            <div className='todo_style'>
                {/* <img src="icon1.png" alt="no"/> */}
                <li>{props.text}</li>
                <div className='btn'>
                    <button className="edit" onClick={() => {
                        props.onSelect2(props.id)
                    }
                    }><FaEdit/></button>
                    <button className="delete" onClick={() => {
                        props.onSelect1(props.id)
                    }
                    }><MdDelete/></button>
                </div>
                {/* {console.log("Hello"+props.text)} */}

            </div>
        </>
    );
};

export default Todolist;