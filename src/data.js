import supabase from "./config/supabaseClient.js";
import {useEffect, useState} from "react";
import uebungenCard from "./components/UebungenCard.js";

class Data {

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

    getbyID(id, kategorie,table) {
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


    async post(Name, Kategorie) {

        const {data, error} = await supabase
            .from('uebungen')
            .insert([{Name, Kategorie}])

        if (error) {
            console.log(error)
        }
        if (data) {
            console.log(data)
        }
    }

    async update(Name, Kategorie, id) {

        const {data, error} = await supabase
            .from("uebungen")
            .update([{Name, Kategorie}])
            .eq('id', id)
    }
}

const data = new Data();

export default data
