import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

function Student() {

    const [student, setStudent] = useState([]);

    useEffect(() => { // this useEffect hook is used to fetch data from the server when the component is mounted
        axios
        .get('http://localhost:8081/')
        .then((res)=> setStudent(res.data))
        .catch((err) => console.log(err)); //Log any errors
    }, []) //Empty dependy array, so it runs once mount

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8081/student/${id}`)
        .then(res => {
           console.log(res.data);
           // Mise à jour de la liste des étudiants
           setStudent(student.filter((student) => student.id!== id));
         })
        .catch((error) => {
           console.error(error);
         });
     };
      
  return (
    <div className='d-flex vh-10 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded'>
        <Link to="/create" className='btn btn-success'>Ajouter</Link>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        student.map((data,i) =>(
                            <tr key={i}>
                                <td>{data.name}</td>
                                <td>{data.email}</td>
                                <td>
                                    <Link to={`update/${data.id}`} className='btn btn-primary'>Modifier</Link>
                                    <button className='btn btn-danger ms-2' onClick={()=>handleDelete(data.id)}>Supprimer</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
      
    </div>
  )
}

export default Student
