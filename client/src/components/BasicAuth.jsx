import React, {useState} from 'react'
import CustomSwitch from './CustomSwitch';
import Login from './Login';
import Signup from './Signup';
const BasicAuth = () => {
    const [card,setCard] = useState('Login');
    return (
        <div className='flex flex-col items-center justify-center'>
            <CustomSwitch currOption={card} setOption={setCard} options={['Login','Signup']}/>
            {card==='Login' ? <Login/> : <Signup/>}
        </div>
    )
}

export default BasicAuth;