import { useState } from 'react'
import './General.css'


export default function General(){
    const [inputValues, setInputValues] = useState({name: '', email: '', phone: ''});
    const [displayInfo, setDisplayInfo] = useState(false);
    const handleInputChange = function(event){
            switch(event.target.name){
                case "name":
                    setInputValues({...inputValues, name: event.target.value});
                    break;
                case "email":
                    setInputValues({...inputValues, email: event.target.value});
                    break;
                case "phone":
                    setInputValues({...inputValues, phone: event.target.value});
                    break;
            }
    }
    const GeneralInformation = function(){
        return (
            <>
                <div className = "flex-container">
                    <div className = "general-title">Name: </div>
                    <div className='info'>{inputValues.name}</div>
                    <div className = "general-title">Email: </div>
                    <div className = 'info'>{inputValues.email}</div>
                    <div className = "general-title">Phone Number: </div>
                    <div className='info'>{inputValues.phone}</div>
                    <div className = "edit-btn"><Button onClick = {handleFormEdit} text = "Edit"></Button></div>
                </div>
            </>
        );
    }

    const GeneralForm = function(){
        return (
            <>
                <form className="flex-container">
                    <label htmlFor = "name">Name</label>
                    <input type = "text" name="name" onChange = {handleInputChange} value = {inputValues.name}/>
                    <label htmlFor="email">Email</label>
                    <input type = "email" name = "email" onChange = {handleInputChange} value = {inputValues.email}/>
                    <label htmlFor = "phone">Phone number</label>
                    <input type = "number" name = "phone" onChange = {handleInputChange} value = {inputValues.phone}/>
                    <div><Button onClick = {handleFormSubmit} text = "Submit"></Button></div>
                </form>
            </>
        )
    }
    const handleFormSubmit = function(event){
        event.preventDefault();
        setDisplayInfo(true);
    }

    const handleFormEdit = function(event){
        event.preventDefault();
        setDisplayInfo(false);
    }
    if(displayInfo){
        return GeneralInformation();
    }
    else{
        return GeneralForm();
    }

}



function Button(props){
    return (
        <button onClick = {props.onClick} className = "form-btn">{props.text}</button>
    )
}