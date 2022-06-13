import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Myprofile from './components/pages/Myprofile';
import Organizations from './components/pages/Organizations';
import Login from './components/pages/Login';
import Logout from './components/pages/Logout';
import Signup from './components/pages/Signup';
import Regulamin from './components/pages/Regulamin';
import Pomoc from './components/pages/Pomoc';
import Tworcy from './components/pages/Tworcy';
import Kontakt from './components/pages/Kontakt';
import EditNotice from './components/pages/EditNotice'
import DeleteNotice from './components/pages/DeleteNotice'

import Dodaj_ogloszenie from './components/pages/Dodaj_ogloszenie'
import Footer from './components/Footer';
import Notice_details from './components/pages/Notice_details';
import Child from './components/pages/Notice_details';
import  ReservationDetail   from './components/pages/Reservation';
import Reservation from './components/pages/Reservation';
import { Advert } from './components/pages/Advert';
import { LoginProvider } from './LoginContext';
import { initDB } from "react-indexed-db";
import { DBConfig } from "./DBConfig";

initDB(DBConfig);

function App()
{
  const [backendData,setBackendData] = useState([{}])

  useEffect(() => {
    fetch("http://localhost:5000/api").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])
  return (
    <>
    <LoginProvider>
      <Router>
        <Navbar />
        <Switch>  
          <Route path='/' exact component={Home} />
          <Route path='/login' component={Login} />     
          <Route path='/logout' component={Logout} />     
          <Route path='/myprofile' component={Myprofile} />
          <Route path='/signup' component={Signup} />
          <Route path='/regulamin' component={Regulamin} />
          <Route path='/pomoc' component={Pomoc} />
          <Route path='/tworcy' component={Tworcy} />
          <Route path='/kontakt' component={Kontakt} />
          <Route path='/dodaj' component={Dodaj_ogloszenie} />
          <Route path='/noticedetails/:id' component={Notice_details}/>
          <Route path='/zarezerwowano/:id' component={Reservation}/>
          <Route path='/editing/:id' component={EditNotice} />
          <Route path='/deleting/:id' component={DeleteNotice} />

          <Route path='/organizacje_charytatywne' component={Organizations} />
        

        </Switch>
      <Footer/>
      </Router>
    </LoginProvider>
    </>
    /*<div>
      {(typeof backendData.users === 'undefined') ? (
        <p>Loading...</p>
      ):(
        backendData.users.map((users, i) => {
          return <p key={i}>{users}</p>
        })
      )}
    </div>*/
  )
}

export default App;