import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';


function UpdateStudent() {

  const [name, setName] = useState ('')

  const [email, setEmail] = useState('')

  const navigate = useNavigate();
  const {id} = useParams();

  function handleSubmit(event){
    event.preventDefault();
    axios.put(`http://localhost:8081/update/${id}`, {name, email})
    .then(res => {
      console.log("Updated Student", res)
      navigate('/');
    })
  }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={handleSubmit}>
            <h2>Modifier un Etudiant</h2>
            <div className='mb-2'>
                <label htmlFor=''>Nom</label>
                <input type='text' placeholder='Entrez votre nouveau nom' className='form-control' onChange = {e => setName(e.target.value)}></input>
            </div>
            <div className='mb-2'>
                <label htmlFor="">Email</label>
                <input type="email" placeholder='Entrez votre nouvel email' className= "form-control" onChange = {e => setEmail(e.target.value)}></input>
            </div>
            <button className='btn btn-sucess'> Enregistrer </button>
        </form>
      </div>
    </div>
  )
}

export default UpdateStudent