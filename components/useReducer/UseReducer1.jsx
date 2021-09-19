import { error } from 'jquery'
import React, { useEffect, useState,useReducer } from 'react'

const initialState = {
    firstNumber:'',
    secondNumber:'',
    total:'',
    action:'plus',
    error:{
        firstNumber:'',
        secondNumber:''
    }

}

const reducer = (state,{type,payload}) => {
   
    switch (type) {
        case 'First':
            
            return {...state,firstNumber: payload}
        case 'Second':
            
            return {...state,secondNumber:payload}
        
        case 'Action':
            return {...state,action:payload}
        
        case 'Submit':
            
            const firstnum = parseInt(state.firstNumber)
            const secondnum = parseInt(state.secondNumber)
            if (!firstnum) {
                return {...state,error:{...error,firstNumber:"Input First Number"}}
            }
            if (!secondnum) {
                return {...state,error:{...error,secondNumber:"Input Second Number"}}
            }
            if(state.action === "minus"){
               const result = firstnum - secondnum
               return {...state,total:result,error:{}}

            }else if(state.action === "plus"){
                const result = firstnum + secondnum
                return {...state,total:result,error:{}}
            }else if(state.action === "multiply"){
                const result = firstnum * secondnum
               return {...state,total:result,error:{}}
            
            }else{
                const result = firstnum / secondnum
                return {...state,total:result,error:{}}
            }
           

    
        default:
            throw new Error();
    }
}

function UseReducer1() {
    
    const [state, dispatch] = useReducer(reducer, initialState)
    const {firstNumber,secondNumber,total,action,error} = state;
    
   const redColor = {
       color:'red'
   }
    
    return (
        <div>
            <p>{JSON.stringify(state)}</p>
            <h1>UseReducer 1</h1>
            <p>Count value: </p>
            <h1>Total : {total}</h1>
            <label>FIrst Number:</label>
            <input type="number" min="0" onChange={(e)=>dispatch({type:'First',payload:e.target.value})} 
                                value={firstNumber}
            
            /> 
            <span style={redColor}>{error.firstNumber}</span>
            <br/>

           
           
            <label>Second Number:</label>
            <input type="number" min="0" onChange={(e)=>dispatch({type:'Second',payload:e.target.value})} 
                                value={secondNumber}
            
            
            /> 
                    <span style={redColor}>{error.secondNumber}</span>
            <br/>
            
            <label>Select Action</label>
            <select value={action} onChange={(e)=>dispatch({type:'Action',payload:e.target.value})}>
                <option value="plus" selected>+</option>
                <option value="minus">-</option>
                <option value="multiply">*</option>
                <option value="divide">/</option>

            </select> <br />

            <button onClick={()=>dispatch({type:'Submit'})}>Submit</button>
          

        </div>
    )
}

export default UseReducer1
