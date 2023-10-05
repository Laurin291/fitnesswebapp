const UebungenCard = ({ uebung }) => {

    console.log("12344")
    return (
        <div className="uebung-card">
            <h3>{uebung.Name}</h3>
            <p>{uebung.Kategorie}</p>
        </div>
    )
}

export default UebungenCard