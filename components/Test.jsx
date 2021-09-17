import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faTrash,faArrowCircleUp,faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons'
import { ConsoleWriter } from 'istanbul-lib-report';






const  Test = (props)=> {
    const [contacts,setContact] = useState([
        {id:1,name:"John",email:"john@gmail.com",phone:12345},
        {id:2,name:"Doe",email:"doe@gmail.com",phone:77777},
        {id:3,name:"Smith",email:"smith@gmail.com",phone:77777},
        
    ])
    const  handleDelete = (id) => {
            let finalData= contacts.filter(c => c.id !== id)
            setContact(finalData) 
    }

    const handleUpdate = (edited_data) => {
        let finalData = contacts.map(function(c){
            if(c.id === edited_data.id){
                
                return edited_data
            }
            return c

        })
        setContact(finalData)
       
    }

    const HandleOnSubmit = (data) => {
        setContact([...contacts,data])
    }

    return (
        <div>
            <p>Welcome back {props.name}</p>
           <h1>Hello World </h1>
           <Form onHandleSubmit={HandleOnSubmit} length={contacts.length} /> 
           {contacts.map(c => <Contacts key={c.id} 
                                        contacts={c}
                                         onhandleDelete = {handleDelete}
                                         onhandleUpdate={handleUpdate}/>)}
            
        </div>
    )
}

export default Test




const Form = (props) => {
    const [contact,setContact] = useState(
        {name:'',email:'',phone:'',error:{
            name:'',
            phone:'',
            email:''
        }}
    )
    const HandleOnSubmit = (e) => {
        e.preventDefault()
        let submitted_data = {
            id:props.length +1,    
            name:contact.name,
            email:contact.email,
            phone:contact.phone
        }
        if(submitted_data.name === ''){
            setContact({...contact,error:{name:"Name is required"}})
        } else if (submitted_data.email === ''){
            setContact({...contact,error:{email:"Email is required"}})
        } else if (submitted_data.phone === ''){
            setContact({...contact,error:{phone:"Phone is required"}})
        }else {
            props.onHandleSubmit(submitted_data)
            setContact({name:'',email:'',phone:'',error:{name:'',phone:'',email:''}})
        }


    }

    return (
        
        <div className="card w-50 mx-auto mt-5">
        <div className="card-header">
            <h5>Contact Management Form</h5>
           
            {/* <h5>{JSON.stringify(contact)}</h5> */}
            
        </div>
        <div className="card-body">
            <form action="" onSubmit={HandleOnSubmit} >
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={contact.name} onChange={(e)=>setContact({...contact,name:e.target.value})} placeholder="Enter Name" className="form-control"/>
                    <span style={{color:'red'}}>{contact.error.name}</span>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" value={contact.email}onChange={(e)=>setContact({...contact,email:e.target.value})} placeholder="Enter EmailPhone" className="form-control"/>
                    <span style={{color:'red'}}>{contact.error.email}</span>
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input type="text" name="phone" value={contact.phone} onChange={(e)=>setContact({...contact,phone:e.target.value})}  placeholder="Enter Phone" className="form-control"/>
                    <span style={{color:'red'}}>{contact.error.phone}</span>
                </div>
                <input type="submit" className="btn btn-secondary btn-block"/>
            </form>
        </div>
    </div>
   
    )
}




const Contacts = ({contacts,onhandleDelete,onhandleUpdate})=> {
    
    const[isShowing,setisShowing] = useState(false)
    const[isEditing,setisEditing] = useState(false)
   //for Editing //Setting Contact
    const[contact,setContact] = useState(
        {id:contacts.id,name:contacts.name,email:contacts.email,phone:contacts.phone}
       )
    let handleisShowing = () => {
        setisShowing(!isShowing)

    }

    let handleDelete = () => {
      
        onhandleDelete(contacts.id)
    }

    let handleEdit = () => {
      
        setisEditing(!isEditing)
        
    }
    let onUpdateSubmit = (e) => {
        e.preventDefault()
        
        let editted_data = {
            id:contacts.id,
            name:contact.name,
            email:contact.email,
            phone:contact.phone
        }
       
        onhandleUpdate(editted_data)
        setisEditing(false)
        
    }

    const ToogleIsshowing = isShowing ? <FontAwesomeIcon icon={faArrowCircleUp} /> : <FontAwesomeIcon icon={faArrowAltCircleDown} />
    
    if(isEditing){
        
        
        return(
            <div className="card w-50 mx-auto mt-5">
            <div className="card-header">
                <h5>Contact Management Form</h5>
                {/* <h5>{JSON.stringify(contact)}</h5> */}
                
            </div>
            <div className="card-body">
                <form action="" onSubmit={onUpdateSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" value={contact.name} onChange={(e)=>setContact({...contact,name:e.target.value})} placeholder="Enter Name" className="form-control"/>
                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email"  onChange={(e)=>setContact({...contact,email:e.target.value})} value={contact.email} className="form-control" placeholder="Enter Email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input type="text" name="phone" onChange={(e)=>setContact({...contact,phone:e.target.value})} value={contact.phone} placeholder="Enter Phone" className="form-control"/>
                       
                    </div>
                    <input type="submit" value="Update" className="btn btn-secondary btn-block"/>
                </form>
            </div>
        </div>
        )
    }
   
    return (
        <div>
            
            <div className="card w-50 mx-auto mt-5">
               
                <h4 className="card-header" >

                   
                    
                    <span onClick={handleisShowing}> {ToogleIsshowing}</span>
                    {contacts.name}
                    <div className="float-right">
                                <div>
                                  <span className="float-right" onClick={handleEdit}><FontAwesomeIcon icon={faEdit} /></span>
                                  <span className="float-right"  onClick={handleDelete}><FontAwesomeIcon icon={faTrash} /></span>
                                </div> 
                              
                    </div>
                </h4>
                {isShowing ? (
                    <div className="card-body">
                    <h5 className="card-title">Phone: {contacts.phone}</h5>
                    <p className="card-text">Email :{contacts.email}</p>
                    
                </div>
                ):null}
            </div>
        </div>
    )
}


