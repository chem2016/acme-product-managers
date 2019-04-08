import React from 'react'
import { connect } from 'react-redux'
//  console.log(findManagers({ users, products})); //returns users moe and larry

const Managers = ({managers}) =>{
    return (
        <div>
            <ul>
                {managers.map(manager=>(
                    <li key={manager.name}> {manager.name}</li>
                ))}
                
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        managers: state.managers
    }
}

export default connect(mapStateToProps)(Managers) 