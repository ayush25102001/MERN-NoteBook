import React, { useState } from "react"
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [credentials, setcredentials] = useState({ email: "", password: "" });
    let history = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json)
        if (json === false) {
            props.showAlert('Invalid Credentials','danger')
        } else {
            //save the authToken and redirect
            localStorage.setItem('token', json.token)
            props.showAlert('Login successfull','success')
            history('/')
        }
    }
    const onChange = (e) => {
        setcredentials(prevState => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }

    return (
        <div className="mt-3">
        <h2>Login to continue with MERN-noteBook</h2>
            <form onSubmit={handleSubmit}>
                
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="htmlForm-label">Email address</label>
                    <input type="email" className="htmlForm-control" name='email' onChange={onChange} value={credentials.email} id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="htmlForm-label">Password</label>
                    <input type="password" name="password" onChange={onChange} value={credentials.password} className="htmlForm-control" id="exampleInputPassword1" />
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login