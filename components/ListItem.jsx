"use client"
import { FaTrash, } from "react-icons/fa6";
import { FaPencilAlt } from "react-icons/fa";

export default function ListItem({key, content, handleDelete, handleUpdate, dateTime}) {

  return (
    <div className="date-box">
         <li className='li-item' key={key}>
            <p>{content}</p>
            
       </li>

        
        <div className='list-icons'>
        <span className="date">{dateTime}</span>
                <FaPencilAlt color='blue' size={15} onClick={handleUpdate} />
                <FaTrash color='red' size={15} onClick={handleDelete} />
        </div>
    </div>
  )
}
