import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';

const UserScreen = () => {


    const [dislableButton, setDislableButton] = useState(true);
    const [user, setUser] = useState('');
    const [usuario, setUsuario] = useState('');
    const [opprtunities, setOpprtunities] = useState('');


    const handleChange = (e) => {
        if (e.target.value.length > 5) {
            setDislableButton(false);
        } else {
            setDislableButton(true);
        }
        setUser(e.target.value)
    }

    const handleSearch = async () => {
        const data = async () => {
            let result = await axios.get(`https://torre.bio/api/bios/${user}`);
            return result;
        }
        try {

            var datos = await data();
            setUsuario(datos.data);
        } catch (error) {
            Swal.fire("Upsss...", "We can't find user..", "error");
            setUsuario('');
        }
    }

    const handleMoreData = async (skillId) => {
        const data = async () => {
            let result = await axios.post('https://search.torre.co/opportunities/_search/', {
                'q': skillId
            });
            return result;
        }
        try {

            var datos = await data();
            console.log(datos.data.results);
            setOpprtunities(datos.data.results);
        } catch (error) {
            Swal.fire("Upsss...", "Opportunitie not found", "error");
            setOpprtunities('');
        }
    }
    return (
        <div className="container">
            <div className="mt-3">
                <input type="text" className="form-control mb-3" onChange={handleChange} value={user} placeholder="Please search here..." />
                <button className="btn btn-primary" onClick={handleSearch} disabled={dislableButton}>Search</button>
                <hr />
            </div>

            {usuario && <div className="mt-3" >
                <div style={{ display: 'flex' }}>
                    <img src={usuario.person.picture} style={{ maxWidth: '10%' }} className="img-fluid me-2" alt="" />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <h2 className="display-5 text-primary">{usuario.person.name}</h2>
                        <p>{usuario.person.professionalHeadline}</p>

                    </div>

                </div>
                <div className="row mt-2">
                    <div className="col-lg-4 col-xs-12">
                        <h3 className="display-6 text-success">Skills</h3>
                        {usuario.strengths.map(skill => {
                            return (
                                <div key={skill.id} onClick={() => handleMoreData(skill.id)}>
                                    <li><a href='#' ><span>{skill.name}</span></a></li>
                                </div>
                            )
                        })}
                    </div>
                    <div className="col-lg-4 col-xs-12">
                        <h3 className="display-6 text-success">Opportunities</h3>
                        <ol>
                            {opprtunities && opprtunities.map(opp => {
                                return (
                                    <div key={opp.id}>
                                        <li><p><span>{opp.objective}</span></p></li>
                                    </div>
                                )
                            })}
                        </ol>
                    </div>

                </div>

            </div>}

        </div>
    )
}

export default UserScreen
