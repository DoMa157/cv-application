import { useState } from 'react'
import './Education.css'
import {v4 as uuid} from 'uuid';

export default function Education(){
    const uid = uuid();
    const [inputValues, setInputValues] = useState([{id : uid, name: '', title: '', graduationDate: '', display: false}]);
    const handleInputChange = function(event, id){
        let intermediateValues = []
        for(let i = 0; i<inputValues.length; i++){
            if(inputValues[i].id != id){
                intermediateValues.push(inputValues[i]);
            }
            else{
                switch(event.target.name){
                    case "name":
                        intermediateValues.push({...inputValues[i], name: event.target.value});
                        break;
                    case "title":
                        intermediateValues.push({...inputValues[i], title: event.target.value});
                        break;
                    case "graduationDate":
                        intermediateValues.push({...inputValues[i], graduationDate: event.target.value});
                        break;
                }
            }
        }
        setInputValues(intermediateValues);
    }
    const handleFormSubmit = function(event, id){
        event.preventDefault();
        let intermediateDisplayInfo = [];
        for(let i = 0; i<inputValues.length; i++){
            if(id == inputValues[i].id){
                intermediateDisplayInfo.push({...inputValues[i], display: true});
            }
            else{
                intermediateDisplayInfo.push(inputValues[i]);
            }
        }
        setInputValues(intermediateDisplayInfo);
    }

    const handleFormEdit = function(event, id){
        event.preventDefault();
        let intermediateDisplayInfo = [];
        for(let i = 0; i<inputValues.length; i++){
            if(id == inputValues[i].id){
                intermediateDisplayInfo.push({...inputValues[i], display: false});
            }
            else{
                intermediateDisplayInfo.push(inputValues[i]);
            }
        }
        setInputValues(intermediateDisplayInfo);
    }
    const handleFormAdd = function(event){
        event.preventDefault();
        let intermediateValues = []
        for(let i = 0; i<inputValues.length; i++){
            intermediateValues.push(inputValues[i]);
        }
        intermediateValues.push({id: intermediateValues.length, name: '', title: '', graduationDate: ''});
        setInputValues(intermediateValues);
    }
    return (
        <>
        {inputValues.map(x => !x.display ? 
        <form className="flex-container" key = {x.id} id = {x.id}>
            <label htmlFor = "name">Name Of School:</label>
            <input type = "text" name="name" onChange = {(e) => handleInputChange(e, x.id)} value = {x.name}/>
            <label htmlFor="title">Title Of Study:</label>
            <input type = "text" name = "title" onChange = {(e) => handleInputChange(e, x.id)} value = {x.title}/>
            <label htmlFor = "graduationDate">Graduation Date:</label>
            <input type = "date" name = "graduationDate" onChange = {(e) => handleInputChange(e, x.id)} value = {x.graduationDate}/>
            <div><Button onClick = {(e) => handleFormSubmit(e, x.id)} text = "Submit"></Button></div>
        </form>
        : 
        <div className = "flex-container" key = {x.id} id = {x.id}>
            <div className = "education-title">Name Of School: </div>
            <div className='info'>{x.name}</div>
            <div className = "education-title">Title Of Study: </div>
            <div className = 'info'>{x.title}</div>
            <div className = "education-title">Graduation Date: </div>
            <div className='info'>{x.graduationDate}</div>
            <div className='edit-btn'><Button onClick = {(e) => handleFormEdit(e, x.id)} text = "Edit"></Button></div>
            {inputValues.indexOf(x) == inputValues.length - 1 && <div className = "edit-btn"><Button onClick = {handleFormAdd} text = "Add"></Button></div>}
        </div>
        )}
        </>
    )
}



function Button(props){
    return (
        <button onClick = {props.onClick} className = "form-btn">{props.text}</button>
    )
}