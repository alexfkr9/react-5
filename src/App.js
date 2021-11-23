import React, { useState, useEffect } from "react"
import axios from 'axios'
import './App.css';

function App() {
  
  const [appState, setAppState] = useState(
    [{
    id: "5e00928d91e7feaa9872ec08",
    firstName: "Yang",
    lastName: "Carson",
    dob: "2019-02-26T16:52:36.244Z"},
    {
    id: "5e00928df892b0c84c82db9d",
    firstName: "Dorsey",
    lastName: "Meadows",
    dob: "2019-09-19T09:34:32.083Z"},{
    id: "5e00928db89ff9c2559f9560",
    firstName: "Watson",
    lastName: "Good",
    dob: "2019-05-09T03:24:32.532Z"}]
  );
  const [birthdayState, setBirthdayState] = useState();
  
  useEffect(() => {
    const apiUrl = 'https://yalantis-react-school-api.yalantis.com/api/task0/users';
    axios.get(apiUrl).then((resp) => {            
      setBirthdayState(resp.data);
      const employees = resp.data || appState;
      const employeesSort = [...employees].sort((a, b) => a.lastName.localeCompare(b.lastName));
      
      employeesSort.map((employe) => employe.active = 'no' );
      setAppState(employeesSort);  
    });
  }, [setAppState]);

 
  
    const [activeState, setActiveState] = useState();
    
    const [styleState, setStyleState] = useState();

               
    if (!appState || appState.length === 0) return <p>Нет данных.</p>
  
    const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
 
          
    const update = (_id, e) => {
             // console.log('id'+_id); console.log('event.target.value'+e.target.value);           
      
      const newState = appState.map(obj =>
        obj.id === _id ? { ...obj, active: e.target.value } : obj
      );      
                
      setAppState(newState);   
                      
    };

  return (
    <div className='app'>   	
    	<div className='employees'>
        Employees
                <ul>
                    {
                        appState.map((employe) =>
                            <li key={employe.id} >
                                A                            
                                <h4 className={employe.active === 'yes' ? 'active' : ''}>
                                {employe.firstName} 
                                {employe.lastName}
                                </h4>                                
                            
                            <form>   
                                <label>
                                    <input                                        
                                        type="radio" 
                                        name="choice"
                                        value='no' 
                                        checked={employe.active === 'no'}                                        
                                        onChange={(e) => update(employe.id, e)}
                                    /> not active
                                </label>
                                <br />
                                <label>
                                    <input 
                                        type="radio" 
                                        name="choice"
                                        value='yes'                                        
                                        checked={employe.active === 'yes'}
                                        onChange={(e) => update(employe.id, e)}
                                    /> active
                                </label>
                            </form>                                                              
                             <br />                            
                            </li>
                        )
                    }
                </ul>
      </div>

        
    </div>
  );
}

export default App;

