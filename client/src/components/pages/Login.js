import React from 'react';
import '../../App.css';
import { Button } from '../Button';
import Footer from '../Footer';
import '../Navbar.css';
import './Login.css';

function Login() {
  

  return (
    
    <>
<form class="box" action="index.html" method="post">
  <h1>Logowanie</h1>
  <input type="text" name="" placeholder="Username" />
  <input type="password" name="" placeholder="Password" />
  <input type="submit" name="" value="Zaloguj się" />
  <br></br>
  <h2>Nie masz konta</h2>
  <Button>Zarejestuj się</Button>
</form>
	
  
    



        <Footer/>
    </>
    	
	
  );
  
  
  }	


export default Login;