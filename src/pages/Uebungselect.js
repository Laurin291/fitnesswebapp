import {useState} from 'react'
import {Button, Checkbox, Divider, Dropdown, IconClipboard, IconCopy, IconTrash, Select, Typography} from '@supabase/ui'
import data from "../data.js";
import React from 'react';
import {ReactComponent as PlusIcon} from '../icons/plus-circle-fill.svg';
import {Link} from "react-router-dom";
import { useNavigate} from "react-router-dom";
//import {ReactComponent as BackIcon} from '../icons/back.svg';


// eslint-disable-next-line react-hooks/rules-of-hooks

export default function DropdownCheckbox() {
    const data2 = data.get('uebungen')
    const [numChildren, setNumChildren] = useState(0)
    const [value, setValue] = useState("Beine");
    let items = []
    let selectedItems =[]


    const Checkbox=({label}) =>{
        return (
            <div className="checkbox-wrapper">
                <label onChange={checkstate} id={label}>
                    <input type="checkbox" />
                    <span>{label}</span>
                </label>
            </div>
        );
    };


    const ChildComponent = (otto) => {
        const data3 = data.getbyID(otto.number, value, "uebungen")
        return (<div> {data3 && data3.length > 0 && data3.map((userObj, index) => (
            <p id="ch"> <Checkbox label={userObj.Name}></Checkbox></p>
        ))}
        </div>)
    }

    for (let i = 0; i <= numChildren; i++) {
        items.push(<ChildComponent key={i} number={i}/>)
    }

    const addComponent = () => {
        setNumChildren(data2.length)
    }
    function handleChange(e){
        addComponent()
        setValue(e.target.value);
    }

    const ParentComponent = ({children, addComponent}) => {
        return (
            <>
                <div>{children}</div>
            </>
        )
    }

    const [checked, setChecked] = useState(false)

    const Backbutton= () =>{
        let navigate = useNavigate();
        return (
            <>
                <button onClick={() => navigate(-1)} id="back">Back</button>
            </>
        );
    }

    //Funktion um die ausgewählten Übungen zu speichern und wenn sie nicht mehr ausgewählt sind sie zu löschen
    function checkstate(e){

        if (e.target.checked && !selectedItems.includes(e.currentTarget.id)){
            selectedItems.push(e.currentTarget.id)
        }else if (selectedItems.includes(e.currentTarget.id)){
            const newSelectedItems = selectedItems.filter(function (item) {
                return item !== e.currentTarget.id;
            });
            selectedItems = newSelectedItems
        }
        console.log(JSON.stringify(selectedItems))
        console.log(window.localStorage.getItem("items"))
    }

    function submitAction(){
        window.localStorage.clear()
        window.localStorage.setItem("items", JSON.stringify(selectedItems));


    }

    return (
        <>
            <div id="navaa">
                <h1>Select your exercises <Backbutton>Back</Backbutton></h1>
                <Select  id="options" onChange={handleChange} >
                    <Select.Option>Beine</Select.Option>
                    <Select.Option>Brust</Select.Option>
                    <Select.Option>Rücken</Select.Option>
                    <Select.Option>Schultern</Select.Option>
                    <Select.Option>Bizeps</Select.Option>
                    <Select.Option>Trizpes</Select.Option>

                </Select>

                <ParentComponent addComponent={addComponent}>{items} </ParentComponent>
                <Link to="/create"> <input type="submit" value="Submit" id="ch" onClick={submitAction}></input></Link>
            </div>
        </>

    )
}