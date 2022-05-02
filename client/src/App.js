import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Myprofile from './components/pages/Myprofile';

import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Dodaj_ogloszenie from './components/pages/Dodaj_ogloszenie'
import Footer from './components/Footer';
import Notice_details from './components/pages/Notice_details';
import Child from './components/pages/Notice_details';
import  ReservationDetail   from './components/pages/Reservation';
import Reservation from './components/pages/Reservation';
import { Advert } from './components/pages/Advert';

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
      <Router>
        <Navbar />
        <Switch>  
          <Route path='/' exact component={Home} />
          <Route path='/login' component={Login} />     
          <Route path='/myprofile' component={Myprofile} />
          <Route path='/signup' component={Signup} />
          <Route path='/dodaj' component={Dodaj_ogloszenie} />
          <Route path='/noticedetails/:id' component={Notice_details}/>
          <Route path='/zarezerwowano/:id' component={Reservation}>
          </Route>

        </Switch>
      <Footer/>
      </Router>
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