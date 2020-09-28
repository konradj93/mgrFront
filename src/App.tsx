import React from 'react';
import { Switch, Route } from 'react-router';
import Login from './pages/login/login';
import PrivateRoute from './components/router/privateRoute';
import Dashboard from './pages/dashboard/dashboard';
import NotFound from './pages/404';
import './App.scss';
import {ApolloProvider} from '@apollo/react-hooks';
import {graphClient} from "./api/graphql/graphql";


const App: React.FC = () => {
	return <ApolloProvider client={graphClient}>
		<Switch>
			<Route path='/login' component={Login} />
			<PrivateRoute
				path='/dashboard'
				component={Dashboard}
			/>
			<Route component={NotFound}/>
		</Switch>
	</ApolloProvider>;

};

export default App;
