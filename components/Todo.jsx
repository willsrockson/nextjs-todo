"use client"
import { FaPlus } from "react-icons/fa6";
//import ListItem from "./ListItem";
import Skeleton from 'react-loading-skeleton'
import React,{ Suspense, useEffect, useState} from "react";
import { FaPencilAlt } from "react-icons/fa";
const ListItem = React.lazy(() => import('./ListItem'));
import Loader from "./Loader";

export default function Todo() {
    const [todo, setTodo] = useState('')
    const [editTodo, setEditTodo] = useState(true)
    const [editID, setEditID] = useState(null)
    const [todoFromServer, setTodoFromServer] = useState([])
    const [errMessage, setErrMessage] = useState('')


    // Send data to the database and update the UI
   async function handleSubmit(){
        if(!todo){
            setErrMessage("Field cannot be empty")
            return
        }

        if(todo.trim().length <= 5){
            setErrMessage("Characters must be more than 5")
            return
        }

        const response = await fetch('/api/todo',
             {  method: "POST", 
                headers:{'Content-Type': 'application/json'},
                body:JSON.stringify({todo})
             })
        const data = await response.json()

        if(response.ok){
            const newTodo = data[0];
            //This takes the fetched todo in state, and add the new todo stored in supabase to the state.
            setTodoFromServer((prevTodo) => [ newTodo, ...prevTodo ] )
            console.log(data);
            
            setTodo('')
            setErrMessage('')
            
            
        }
        if(!response.ok){
            setErrMessage(data.message)
            return
        }
    
        
    }
    

    // Update todo Item
    async function handleUpdate(id) {

       setEditTodo(false)
       todoFromServer.filter((item)=> {
        if(item.id === id){
          console.log(item.todo);
          setEditID(id)
          setTodo(item.todo)
        }
      })
    }
    
    //Subit the todo with the button
   async function submitUpdate(){

        const res = await fetch('/api/todo',
            { method:"PATCH",
              headers:{'Content-Type':'application/json'},
              body:JSON.stringify({editID, todo})
            })
        const data = await res.json()
        
        if(res.ok){
            const newItem = data[0]
            setTodoFromServer([ newItem, ...todoFromServer.filter((item)=> item.id !== editID )])
            setEditTodo(true)
            setTodo('')
            setErrMessage('')
            setEditID(null)
        } 
        if(!res.ok){
           setErrMessage(data.message)
           return
        }    
        
    }





     
    // Delete selected todo from the database
    async function handleDelete(id) {
        console.log(`Id of data is: ${id}`);
        const res = await fetch('/api/todo',
            { method:"DELETE",
              headers:{'Content-Type':'application/json'},
              body:JSON.stringify({id})
            })
        const data = await res.json()    
        if(res.ok){
            setTodoFromServer( todoFromServer.filter((item)=> item.id !== id ))
        } 
        if(!res.ok){
           setErrMessage(data.message)
           return
        }    
        
    }
    
// Fetch data on initial load
    useEffect(()=>{
      async function fetchTodoList(){
            const res = await fetch('/api/todo')
            const data = await res.json()
            setTodoFromServer(data)
            
        }
        fetchTodoList()
    }, [])

   

  return (
    <div className='todo-box'>


        <div className='form-box'>
           {editTodo ? 
                <> 
                    <input value={todo} onChange={e => setTodo(e.target.value)} type="text" placeholder=" What's on your mind?"/>
                    <button onClick={handleSubmit} className='add-btn'> <FaPlus size={"25px"} /> </button>
                </> :
                <>
                    <textarea className="edit-input" value={todo} onChange={e => setTodo(e.target.value)} type="text" placeholder=" Edit todo here"/>
                    <button onClick={submitUpdate} className='add-btn'> <FaPencilAlt size={"25px"} color="blue" /> </button>
                </>
           } 
        </div>
        <span className="err">{errMessage}</span>

        <div className='todo-container'>
            <ul>  
              <Suspense fallback={<Loader />}>            
                {todoFromServer.map((item) => (
                    <ListItem 
                        content={item.todo} 
                        key={item.id} 
                        handleDelete={()=> handleDelete(item.id)} 
                        handleUpdate={()=> handleUpdate(item.id)}
                        dateTime={item.created_at} 
                    />                
                ))}  
               </Suspense> 
            </ul>
              
        </div>

    </div>
  )
}
