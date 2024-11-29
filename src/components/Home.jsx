import { Navigate, useNavigate } from "react-router-dom";
import './styles/Home.css';
// import TextSigno from "./TextSigno.jsx";
import { useState, useEffect } from "react";

function Home({user,iduser}){
    if(user!=="user" || !user){ 
        return <Navigate to="/"/>
    }
    const home = useNavigate();
   
    const [codigo, setcodigo] = useState({
        numero: "",
        usuario: iduser
    });
   
    const [infoTabla, setInfoTabla] = useState([]);
    const [texto, setTexto] = useState("");
   

    function goHome(){
        home("/");
    }

    const AgregarCodigo = (event)=>{

        const {name,value} = event.target;

        setcodigo({...codigo,[name]:value})

        setTexto(" ");

      
      
        
    }

    useEffect(()=>{

        //fetch(`https://parcial2back.vercel.app/v1/signos/traerusuario/${iduser}`, {
            fetch(`http://localhost:4000/v1/signos/traerusuario/${iduser}`, {
            method: 'GET',
            headers: {"Content-Type": "application/json"},
            // body: JSON.stringify(null)
        })
        .then(response => response.json())
                .then(responseData => {
                    
                    if (typeof responseData === "object"){
                        
                        setInfoTabla(responseData);
                    }else{
                        setTexto(responseData);
                        
                    }
                })
       

     },[iduser,infoTabla])

    
    
    async function handleSelect(event){
        event.preventDefault();
        
        if(codigo.numero !== "0" && codigo.numero.trim() !== ""){
            //fetch(`https://parcial2back.vercel.app/v1/signos/codigo`, {
                fetch(`http://localhost:4000/v1/signos/codigo`, {
                method: 'POST',
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({codigo})
            }) 
                .then(response => response.json())
                .then(responseData => {

                    console.log(responseData)
                    if (typeof responseData === "object"){
                        
                        setInfoTabla(prevInfoTabla=> [...prevInfoTabla,responseData]);
                      
                        console.log(infoTabla)
                    }else{
                        setTexto(responseData);
                        
                    }
                })
            } 
            
        }
        useEffect(()=>{

            console.log(infoTabla)
           
    
         },[infoTabla])
    
        
        return (
            <div className="container">
                <div id="txtSeleccionPage"><h3>CARGA TU VIDEO</h3></div>
                <form action=""  onSubmit={handleSelect}>
    
                <label htmlFor="">Codigo</label>
                <input 
                    type="number"  
                    name="numero" 
                    maxlength="3" 
                    min="0" 
                    max="999" 
                    onInput={(e) => {
                        if(e.target.value.length > 3) {
                        e.target.value = e.target.value.slice(0, 3);
                        }
                    }}  
    
                    value={codigo.numero}
    
                    onChange={AgregarCodigo}
    
                />
    
                <input type="submit" name = "agregar"/>
    
                </form>
                <h3>{texto}</h3>
                <button id="btnHome" onClick={goHome}>Home</button>
    
               {/* Mostrar la tabla solo si infoTabla tiene datos */}
               {
                infoTabla.length > 0 && (
                    <table>
                        <thead>
                            <tr>
                                <th>FECHA</th>
                                <th>CÓDIGO</th>
                                <th>PREMIO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Mapeamos todos los registros en el array */}
                            
                            {infoTabla.length > 0 && (infoTabla.map((registro, index) => (
                                <tr key={index}>
                                    <td>{new Date(registro.fecha).toLocaleDateString()}</td>
                                    <td>{registro.codigo}</td>
                                    <td>{registro.premio}</td>
                                </tr>
                            )))}
                        </tbody>
                    </table>
                )
                }
                  
    
                  
            </div>
        )
       
}

export default Home;