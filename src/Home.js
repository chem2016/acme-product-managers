import React, {Component} from 'react'
import { connect } from 'react-redux'
import { fetchProducts } from './store';
// console.log(managerOpenings({ products})); //returns true if there are products without a managerId

class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            openings: true
        }
    }
    componentDidMount(){
        this.props.fetchProducts()
    }
    managerOpenings = (products) =>{
        const openings = products.filter(product=>{
        if(!product.managerId){
            return true
        }
        else{return false}
        })
        if(openings.length){
        return true
        }
        else{return false}
    }


    render(){
        // console.log('in render: ', this.props.products)
        if(this.managerOpenings(this.props.products)){
            return (
                <p>
                    We HAVE openings for Product Managers!
                </p>
            )
        }
        else{
            return (
                <p>
                    We've DONT HAVE openings for Product Managers!
                </p>
            )
        }
        
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        fetchProducts: ()=> dispatch(fetchProducts()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home) 
