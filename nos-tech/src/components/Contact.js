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
                   <div class="form-group">
                        <label for="exampleInputName">Name </label>
                        <input 
                            type="text" 
                            class="form-control" 
                            id="exampleInputName"
                            placeholder="First Name"/>
                    </div>
                    
                    <div class="form-group">
                        <label for="exampleInputName">Surame </label>
                        <input 
                            type="text" 
                            class="form-control" 
                            id="exampleInputName"
                            placeholder="Surname"/>
                    </div>

                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input 
                            type="email" 
                            class="form-control" 
                            id="exampleInputEmail1" 
                            aria-describedby="emailHelp" 
                            placeholder="Enter email"/>
                    </div>

                    <div class="form-group">
                        <label for="exampleInputSubject">Subject </label>
                        <input 
                            type="text" 
                            class="form-control" 
                            id="exampleInputSubject"
                            placeholder="Subject"/>
                    </div>

                    <div class="form-group">
                        <label for="exampleInputName">Your Message/Question </label>
                        <textarea 
                            type="text" 
                            class="form-control" 
                            id="exampleInputMesage"
                            placeholder="Message"/>
                            <small id="emailHelp" class="form-text text-muted">We'll never share your informations with anyone else.</small>
                    </div>

                    <button type="submit" label="send" className="btn btn-primary pseudoBtn">
                        Send
                    </button>
               </form>
           </div>
        </div>
    )
}

export default Contact
