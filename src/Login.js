import React, { useState } from 'react';
import './Login.css'
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";
import { useStateValue } from "./context/StateProvider";
import { actionTypes } from "./context/reducer";

function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [state, dispatch] = useStateValue();


    const signIn = e => {
        e.preventDefault();

        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                if (auth) {
                    dispatch({
                        type: actionTypes.SET_USER,
                        user: auth.user,
                    });
                    history.push('/search')
                }
            })
            .catch(error => alert(error.message))
    }

    const register = e => {
        e.preventDefault();
        alert("A last reminder before you sign up! Remember that by doing so you have confirmed that you are certified to practice law in your region, and that you hereby assume full responsibility in the information that you provide. Welcome to SimpLaws!");

        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                // it successfully created a new user with email and password
                if (auth) {
                    dispatch({
                        type: actionTypes.SET_USER,
                        user: auth.user,
                    });
                    history.push('/search')
                }
            })
            .catch(error => alert(error.message))
    }

    return (
        <div className='login'>
            <Link to='/'>
                <img
                    className="login__logo"
                    src='https://media.discordapp.net/attachments/809080871181221958/823672092394258443/unknown.png'
                />
            </Link>

            <div className='login__container'>
                <h1>Sign in as a verified lawyer</h1>

                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

                    <button type='submit' onClick={signIn} className='login__signInButton'>Sign In</button>
                </form>

                <p>
                    By signing in you are confirming that you are certified to practice law. SimpLaws is not liable for any misinformation or malpractice lawsuits that may result; you will assume full responsibility from here on.
                </p>

                <button onClick={register} className='login__registerButton'>Create your SimpLaws lawyer account</button>
            </div>
        </div>
    )
}

export default Login