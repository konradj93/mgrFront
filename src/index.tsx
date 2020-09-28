import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {
	Router,
} from 'react-router-dom';
import history from './history';


const store = configureStore();
ReactDOM.render(
	<Provider store={store}>
		<React.StrictMode>
			<Router history={history}>
				<App />
			</Router>
		</React.StrictMode>
	</Provider>,
	document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
