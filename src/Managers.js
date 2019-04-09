import React, {Component} from 'react'
import { connect } from 'react-redux'
import { fetchProducts, fetchManagers } from './store';

class Managers extends Component {
    constructor(props){
        super(props)
        this.state = {
            managers: [],
            products: []
        }
    }

    // should i use component did update? 
    componentDidMount(){
        this.props.fetchProducts()
            .then(()=>this.setState({
                products: this.props.products
            }))
        this.props.fetchManagers()
            .then(()=>this.setState({
                managers: this.props.managers
            }))
    }

    findManagers = ( users, products) => {
        const managerIds = products.filter(p=>{
          return p.managerId
        }).reduce((acc, product)=>{
          if(!acc.includes(product.managerId)){
            acc.push(product.managerId)
          }
          return acc
        },[])
        const currentManagers = users.filter(user=>{
          if(managerIds.includes(user.id)){
            return true
          }
          else{
            return false
          }
        })
    
        return currentManagers.map(manager=>manager.name)
    }
    
    render(){
        const {managers, products} = this.props
        let currentManagers = []
        if(managers.length){
            currentManagers = this.findManagers(managers, products)
        }
        return (
            <div>
                <ul>
                    {currentManagers.map((manager,idx)=>(
                        <li key={idx}> {manager}</li>
                    ))}
                    
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        managers: state.managers, 
        products: state.products
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        fetchProducts: ()=> dispatch(fetchProducts()),
        fetchManagers: ()=> dispatch(fetchManagers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Managers) 