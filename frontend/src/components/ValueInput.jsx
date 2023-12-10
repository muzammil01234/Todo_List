import React, { useEffect } from "react";
import axios from 'axios';

import { useState } from "react";


function Input(){
    const [val,changeval]=useState("");
    const [ldata,changeldata]=useState([]);
    const fetchData = async()=>{
        let response=await axios.get("http://localhost:4000/get");
        response=response.data;
        console.log(response);
        changeldata(response);
    }
    useEffect(()=>{
        fetchData();
    },[]);
    const formhandler = async (e)=>{
    
        try{
       let response=await axios.post('http://localhost:4000/form-submit',{content:val});
          console.log(response.data);
          changeval("");
          fetchData();
        }
        catch(error){
            console.log("Error submitting form",error);
        }
       e.preventDefault();
      
    }
    function inputhandler(e){
        changeval(e.target.value);
    }
    async function handlecheck(item){
        item['check']=!item['check'];
        let response =await axios.put(`http://localhost:4000/update/${item['_id']}`,{check:item['check']});
        fetchData();
     }
     async function handledelete (ele){
         let response=await axios.delete(`http://localhost:4000/delete/${ele['_id']}`);
         fetchData();
         
     }
    return (
        <>
        <form className="inputholder">
            
        <input type='text' name="content" value={val} placeholder="Enter your task" onChange={inputhandler} />
        <span ><i className="fa-solid fa-square-plus" onClick={formhandler}></i></span>
        
        </form>
        <div className="Listholder">
         <ul>
            {ldata.map((ele) =>{
                return <li key={ele['_id']} data-id={ele['_id']}><input type="checkbox" checked={ele['check']?true:false} onChange={()=>handlecheck(ele)}/>
                     {ele.content} <span><i class="fa-solid fa-trash-can" onClick={()=>{handledelete(ele)}}></i></span></li>
            })}
         </ul>
        </div>
        </>
    )
    
}
export default Input;