import React from "react";
import './Signup.css';
import { Typography } from "@mui/material";

const Regex = RegExp(/^\s?[A-Z0–9]+[A-Z0–9._+-]{0,}@[A-Z0–9._+-]+\.[A-Z0–9]{2,4}\s?$/i);

interface SignUpProps {
   name?: any;
   value?: any;
}
interface SignUpState {
   username : string,
   email : string,
   password : string,
   errors : {
      username : string,
      email : string,
      password : string
   }
}



export class Signup extends React.Component<SignUpProps,SignUpState> 
{
   constructor(props:SignUpProps){

      super(props);
      const initialState = {
         username : '',
         email : '',
         password : '',
         errors : {
           username : '',
           email : '',
           password : ''
         } 
       }
       this.state = initialState;
       this.handleChange = this.handleChange.bind(this);
 }

   handleChange = (event : any) => {
      event.preventDefault();
      const { name, value } = event.target;
      let errors = this.state.errors;
      switch (name) {
        case 'fullName':
           errors.username = value.length < 5 ? 'Fullname must be 5 characters long!': '';
           break;
        case 'email':
           errors.email = Regex.test(value)? '': 'Email is not valid!';
           break;
        case 'password':
           errors.password = value.length < 8 ? 'Password must be eight characters long!': '';
           break;
        default:
          break;
      }
    this.setState(Object.assign(this.state, { errors,[name]: value }));
    console.log(this.state.errors);
    }

    
   handleSubmit = (event : any) => {
      event.preventDefault();
      let validity = true;
      Object.values(this.state.errors).forEach(
        (val) => val.length > 0 && (validity = false)
      );
      if(validity == true){
         console.log("Registering can be done");
      }else{
         console.log("You cannot be registered!!!")
      }
   }

   
  render() {
   const {errors} = this.state 
        return (
          <div className='wrapper'>
            <div className='form-wrapper'>
               <h2>Sign Up</h2>
               <form onSubmit={this.handleSubmit} noValidate >
                  <div className='fullName'>
                     <label htmlFor="fullName">Full Name:
                     <input type='text' name='fullName' onChange={this.handleChange}/>
                     </label>
                     {errors.username.length > 0 &&  <Typography style={{color: "red"}}>{errors.username}</Typography>}
                  </div>
                  <div className='email'>
                     <label htmlFor="email">Email ID: 
                     
                     <input type='email' name='email' onChange={this.handleChange}/>
                     </label>
                     {errors.email.length > 0 &&  <Typography style={{color: "red"}}>{errors.email}</Typography>}
                  </div>
                  <div className='password'>
                     <label htmlFor="password">Password :
                     <input type='password' name='password' onChange={this.handleChange}/>
                     </label>
                     {errors.password.length > 0 &&  <Typography style={{color: "red"}}>{errors.password}</Typography>}

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