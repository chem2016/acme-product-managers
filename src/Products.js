import React from 'react'
import { connect } from 'react-redux'
import Product from './Product';


const Products = ({products}) => {
    return (
        <ul>
            {
                products.map(product=>{
                    return (
                        <li key={product.name}>
                            <Product product={product}/>
                        </li>
                    )
                })
            }
        </ul>
    )
}

const mapStateToProps = (state) => (
    {
        products: state.products
    }
)

export default connect(mapStateToProps)(Products)
