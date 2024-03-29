import React from 'react';
import { ButtonDodaj } from '../Button_dodaj';
import './Adverts.css';
import { Icon } from './Icon';
import { Notice_details } from './Notice_details';
import { Navbar } from '../Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Alert from "react-bootstrap/Alert";


export const Advert = ({
    data,
    key,
    res,
    buttons,
    onClick
}) => {

   

  const showAdvert = () => {
    console.show("advert")
  }



  function  reserveAdvert(){
    console.show("advert")
}


    function getDate(expiration_date)
    {
        if(String.length>0)
        {
            var d=new Date(expiration_date);
            return d.toLocaleString('en-GB', { day:"2-digit",month: 'short',year:"numeric" });
        }
        return "";
    }
    getDate();
    return (
        <div class="advert-container">
            {data.category!==""?<Icon num={data.id_category}/>:null}
            <div>
                <p class="advert-entry">Typ: {data.type}</p>
                <p class="advert-entry">Priorytet: {data.priority}</p>
                <p class="advert-entry">Wygasa: {getDate(data.expiration_date)}</p>
                <p class="advert-entry">Zgłoszone osoby: {data.reports_number}</p>
                <p class="advert-entry">Miasto: {data.city}</p>
            </div>
            <div class="advert-control">
                {data.status_description==="active"?
                <p class="status-info active-status">Aktywny</p>:<p class="status-info inactive-status">Zarezerwowany</p>}
                <ButtonDodaj param={data.id_notice} rest={res[0]} onClick={res[1]} className={'adv-button'} buttonSize={'btn2--small'}>{buttons[0]}</ButtonDodaj>
                {data.status_description==="active"?<ButtonDodaj param={data.id_notice} rest={res[2]} onClick={res[3]} className={'adv-button'} buttonSize={'btn2--small'}>{buttons[1]}</ButtonDodaj>:null}
            </div>
        </div>
    );
};