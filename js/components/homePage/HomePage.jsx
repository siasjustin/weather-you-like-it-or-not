import React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import actions from '../../actions';

class HomePage extends React.Component {
    constructor(props){
        super(props);
        this.state = { };
    }
    componentDidMount(){
        globals.mountComponent();
    }
    componentWillUnmount(){
        globals.unmountComponent();
    }
    render() {
        return (
            <div id="homePage">
                <DocumentMeta {...meta.homePage} />
                <h1>{this.props.homePageData.title}</h1>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        homePageData: state.homePageData,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
