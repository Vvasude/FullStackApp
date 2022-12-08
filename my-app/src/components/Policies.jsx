import React from 'react'
import NavBar from './NavBar'
import AcceptableUsePolicy from './AcceptableUsePolicy'
import DMCAPolicy from './DMCAPolicy'
import PrivacyPolicy from './PrivacyPolicy'

//Export Policies function
export default function Policies() 
{

    
    return(
       <div className='Policies'>
        <NavBar/>
        <PrivacyPolicy/>
        <h1>________________________________</h1>
        <AcceptableUsePolicy/>
        <h1>________________________________</h1>
        <DMCAPolicy/>
        <h1>________________________________</h1>
        <h1>Contact Us</h1>
        <p>If you have any questions about these policies, You can contact us:</p>
        <ul>
        <li>By email: office@mycompany.com</li>
        </ul>  
       </div>

    )
}