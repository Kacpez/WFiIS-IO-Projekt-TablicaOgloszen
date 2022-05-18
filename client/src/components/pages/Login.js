import React, {useRef, useState} from 'react';
import '../../App.css';
import { Button } from '../Button';
import Footer from '../Footer';
import '../Navbar.css';
import './Login.css';
import axios from 'axios';





export default function Login() {
    const [post, setPost] = React.useState(null);
  
  const loginRef = useRef(null);
  const passwordRef = useRef(null);
  
  
  return (
    
    <>
<form class="box">
  <h1>Logowanie</h1>
  <input type="text" name="login" ref={loginRef} placeholder="Username" />
  <input type="password" name="password"  ref={passwordRef} placeholder="Password" />
  <input type="submit" name="" value="Zaloguj się" onClick={ async () => {
    console.log(post);
    console.log(loginRef.current.value, passwordRef.current.value);
      let tempTab = [loginRef.current.value, passwordRef.current.value];
    //   let dbRes = (fetch("http://localhost:5000/login", {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(tempTab),
    //       } )).json().then(
    //   response => {
    //     console.log(response);
    //   }
    // )

      // console.log(loginRef.current);
      // console.log(passwordRef.current);
      console.log('ye1');
      try {
        console.log('ye2');
          await axios.post("http://localhost:5000/login", { login: loginRef.current.value, password: passwordRef.current.value }, {
              headers: { 'content-Type': 'application/json' },
              withCredentials: true,
            }).then(function (response) {
                console.log('ye33');
                console.log(response);
                console.log(response.data);
                setPost(response.data);
            }).catch(function (error) {
                console.log(error.toJSON());
            });
            // console.log('ye3');
            console.log(post);
      } catch (error) {
          console.log(error.toJSON());
          console.log('ye4');
      }
      console.log('ye5');
      
    }} />



  <br></br>
  <h2>Nie masz konta</h2>
  <Button>Zarejestuj się</Button>
</form>
    
        <Footer/>
    </>
        
    
  );

}