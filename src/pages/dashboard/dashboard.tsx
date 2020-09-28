import React from 'react';
import Sidebar from '../../components/sidebar/sidebar';
import './dashboard.scss';
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import PostForm from '../posts/postForm/postForm';
import { useDispatch } from 'react-redux';
import { isAuthorised } from '../../store/user/geters';
import { authUser } from '../../store/user/actions';

const routes = [{
	text: 'Posts',
	slug: '/posts',
},
{
	text: 'Songs',
	slug: '/songs',
},
{
	text: 'Artists',
	slug: '/artists',
},
];
const Dashboard = () => {
	let { path, url } = useRouteMatch();
	const dispatch = useDispatch();
	const logOut = () => {
		console.log('aa');
		dispatch(authUser(false));
	};
	return  <div className={'dashboardPage'} >
		<Sidebar customClass="dashboardPage-navigation" links={routes} url={url} />
		<section className="dashboardPage-content">
			<div className={'container'}>
				<Switch>
					<Route path={`${path}/posts`}  component={PostForm}/>
				</Switch>
			</div>
		</section>
	</div>;
};
    
   

export default Dashboard;
