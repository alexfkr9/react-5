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

    console.log(appState)

    
    let data = appState.reduce((r, e) => {
 
  // get first letter of name of current element
  let alphabet = e.lastName[0];
 
  // if there is no property in accumulator with this letter create it
  if (!r[alphabet]) r[alphabet] = { alphabet, record: [e] }
 
  // if there is push current element to children array for that letter
  else r[alphabet].record.push(e);
 
  // return accumulator
  return r;
}, {});
 
let result = Object.values(data);
console.log(result);


                   
    if (!appState || appState.length === 0) return <p>Нет данных.</p>
  
    const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
 
          
    const update = (_id, e) => {
             // console.log('id'+_id); console.log('event.target.value'+e.target.value);           
      
      const newState = appState.map(obj =>
        obj.id === _id ? { ...obj, active: e.target.value } : obj
      );      
                
      setAppState(newState);   
                      
    };

    const Employees = (props) => (
                    <ul>
                        {
                            props.data.map((employe) =>
                                <li key={employe.id} >
                                                                
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
    )

  return (
    <div className='app'>
        
            {
            result.map((item) =>
                <div className='result'>
                    <p key={item.alphabet} >
                    { item.alphabet }
                    </p>

                    <Employees data={item.record} />
                </div>
                
            )}
            
        	<div className='employees'>
                    
            </div>
        
        
    </div>
  );
}

export default App;

