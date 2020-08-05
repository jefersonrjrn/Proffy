import React from 'react';

import './styles.css';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

function TeacherItem() {
    return (
        <article className="teacher-item">
            <header>
                <img src="https://avatars2.githubusercontent.com/u/59900069?s=460&u=0966e53d0c8772bf9ba48608a3d276e65f2b1832&v=4" alt="Jeff" />
                <div>
                    <strong>Jeff dos Santos</strong>
                    <span>Física</span>
                </div>

            </header>

            <p>
                Teste Teste
                <br /> <br />
                Teste Teste
            </p>

            <footer>
                <p>
                    Preço/hora:
                    <strong>R$ 20,00</strong>
                </p>
                <button type="button">
                    <img src={whatsappIcon} alt="whatsapp" />
                    Entrar em contato
                </button>
            </footer>
        </article>
    )
}

export default TeacherItem;