import React, { Component } from 'react';
import ProductService from './ProductService';
import axios from 'axios'

class ListProducts extends Component {

    constructor()
    {
        super();
        this.state = {
            products:[],
            id:0,
            name:"",
            description:"",
            price:""

        }
    }

    componentDidMount()
    {
        ProductService.getProducts().then((res)=>
        {
            this.setState({products: res.data, 
                id:0,
                name:"",
                description:"",
                price:""})
        }
        )      
    }
    
    delete(id)
    {
        ProductService.deleteProd(id).then((res)=>
        {
            this.componentDidMount();
        }

        )
    }

    submit(event,id)
    {
        event.preventDefault();
        if(id === 0)
        {
            axios.post("http://localhost:8080/addProduct",{
                productName: this.state.name,
                productDescription: this.state.description,
                productPrice: this.state.price
            }).then((res)=>{
                this.componentDidMount();
            })
        }
        else
        {
            axios.put("http://localhost:8080/updateProduct",{
                id:this.state.id,
                productPrice: this.state.price
            }).then((res)=>{
                this.componentDidMount();
            })
        }
      

    }

    render() {
        return (
            <div className="container">
                <div >
                    <form onSubmit={(e)=> this.submit(e,this.state.id)}>
                        <div className="form-group">
                            <label >Product Name</label>
                            <input onChange ={(e)=> this.setState({name:e.target.value})}value ={this.state.name} type="text" className="form-control"   placeholder="Product Name"/>
                        </div>
                        <div className="form-group">
                            <label >Product Description</label>
                            <input onChange ={(e)=> this.setState({description:e.target.value})} value ={this.state.description} type="text" className="form-control"  placeholder="Description"/>
                        </div>
                        <div className="form-group">
                            <label >Product Price</label>
                            <input onChange ={(e)=> this.setState({price:e.target.value})}value ={this.state.price}type="text" className="form-control"  placeholder="Price"/>
                        </div>
                        <div className="form-group">
                            <label >Product ID</label>
                            <input onChange ={(e)=> this.setState({id:e.target.value})}value ={this.state.id}type="text" className="form-control"  placeholder="ID"/>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
                <h2 className= "text-center">Product List</h2>
                <div className ="row">
                    <table className="table table-striped table-bordered">
                        <tbody>
                            <tr>
                                <th>Product Name</th>
                                <th>Product Description</th>
                                <th>Product Price</th>
                                <th>Delete Product</th>
                            </tr>
                        </tbody>
                        <tbody>
                            {
                                this.state.products.map(
                                    products=>
                                    <tr key ={products.id}>
                                        <td>{products.productName}</td>
                                        <td>{products.productDescription}</td>
                                        <td>{products.productPrice}</td>
                                        <td><button onClick= {(e)=> this.delete(products.id)} type="button" className="btn btn-primary">Delete</button></td>
                                    </tr>
                                )
                            }
                        </tbody>
                        
                    </table>

                </div>
                
            </div>
        );
    }
}

export default ListProducts;