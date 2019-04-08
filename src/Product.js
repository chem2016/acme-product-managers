import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

class Product extends Component{

    constructor(){
        super()
        this.state = {
            managerId: ''
        }
    }
    
    handleChange = ({target}) => {
        this.setState({
            [target.name]: target.value
        }, ()=>console.log(this.state))
    }

    onSave = (e) =>{
        e.preventDefault()
        console.log(e.target)
        axios.put(`/api/products/${this.props.product.id}`, {...this.props.product, managerId: this.state.managerId})
            .then((resp)=>console.log('from put route ',resp.data))
    }

    // componentDidUpdate(prevProps){
    //     if(this.props.managers && !prevProps.managers){
    //       this.setState(this.props.managers);
    //     }
    // }

    render(){
        const {managers} = this.props
        const {managerId} = this.state
        return(
            <form onSubmit={this.onSave}>
                <label htmlFor='managerId'>{this.props.product.name}</label>
                <br/>
                <select 
                    value={managerId}
                    name='managerId'
                    onChange={this.handleChange}
                >
                <option key='none' value='none'> --none-- </option>
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
        managers: state.managers
    }
}

export default connect(mapStateToProps)(Product)