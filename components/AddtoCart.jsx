import React, { useState } from 'react'
import logo from '../logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart,faPlus,faMinus,faTrash } from '@fortawesome/free-solid-svg-icons'

const   AddtoCart = () => {
    const [qty,setQty] = useState(1)
   
    const [navbarcount,setNavbarCount] =  useState(0)
    const[products,setProduct] = useState([{id:1,name:'Orange',qty:0},{id:2,name:'Apple',qty:0},{id:3,name:"Pine",qty:1}])
    const  handleAtc = (product) => {
        // console.log("Handle ATC",id)
        // const gg = products.filter(p => p.id === product)
        // console.log(gg)
         //setNavbarCount(navbarcount => navbarcount + 1)
        
       
        const index = products.indexOf(product);
       
         products[index] = { ...product };
        
        products[index].qty++;
       
        setProduct([...products]);

    }

    const handleQtyUpdate= (product) =>{
        //console.log("Main Qty Update",product)
        const index = products.indexOf(product);
        
        products[index] = { ...product };
        
        products[index].qty++;
        
        setProduct([...products]);
    }

    const handleQtyReduce= (product) =>{
    //   console.log("Main qty reduce",product)
      const index = products.indexOf(product);
       
        products[index] = { ...product };
        
        products[index].qty--;
        
        setProduct([...products]);
    }

    const  handleTrash= (product) => {
        const filterProducts = products.filter(p => p.id !== product.id)

        setProduct(filterProducts)
    }

    //form submit
    const handleProductAdd = (data) =>{
    //    setProduct([...produ])
        console.log(data)
        setProduct([...products,data])
    } 
    
    return (
        <div>
            <Navbar count={products.filter(p => p.qty > 0).length} products={products} 
                                                onPlus={handleQtyUpdate} 
                                                onMinus={handleQtyReduce}
                                                onTrash={handleTrash}
            />
             {/* {isShwoing ? <ViewAddtoCart /> :null} */}
            <div className="main">
                <div className="product-card">
                {products.map(p => <Product key={p.id} product={p}
                                            OnATC={handleAtc}
                                            />)}
                </div>
                
                    <Form length={products.length} onProductAdd={handleProductAdd}  />
               
            </div>
        </div>
       
    )
}


export default AddtoCart


const  Navbar = (props) => {
    const [showCart,setShowCart] = useState(false)

    const handleCartClick = () => {
        console.log("Cart CLick")
        setShowCart(!showCart)
        
    }
     const handleQtyUpdate= (product) =>{
        props.onPlus(product)
    }

    const handleQtyReduce= (product) =>{
       props.onMinus(product)
    }
    const  handleTrash= (product) => {
        props.onTrash(product)
    }
    return (
        <div>
            <div className="navbar">
                <div className="logo">
                    <img className="logo-img" src={logo} />
                </div>
                <div className="right">
                    <ul>
                        <li><a href="#">Home </a></li>
                        <li><a href="#">Product </a></li>
                        <li><a href="#" onClick={handleCartClick}>Cart <span className="text-primary"><FontAwesomeIcon icon={faShoppingCart} /></span> <span className="badge">{props.count}</span> </a></li>

                        <li><a href="#">Service </a></li>
                        <li><a href="#">About </a></li>
                        <li><a href="#">Contact </a></li>

                        
                    </ul>
                </div>
            </div>
            {showCart ? <ViewAddtoCart products={props.products} onPlus={handleQtyUpdate} 
            onMinus={handleQtyReduce}  onTrash={handleTrash}/>:null} 
           
        </div>
    )
}



const Product = (props) => {
    
    const [qty,setQty] = useState(1)
    const[product,setProduct] = useState({id:props.product.id,name:props.product.name,qty:props.product.qty})

    const handleAtc = (id) => {
       
        setQty(qty => qty + 1)
        setProduct({...product,qty:qty})
        props.OnATC (props.product)
       
    }
    
    return (
        <div>
                {/* {JSON.stringify(product)} */}
                <div className="card-item">
                    <h1>{product.name}</h1>
                    <button className="add-to-cart-btn" onClick={()=>handleAtc(props.product.id)}>Add to cart</button>
                </div>
               
            
        </div>
    )
}


const ViewAddtoCart = (props) => {
    const handleQtyUpdate= (product) =>{
        props.onPlus(product)
    }

    const handleQtyReduce= (product) =>{
       props.onMinus(product)
    
    
    }
    const  handleTrash= (product) => {
        props.onTrash(product)
    }
    return (
        <div>
            
            <p>View Add to Cart</p>
            <table className="table"> 
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Qty</th>
                        <th>Operation</th>
                     

                    </tr>
                </thead>
                <tbody>
                    {props.products.map(p => 
                    <tr key={p.id}>
                        <td>{p.id}</td>
                        <td>{p.name}</td>
                        <td><button onClick={()=>handleQtyUpdate(p)}><FontAwesomeIcon icon={faPlus} /></button>{p.qty} 
                            {p.qty <= 0 ? <button className="btn btn-danger btn-sm"><FontAwesomeIcon icon={faMinus} /></button>:  <button onClick={()=>handleQtyReduce(p)}><FontAwesomeIcon icon={faMinus} /></button>}
                           
                        </td>
                        <td><button onClick={()=>{handleTrash(p)}}>< FontAwesomeIcon icon={faTrash}/></button></td>
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}


const Form = (props) => {
    const [product,setProduct] = useState(
        {name:'',qty:'',error:{
            name:'',
            qty:'',
            
        }}
    )
    const HandleOnSubmit = (e) => {
        e.preventDefault()
        let submitted_data = {
            id:props.length +1,    
            name:product.name,
            qty:product.qty,
           
        }
        if(submitted_data.name === ''){
            setProduct({...product,error:{name:"Name is required"}})
        } else if (submitted_data.qty === ''){
            setProduct({...product,error:{qty:"Qty is required"}})
        }
        else {
            props.onProductAdd(submitted_data)
            setProduct({name:'',qty:'',error:{name:'',qty:''}})
        }


    }

    

    return (
        
        <div className="card w-50 mx-auto mt-5">
        <div className="card-header">
            <h5>Product Management Form</h5>
           
            
            
        </div>
        <div className="card-body">
            <form action="" onSubmit={HandleOnSubmit} >
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={product.name} onChange={(e)=>setProduct({...product,name:e.target.value})} placeholder="Enter Name" className="form-control"/>
                    <span style={{color:'red'}}>{product.error.name}</span>
                </div>
                <div className="form-group">
                    <label htmlFor="qty">Qty</label>
                    <input type="number" name="qty" value={product.qty} onChange={(e)=>setProduct({...product,qty:e.target.value})} placeholder="Enter Qty" className="form-control"/>
                    <span style={{color:'red'}}>{product.error.qty}</span>
                </div>
                <span style={{color:'red'}}>{product.error.qty}</span>
               
                {product.qty <= 0 ?  ( <input type="submit" className="btn btn-secondary btn-block" disabled />
                ) :<input type="submit" className="btn btn-secondary btn-block" />}
            </form>
        </div>
    </div>
   
    )
}






