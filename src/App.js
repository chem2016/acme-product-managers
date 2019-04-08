import React, { Component } from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import { connect } from 'react-redux'
import Nav from './Nav';
import Home from './Home';
import Managers from './Managers';
import Products from './Products';
import { fetchProducts, fetchManagers } from './store';

class App extends Component{
    componentDidMount(){
        this.props.fetchProducts()
        this.props.fetchManagers()
    }
    render(){
        return(
            <Router>
                <h1>Acme Product Managers</h1>
                <Route render={({location})=><Nav location={location}/>}/>
                <Route exact path='/' render={()=><Home />}/>
                <Route exact path='/users' render={()=><Managers />}/>
                <Route exact path='/products' render={()=><Products />}/>
            </Router>
        )
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        fetchProducts: ()=> dispatch(fetchProducts()),
        fetchManagers: ()=> dispatch(fetchManagers())
    }
}


export default connect(null,mapDispatchToProps)(App)

