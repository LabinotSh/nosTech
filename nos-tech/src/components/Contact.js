import React from 'react'
import '../css/contact.css'

function Contact() {
    return (
        <div className="Content">
           <div className="left"></div>
           <div className="right">
               <form>
                   <h1>Got any concern?</h1>
                   <h2>Feel free to contact us!</h2>
                   <label className="custom-field">
                   <input 
                        required
                        type = "text"
                        name = "name"/>
                    <span className="placeholder">Name</span>        
                    </label>
                    
                    <label className="custom-field">
                    <input
                        required
                        type = "text"
                        name = "surname"/>
                    <span className="placeholder">Surname</span>        
                    </label>

                    <label className="custom-field">
                    <input
                        required
                        type = "email"
                        name = "email"/>
                    <span className="placeholder">E-Mail</span>        
                    </label>

                    <label className="custom-field">
                    <input
                        required
                        type = "text"
                        name = "subject"/>
                    <span className="placeholder">Subject</span>        
                    </label>

                    <label className="custom-field">
                    <input
                    className = "placeholder11  "
                        required
                        type = "text"
                        name = "message"/>
                    <span><textarea className="placeholder placeholder1" >Message</textarea></span>        
                    </label>
               </form>
           </div>
        </div>
    )
}

export default Contact
