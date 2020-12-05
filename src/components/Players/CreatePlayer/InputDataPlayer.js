import React from "react";

export default function InputDataPlayer({ nameLabel, idInput, valueInput, typeInput, actionInput}) {
    return (
        <div className="form-joueur_container-input">
        <span className="form-joueur_label">{nameLabel}</span>
            <input
                type={typeInput}
                id={idInput}
                value={valueInput}
                onChange={actionInput}
            />
        </div>
    )
}