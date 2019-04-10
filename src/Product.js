import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import {updateProductThunk} from './store'

class Product extends Component{

    constructor(props){
        super(props)
        this.state = this.setFromProduct(this.props.product)
        
    }

    setFromProduct = (product) => {
        return {
            managerId: product.managerId ? product.managerId : '',
        }
    }

    handleChange = ({target}) => {
        this.setState({
            [target.name]: target.value,
        }, ()=>console.log(this.state))
    }

    onSave = (e) =>{
        e.preventDefault()
        this.props.updateProduct(this.props.product, this.state.managerId)
            .then((resp)=>resp.data)
            .then(product=>this.setState({
                managerId: product.managerId,
            }))
    }

    componentDidUpdate(prevProps){
        if(this.props.manager && !prevProps.manager){
          this.setState({
              managerId: this.props.manager.id,
              managerName: this.props.manager.name
          });
        }
    }

    render(){
        const {managers} = this.props
        const {managerId, managerName} = this.state
       
        return(
            <form onSubmit={this.onSave}>
                <label htmlFor='managerId'>{this.props.product.name}</label>
                <br/>
                <select 
                    value={managerId ? managerId : ''}
                    name='managerId'
                    onChange={this.handleChange}
                >
                <option key='none' value=''> --none-- </option>
                {managers.map(manager=>{
                    return(
                        <option key={manager.id} value={manager.id} >{manager.name}</option>
                    )
                })}
                </select>
                <br/>
                <button type='submit'>Save</button>
            </form>
        )   
    }
}

const mapStateToProps = (state) =>{
    return {
        managers: state.managers,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateProduct: (product, managerId)=>dispatch(updateProductThunk(product, managerId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)

  