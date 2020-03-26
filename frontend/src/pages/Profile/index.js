import React, {  useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import {FiPower, FiTrash2 } from 'react-icons/fi';
import './styles.css';
import logoImg from '../../assets/logo.svg';


export default function Profile() {
    const [incident, setIncidents] = useState([]);

    const history = useHistory();
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');
    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);
    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            })

            setIncidents(incident.filter(incident => incident.id !== id))
            console.log(incident);
            if (incident === {}) {
                return (<p>Não há casos.</p>);
            };
        } catch (err) {
            alert('Erro ao excluir o caso, tente novamente')
        }
    }
    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }
    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Logo" />
                <span>{ongName}, seja bem-vinda!</span>

                <Link className="button" to="incidents/new">Cadastrar novo caso</Link>
                <button>
                    <FiPower size={32} color="#E02041" onClick={handleLogout} />
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {incident.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>
                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>
                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                        <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                            <FiTrash2 size={22} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}