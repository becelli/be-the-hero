import React, { useState } from 'react';
import {FiArrowLeft} from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();
    const ongId = localStorage.getItem('ongId');

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };
        // if (data.title === "" || data.description === "" || data.value === "") {
        //     alert("Nenhum dos campos pode estar vazio.");
        // } else if (data.title.length < 5) {
        //     alert("O título não pode ter menos do que 5 caracteres.")
        // } else if (data.description != Number) {
        //     alert("O valor deve ser escrito apenas com algorismos. Ex: 120.")
        // }
        // console.log(data);
        try {
            await api.post('incidents', data,  {
                headers: {
                    Authorization: ongId, 
                }
            })
            history.push('/profile');
        } catch {
            alert("Erro ao cadastrar o caso, tente novamente.")
        }
    }
    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                <img src={logoImg} alt="Logo"/>

                <h1>Cadastrar novo caso</h1>
                <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                
                <Link className="back-link" to="/profile">
                    <FiArrowLeft size={16} color="#E02041"/> 
                    Voltar para seu perfil
                </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Título do Caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea type="email" 
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />

                    <input 
                        placeholder="Valor em Reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
        )
}