import { Button, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import './Login.css';

export default function LoginPage() 
{
    const [email, setEmail] = useState<any | null>("");
    const [password, setPassword] = useState<any | null>("");
    const [admin, setIsadmin] = useState<any | null>(false);

  
     const SubmitData = async(e:any) => {
        e.preventDefault()
        axios.post(admin ? `http://localhost:5000`: `http://localhost:5000`, {
            email, password
        })
            .then((res) => console.log(res))
            .catch((err) => alert(err))
        console.log({email, password, admin})
      }
    

  return (
    <div className="Login">
      <div className='LoginBox'>
        <div className='LoginHeader'>Login</div>
        <div className='options-container'>
        <label htmlFor="userRole">Select a role:</label>
        <select id="userRole" defaultValue={"Admin"} onChange={(e) => {
        e.target.value === "Admin" ? setIsadmin(true) : setIsadmin(false);
        console.log(e.target.value);
        }}>
        <option>Admin</option>
        <option>User</option>
        </select>

        </div>
        <div className = 'inputs'>
        <form className='form-data' onSubmit={SubmitData}>
          <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} className="email" placeholder="Enter your email"/>
          <input 
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='password' 
          placeholder="Enter your password" 
          />
          <Button variant = "contained" className='btn-submit' type='submit'>Submit</Button>
            </form>
          </div>

          <Typography style={{display:"flex" , justifyContent:"center"}}>
            
          </Typography>
      </div>
    </div>
  )
}

