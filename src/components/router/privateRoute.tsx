import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { useSelector } from 'react-redux';
import { isAuthorised } from '../../store/user/geters';
import { useEffect } from 'react';
import history from '../../history';



export const PrivateRoute: React.FC<RouteProps> = props => {
	const isAuth = useSelector(isAuthorised);
	let redirectPath = '';
	useEffect(()=>{
		if(!isAuth){
			history.push('/login');
		}
	}, [isAuth]);

	if (redirectPath) {
		const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />;
		return <Route {...props} component={renderComponent} render={undefined} />;
	} else {
		return <Route {...props} />;
	}
};

export default PrivateRoute;
