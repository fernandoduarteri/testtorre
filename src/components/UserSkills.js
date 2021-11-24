import axios from 'axios';
import React, { useEffect, useState } from 'react'

const UserSkills = (props) => {
    const { user } = props;
    const [usuario, setUsuario] = useState('')

   

    return (
        <div className="container mt-2">

            <img src={usuario.person.picture} className="img-fluid" alt=""/>




        </div>
    )
}

export default UserSkills
