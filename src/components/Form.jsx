

import './styles/Form.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Form({ callback, setiduser }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [resultado, setResultado] = useState('');
    const [texto11, setTexto11] = useState(''); // Necesitas inicializar este estado
    
    const navigate = useNavigate();

    const registra = () => {
        navigate('/registro');
    };

    const restablecerPassword = () => {
        navigate('/restablecer');
    };

    const validateUser = async (event) => {
        event.preventDefault();
      
        try {
            const res = await fetch('http://localhost:4000/v1/signos/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const responseData = await res.json();
            setResultado(responseData);

            const { usuario, id } = responseData;

            if (usuario === 'user') {
                setiduser(id);
                callback('user');
                navigate('/userHome');
            } else if (usuario === 'admin') {
                callback('admin');
                navigate('/adminHome');
            } else if (responseData === 'usuario o contaseña invalida') {
                setTexto11(responseData);
            }
        } catch (error) {
            console.error('Error al validar el usuario:', error);
            setTexto11('Error en la conexión');
        }
    };

    return (
        <form id="form1" onSubmit={validateUser}>
            <h1 id="txtBienvenida">Bienvenido - YouFree</h1>
            <h1 id="txtBienvenida">Aqui puedes cargar tu video</h1>
            <h4 className="txt">Nombre de Usuario</h4>
            <input type="text" className="entry" onChange={(e) => setUsername(e.target.value)} /><br></br>
            <h4 className="txt">Contraseña</h4>
            <input type="password" className="entry" onChange={(e) => setPassword(e.target.value)} /><br></br>
            <h6 id="texto">{texto11}</h6>
            <input type="submit" value="Ingresar" id="btnEnviar" />
            <button type="button" onClick={registra}>Registrate</button>
            
        </form>
    );
}

export default Form;

