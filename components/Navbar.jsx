import '@/app/component.css'
import { FaGithub } from "react-icons/fa6";


export default function Navbar() {
  return (
       <nav className="navbar">
             
               <div className='logo'>
                  <p className='logo-name'>Todo</p>
                  <p className='colored-logo'>app</p>
               </div>
               <a href="https://github.com/willsrockson" target='blank'> <span><FaGithub/> Developer Github</span></a>
       </nav>
  )
}
