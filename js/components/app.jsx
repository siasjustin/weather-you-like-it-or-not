import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { browserHistory, Router, Route, IndexRoute, Link } from 'react-router';

class App extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className={"yield browser-" + globals.browser() + " is-mobile-" + globals.isMobile + " is-ios-" + globals.isIos}>
                 {this.props.children}
            </div>
        )
    }
};

App.propTypes = {
    children: PropTypes.object.isRequired
};

export default App;



