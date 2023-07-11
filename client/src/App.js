import {useState, useEffect} from 'react'
import './App.css';
import Axios from 'axios' ;

function App() {
  const [foodName, setFoodName] = useState("") ;
  const [updateFood, setUpdFood] = useState("") ;
  const [days, setDays] = useState(0) ;
  const [newDays, setNewDays] = useState(0) ;
  const[data,setData] = useState([]) ;

  useEffect(()=>{
    Axios.get('/read').then((res)=>{
      setData(res.data)
    })
  },[data])

  const add = async ()=>{
  await  Axios.post('/insert',{
      foodName: foodName ,
      days: days
    } )
    setFoodName("") 
    setDays(0)
  }

  const update = async (id)=>{
     Axios.put("/update",{
      id: id,
      newFoodName: updateFood,
      newNum: newDays
     })
  }

  const deletE = async (id)=>{
    Axios.delete(`/delete/${id}`)
  }


  return (
   <>
   
   <div className='mern'>
      
      <h1 >MERN CRUD</h1>
      
      <div>
      <label>Food Name : </label>
      <input value={foodName} onChange={(e)=>{setFoodName(e.target.value)}} type="text" />
      </div>
      <div>
      <label>Days since you ate it : </label>
      <input value={days} onChange={(e)=>{setDays(e.target.value)}} type="number" />
      </div>
      <button onClick={add} >Add to List</button>

      <div>
        {
          data.map((e)=>(
            <div className='data'>
              <div>{e.foodName}</div>
              <div>{e.daysSinceIAte}</div>
              <input onChange={(el)=>setUpdFood(el.target.value)} placeholder='New Food' type="text" />
              <input onChange={(el)=>setNewDays(el.target.value)} placeholder='New Days' type="text" />
              <button onClick={()=>{update(e._id)}}>Update</button>
              <button onClick={()=>{deletE(e._id)}} >Delete</button>
            </div>
          ))  
        } 
      </div>

   </div>
   
   
   </>
  );
}

export default App;
