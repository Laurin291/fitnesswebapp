import {useState} from 'react'
import data from "../data.js";
import React from 'react';
import '../index.css'
import { Link } from 'react-router-dom'
import {ReactComponent as GearIcon} from '../icons/gear.svg';
import {ReactComponent as PlusIcon} from '../icons/plus-circle-fill.svg';

// eslint-disable-next-line react-hooks/rules-of-hooks
//

export default function DropdownCheckbox() {
    const data2 = data.get('trainingsplan')
    const [numChildren, setNumChildren] = useState(0)
    const [value, setValue] = useState("Beine");
    let items = []

    const ChildComponent = (otto) => {
        const data3 = data.getbyID2(otto.number, "trainingsplan")
        return (<div id="trainingsplandivs"> {data3 && data3.length > 0 && data3.map((userObj, index) => (
            <p>{userObj.name}
                <Link to={'/'+userObj.trainigsplanID}>
                    <GearIcon/>
                </Link>
            </p>

        ))}
        </div>)
    }

    for (let i = 0; i <= numChildren; i++) {
        items.push(<ChildComponent key={i} number={i}/>)
    }

    const addComponent = () => {
        setNumChildren(data2.length)
    }
    function handleChange(){
        addComponent()

    }

    const ParentComponent = ({children, addComponent}) => {
        return (
            <>
                {children}
            </>
        )
    }




    const [checked, setChecked] = useState(false)


    return (
        <>
            <div>
                <ParentComponent addComponent={addComponent}>{items} </ParentComponent>
            </div>
        </>

    )
}




//for (let i = 0; i < data2.length; i++) {
//     item.push(<Typography.Text  children={}/>)
// }