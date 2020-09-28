import React from 'react';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import history from '../../history';
import { authUser } from '../../store/user/actions';
import * as yup from 'yup';

import { useSelector } from 'react-redux';
import { isAuthorised } from '../../store/user/geters';


import Logo from '../../components/common/image';
import './login.scss';

type FormData = {
    email: string;
    password: string;
};

const LoginSchema = yup.object().shape({
	email: yup
		.string()
		.email()
		.required(),
	password: yup.string().min(8),
});

const Login: React.FC = () =>{
	const dispatch = useDispatch();
	const isAuth = useSelector(isAuthorised);
	const { register, handleSubmit, errors } = useForm<FormData>({
		validationSchema: LoginSchema,
	});

	useEffect(()=>{
		if(isAuth){
			history.push('/dashboard');

		}
	}, []);

	const submitLogin = handleSubmit(({ email, password }) => {
		console.log(email, password, errors);
		dispatch(authUser(true));
		history.push('/dashboard');
	});

	return <div className={'loginPage'}>
		<div className={'container'}>
			<div className={'loginFormWrapper'}>
				<Logo url={'/csgmblack.png'} width={'200px'} alt={'csgm'}/>
				<form onSubmit={submitLogin}>
					<div className={'customForm-group'}>
						<label form={'emailLogin'} >Login</label>
						<input name="email" type={'email'} ref={register}  id={'emailLogin'} className={'customForm-control'}/>
						{errors.email && <p>{errors.email.message}</p>}
					</div>
					<div className={'customForm-group'}>
						<label form={'loginPassword'}>Password</label>
						<input name="password" type={'password'} ref={register} id={'loginPassword'} className={'customForm-control'} />
						{errors.password && <p>{errors.password.message}</p>}
					</div>
					<button type="submit" className={'btn btn-primary'} >Log In</button>
				</form>
			</div>
		</div>
	</div>;
	
			
};


export default Login;
