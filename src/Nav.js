import React from 'react'
import { Link } from 'react-router-dom'

const Nav = ({location: {pathname}}) => {
    const Links = [
        {to: '/', title: 'Home'},
        {to: '/products', title: 'Products'},
        // {to: '/users', title: `Managers${managers.length}`},
        {to: '/users', title: `Managers`},
    ]

    return (
        <ul className='nav nav-tabs' style={{ marginBottom: '10px'}}>
            {
                Links.map(link=>{
                    return(
                        <li key={link.title} >
                            <Link to={ link.to } className={ `nav-link${pathname=== link.to ? ' active': ''}` }>{ link.title }</Link>
                        </li>
                    )
                })
            }
        </ul>
    )

}


export default Nav