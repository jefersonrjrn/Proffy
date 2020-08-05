import React from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';

import './styles.css';

// interface: usado para definir o formato das tipagens de um objeto
interface PageHeaderProps {
    title: string; // Esse valor é obrigatório
    // title?: string => Esse valor não é obrigatório
}

// PageHeader é uma função componente do react; <Parâmetro>
// Ou seja: tenho uma função PageHeader que é uma function component do react que recebe como parâmetro PageHeaderProps
const PageHeader: React.FC<PageHeaderProps> = (props) => {
    return (
        <header className="page-header">
            <div className="top-bar-container">
                <Link to="/">
                    <img src={backIcon} alt="Voltar" />
                </Link>
                <img src={logoImg} alt="Proffy" />
            </div>

            <div className="header-content">
                <strong>{props.title}</strong>

                {props.children}
            </div>
        </header>
    );
}

export default PageHeader;