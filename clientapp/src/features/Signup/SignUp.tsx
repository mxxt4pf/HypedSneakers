import React from "react";
import './Signup.css';

export class Signup extends React.Component{

    handleChange = (event : any) => {}
  handleSubmit = (event : any) => {}
   
  
  render() {
        return (
          <div className='wrapper'>
            <div className='form-wrapper'>
               <h2>Sign Up</h2>
               <form onSubmit={this.handleSubmit} noValidate >
                  <div className='fullName'>
                     <label htmlFor="fullName">Full Name:
                     <input type='text' name='fullName' onChange={this.handleChange}/>
                     </label>
                  </div>
                  <div className='email'>
                     <label htmlFor="email">Email ID: 
                     <input type='email' name='email' onChange={this.handleChange}/>
                     </label>
                  </div>
                  <div className='password'>
                     <label htmlFor="password">Password :
                     <input type='password' name='password' onChange={this.handleChange}/>
                     </label>
                  </div>         
                       
                  <div className='submit'>
                     <button>Register Me</button>
                  </div>
             </form>
         </div>
      </div>
     );
    }


}