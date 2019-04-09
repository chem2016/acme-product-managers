import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

class Product extends Component{

    constructor(props){
        super(props)
        this.state = this.setFromProduct(this.props.product)
        
    }

    setFromProduct = (product) => {
        return {
            name: product.name ? product.name : '', 
            managerId: product.managerId ? product.managerId : '',
        }
    }

    handleChange = ({target}) => {
        this.setState({
            [target.name]: target.value,
            managerName: this.findManagerById(target.value, this.props.managers).name
        }, ()=>console.log(this.state))
    }

    onSave = (e) =>{
        e.preventDefault()
        // const managerId = this.state.managerId !== '--none--' || this.state.managerId !== '' ? this.state.managerId : null
        axios.put(`/api/products/${this.props.product.id}`, {...this.props.product, managerId: this.state.managerId ? this.state.managerId : null})
            .then((resp)=>resp.data)
            .then(product=>this.setState({
                managerId: product.managerId,
                managerName: this.findManagerById(product.managerId, this.props.managers).name
            }))
    }

    findManagerById = (id, managers) => {
        if(!id){
            return ''
        }
        const selectManager =  managers.filter((manager)=>{
                                    return manager.id == id
                                })
        return selectManager[0]
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

export default connect(mapStateToProps)(Product)

  