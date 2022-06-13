import React , { useContext, useEffect, useState} from 'react';
import { useHistory, useParams } from 'react-router-dom'
import '../../App.css';
import { Button } from '../Button';
import Footer from '../Footer';
import '../Navbar.css';
import './Login.css';
import { LoginContext } from '../../LoginContext';
import { useIndexedDB } from 'react-indexed-db';




function Login() {
  let { id } = useParams();
  const [state, setState] = useState({ uuid: "" });
  const { add, update, getByID } = useIndexedDB("people");
  const [uid, setUid] = useContext(LoginContext);
  const history = useHistory();
  useEffect(() => {
    if (uid !== -1 && uid !== 'undefined') {
      return history.push('/myprofile');
    } else {
      if (id && state.uuid === "") {
        getByID(id).then((peopleFromDB) => {
          console.log("getByID id=", id, "peopleFromDB=", peopleFromDB);
          if (peopleFromDB) {
            setState(peopleFromDB);
            setUid(state.uuid)
          }
        });
      }
    }
  }, []);

  function ajaxProba() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       console.log(this.responseText);
       setUid(this.responseText);
       if (state.id) {
        update(state).then(
          (successEvent) => {
            console.log("successEvent: ", successEvent);
            history.goBack();
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        add(state).then(
          (key) => {
            console.log("ID Generated: ", key);
            let newState = Object.assign({}, state);
            newState.id = key;
            setState(newState);
            history.goBack();
          },
          (error) => {
            console.log(error);
          }
        );
      }
       return history.push('/myprofile');
      }
    };
    xhttp.open("POST", "api/login", true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send("login=" + document.getElementById("loginID").value + "&password=" + document.getElementById("passwordID").value);
  }

  function pobierzId() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       console.log(this.responseText);
       setUid(this.responseText);
      }
    };
    xhttp.open("GET", "api/userid", true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send();
  }

  return (
    
    <>
    <div>
        {state.fullname}
        {console.log(state.fullname)}
        {console.log(state.age)}
    {state.age}</div>
<form class="box">
  <h1>Logowanie</h1>
  <input type="text" name="login" id = "loginID" placeholder="Username" />
  <input type="password" name="password" id = "passwordID" placeholder="Password" />
  <input type="button" name="" value="Zaloguj się" onClick={ajaxProba} />
  {/* <input type="button" name="" value="Pobierz id" onClick={pobierzId} /> */}
  <br></br>
  <h2>Nie masz konta</h2>
  <Button>Zarejestuj się</Button>
</form>
	
  
    



        <Footer/>
    </>
    	
	
  );
  
  
  }	


export default Login;