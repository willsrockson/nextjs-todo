"use client"
import { FaTrash, } from "react-icons/fa6";
import { FaPencilAlt } from "react-icons/fa";

export default function ListItem({key, content, handleDelete, handleUpdate}) {

  return (
    <li className='li-item' key={key}>
        <p>{content}</p>
        <div className='list-icons'>
            <FaPencilAlt color='blue' size={15} onClick={handleUpdate} />
            <FaTrash color='red' size={15} onClick={handleDelete} />
        </div>
    </li>
  )
}
