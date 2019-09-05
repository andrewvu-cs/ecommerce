import React from 'react';

import SignIn from '../../components/SignIn/SignIn.component';
import SignUp from '../../components/SignUp/SignUp.component';

import './SignInSignUp.styles.scss';

const SignInAndSignUp = () => (
    <div className='sign-in-sign-up'>
        <SignIn/>    
        <SignUp/>
    </div> 
)

export default SignInAndSignUp;