import { useState } from 'react'
import './Practical.css'
import {v4 as uuid} from 'uuid';

export default function Practical(){
    const uid = uuid();
    const [inputValues, setInputValues] = useState([{id: uid, company: '', title: '', responsibilities: '', startDate: '', endDate: '', display: false}]);
    const handleInputChange = function(event, id){
        let intermediateValues = [];
        for(let i = 0; i<inputValues.length; i++){
            if(inputValues[i].id != id){
                intermediateValues.push(inputValues[i]);
            }
            else{
                switch(event.target.name){
                    case "company":
                        intermediateValues.push({...inputValues[i], company: event.target.value});
                        break;
                    case "title":
                        intermediateValues.push({...inputValues[i], title: event.target.value});
                        break;
                    case "responsibilities":
                        intermediateValues.push({...inputValues[i], responsibilities: event.target.value});
                        break;
                    case "startDate":
                        intermediateValues.push({...inputValues[i], startDate: event.target.value});
                        break;
                    case "endDate":
                        intermediateValues.push({...inputValues[i], endDate: event.target.value});
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
        let intermediateValues = [];
        for(let i = 0; i<inputValues.length;i++){
            intermediateValues.push(inputValues[i]);
        }
        intermediateValues.push({id: uid, company: '', title: '', responsibilities: '', startDate: '', endDate: '', display: false});
        setInputValues(intermediateValues);
    }
    return (
        <>
        {inputValues.map(x => !x.display ? 
            <form className="flex-container" key = {x.id} id = {x.id}>
                <label htmlFor = "company">Company:</label>
                <input type = "text" name="company" onChange = {(e) => handleInputChange(e, x.id)} value = {x.company}/>
                <label htmlFor="title">Job Title:</label>
                <input type = "text" name = "title" onChange = {(e) => handleInputChange(e, x.id)} value = {x.title}/>
                <label htmlFor="responsibilities">Responsibilities:</label>
                <input type = "textarea" name = "responsibilities" onChange = {(e) => handleInputChange(e, x.id)} value = {x.responsibilities}/>
                <label htmlFor = "startDate">Start Date:</label>
                <input type = "date" name = "startDate" onChange = {(e) => handleInputChange(e, x.id)} value = {x.startDate}/>
                <label htmlFor = "endDate">End Date:</label>
                <input type = "date" name = "endDate" onChange = {(e) => handleInputChange(e, x.id)} value = {x.endDate}/>
                <div><Button onClick = {(e) => handleFormSubmit(e, x.id)} text = "Submit"></Button></div>
            </form>
        :
        <div className = "flex-container" key = {x.id} id = {x.id}>
            <div className = "practical-title">Company: </div>
            <div className='info'>{x.company}</div>
            <div className = "practical-title">Job Title: </div>
            <div className = 'info'>{x.title}</div>
            <div className = "practical-title">Responsibilities: </div>
            <div className='info'>{x.responsibilities}</div>
            <div className="practical-title">Start Date:</div>
            <div className="info">{x.startDate}</div>
            <div className="practical-title">End Date:</div>
            <div className="info">{x.endDate}</div>
            <div className = "edit-btn"><Button onClick = {(e) => handleFormEdit(e, x.id)} text = "Edit"></Button></div>
            {inputValues.indexOf(x) == inputValues.length - 1 && <div className = "edit-btn"><Button onClick = {handleFormAdd} text = "Add"></Button></div>}
        </div>)}
        </>
    )

}



function Button(props){
    return (
        <button onClick = {props.onClick} className = "form-btn">{props.text}</button>
    )
}