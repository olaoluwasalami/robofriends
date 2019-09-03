import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry  from '../components/ErrorBoundry';
import '../containers/App.css';

import { setSearchField } from '../actions.js'

const mapStateToProps = state => {
	return {
		searchfield: state.searchRobots.searchField

	}
}



class App extends Component {
	constructor() {
		super()
		this.state = {
			robots: [],
			searchfield: ''
		}
	}

componentDidMount() {
	
	fetch('https://jsonplaceholder.typicode.com/users')
	.then(response=> response.json())
	.then(users => this.setState({robots: users}));
	}
	


onSearchChange = (event) => {
	this.setState({searchfield: event.target.value})
	}


	render() {
		const {robots, searchfield} = this.state;
		const filteredRobots = robots.filter(robot => {
		return robot.name.toLowerCase().includes(searchfield.toLowerCase());
	})	
		return !robots.length ?
			 <h1>Loading</h1> :
		
		(
		
		<div className='tc'>
		<h1 className='f2'> RoboFriends </h1>
		<SearchBox searchChange={this.onSearchChange}/>
		<Scroll>
		<ErrorBoundry>
		<CardList robots={filteredRobots}/>
		</ErrorBoundry> 
		</Scroll>
		</div>

);}
 
}

export default connect(mapStateToProps, mapDispatchToProps)(App) ;