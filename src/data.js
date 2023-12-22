import supabase from "./config/supabaseClient.js";
import {useEffect, useState} from "react";
import uebungenCard from "./components/UebungenCard.js";

class Data {



    getImagesfromStorage(table) {

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [fetchError, setFetchError] = useState(null)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [image, setImage] = useState(null)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            const fetchUebungen = async () => {
                const {data, error} = await supabase
                    .storage
                    .from('images')
                    .download('Beinpresse.PNG')


                if (error) {
                    setFetchError('Could not fetch the exercises')

                }
                if (data) {
                    setImage(data)
                    setFetchError(null)
                }
            }
            fetchUebungen()
        }, [])
        return image

    }

    //Liefert alle Übungen
    get(table) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [fetchError, setFetchError] = useState(null)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [uebungen, setUebungen] = useState(null)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            const fetchUebungen = async () => {
                const {data, error} = await supabase
                    .from(table)
                    .select()



                if (error) {
                    setFetchError('Could not fetch the exercises')

                }
                if (data) {
                    setUebungen(data)
                    setFetchError(null)
                }
            }
            fetchUebungen()
        }, [])


        return uebungen
    }


    getTrainingsplan(id) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [fetchError, setFetchError] = useState(null)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [uebungen, setUebungen] = useState(null)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            const fetchUebungen = async () => {
                const {data, error} = await supabase
                    .from("trainingsplan")
                    .select()
                    .match({userID: id})



                if (error) {
                    setFetchError('Could not fetch the exercises')

                }
                if (data) {
                    setUebungen(data)
                    setFetchError(null)
                }
            }
            fetchUebungen()
        }, [])


        return uebungen
    }

    getbyID(id, kategorie, table) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [fetchError, setFetchError] = useState(null)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [uebungen, setUebungen] = useState(null)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            const fetchUebungen = async () => {
                const {data, error} = await supabase
                    .from(table)
                    .select()
                    .match({uebungID: id, Kategorie: kategorie})


                if (error) {
                    setFetchError('Could not fetch the exercises')
                    setUebungen(null)
                }
                if (data) {
                    setUebungen(data)
                    setFetchError(null)
                }
            }
            fetchUebungen()
        }, [])


        return uebungen
    }


    getbyID2(id, table) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [fetchError, setFetchError] = useState(null)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [uebungen, setUebungen] = useState(null)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            const fetchUebungen = async () => {
                const {data, error} = await supabase
                    .from(table)
                    .select()
                    .match({trainigsplanID: id})


                if (error) {
                    setFetchError('Could not fetch the exercises')

                }
                if (data) {
                    setUebungen(data)
                    setFetchError(null)
                }
            }
            fetchUebungen()
        }, [])


        return uebungen
    }

    getbyUbung2(uebung) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [fetchError, setFetchError] = useState(null)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [uebungen, setUebungen] = useState(null)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const fetchUebungen = async () => {
            const {data, error} = await supabase
                .from("uebungen")
                .select("uebungID")
                .match({Name: uebung})

            if (data) {
                setUebungen(data)
            }

        }
        fetchUebungen()


        return uebungen
    }

    getbyUbung(table, uebung) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [fetchError, setFetchError] = useState(null)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [uebungen, setUebungen] = useState(null)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            const fetchUebungen = async () => {
                const {data, error} = await supabase
                    .from(table)
                    .select("Kurzname")
                    .match({Name: uebung})


                if (error) {
                    setFetchError('Could not fetch the exercises')

                }
                if (data) {
                    setUebungen(data)
                    setFetchError(null)
                }
            }
            fetchUebungen()
        }, [])


        return uebungen
    }



    getTrainingstag(id){
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [fetchError, setFetchError] = useState(null)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [uebungen, setUebungen] = useState(null)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            const fetchUebungen = async () => {
                const {data, error} = await supabase
                    .from('trainingstag')
                    .select('Tagesbezeichung, uebungIDs')
                    .match({trainingsplanID: id})


                if (error) {
                    setFetchError('Could not fetch the exercises')

                }
                if (data) {
                    setUebungen(data)
                    setFetchError(null)
                }
            }
            fetchUebungen()
        }, [])


        return uebungen
    }

    getUebungen(id){
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [fetchError, setFetchError] = useState(null)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [uebungen, setUebungen] = useState(null)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            const fetchUebungen = async () => {
                const {data, error} = await supabase
                    .from('uebungen')
                    .select('Name, Kategorie, Beschreibung')
                    .match({uebungID: id})


                if (error) {
                    setFetchError('Could not fetch the exercises')

                }
                if (data) {
                    setUebungen(data)
                    setFetchError(null)
                }
            }
            fetchUebungen()
        }, [id])


        return uebungen
    }


    async postTrainingsplan(array, trainingsplanname, userID) {
        let uebungsIDs
        let tagesbezeichnung
        let iserror = false

        const {data2, error} = await supabase
            .from('trainingsplan')
            .insert({name: trainingsplanname, userID: userID})
            .select()


        console.log(data2)


        if (error == null) {
            const {data, error2} = await supabase
                .from("trainingsplan")
                .select("trainingsplanID")
                .match({name: trainingsplanname})

            if (error2 == null) {
                for (let i = 0; i < array.length; i++) {
                    uebungsIDs = array[i][1]
                    tagesbezeichnung = array[i][0]


                    const {error} = await supabase
                        .from('trainingstag')
                        .insert([{
                            trainingsplanID: data[0].trainingsplanID,
                            uebungIDs: uebungsIDs,
                            Tagesbezeichung: tagesbezeichnung
                        }])
                }
            } else {
                iserror = true
            }


        } else {
            iserror = true
        }
        return iserror

    }

    async postbenutzer(firstname, lastname,passwort, email ) {
        const {data2, error} = await supabase
            .from('benutzer')
            .insert({Vorname: firstname,Nachname:lastname,Kennwort:passwort,Email:email})
            .select()
    }




    async update(Name, update) {

        const {data2, error2} = await supabase
            .from("trainingsplan")
            .update([{selected: 'FALSE'}])
            .eq('selected','TRUE')

        const {data, error} = await supabase
            .from("trainingsplan")
            .update([{selected: update}])
            .eq('name', Name)


    }

    async deleteTrainingsplan(id) {

        const {error2} = await supabase
            .from('trainingstag')
            .delete()
            .eq('trainingsplanID', id)

        const {error} = await supabase
            .from('trainingsplan')
            .delete()
            .eq('trainingsplanID', id)




    }


}


const
    data = new Data();

export default data
