import {useParams} from "react-router-dom";
import data from "../data.js";
import React, {useEffect, useState} from "react";
import supabase from "../config/supabaseClient.js";
const Update = () => {

    const { id } = useParams()
    const data3 = data.getbyID2(id, "trainingsplan")
    const trainingstage =[]


    const addComponent = (userObj) => {
        for (let i = 0; i < userObj.traingstagIDs.length; i++) {
            trainingstage.push(userObj.traingstagIDs[i])
        }

        const data2 = async function () {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [uebungen, setUebungen] = useState(null)
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useEffect(() => {
                const fetchUebungen = async () => {
                    const {data, error} = await supabase
                        .from("trainingstag")
                        .select('uebungIDs')
                        .in('trainingstagID', [3, 2])



                    if (data) {
                        setUebungen(data)
                    }
                }
                fetchUebungen()
            }, [])
            return uebungen
        }



        console.log(data2)
    }


    return (<div> {data3 && data3.length > 0 && data3.map((userObj, index) => (
        <p>{userObj.name}
            <br></br>
            {userObj.traingstagIDs}
            {addComponent(userObj)}
        </p>

    ))}
    </div>)
}

export default Update