import React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import actions from '../../actions';

let submittedCall = false;

class HomePage extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            zipValue:'', 
            invalidZip: false,
            submittedCall: false,
            weatherUpdated: false,

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillMount() {
        (() => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                console.log("geolocation is not available");
            }
        })();
        function showPosition(position) {
            console.log("Latitude: ", position.coords);
            console.log("longitude: ", position.coords.longitude);
        }
    }
    componentDidMount(){
        globals.mountComponent();
    }
    componentWillUnmount(){
        globals.unmountComponent();
    }
    componentDidUpdate(prevProps, prevState) {
        if(this.state.submittedCall) {

            (prevProps.homePageData.currentWeather != this.props.homePageData.currentWeather) 
                && this.setState({weatherUpdated:true});

            console.log("yo, that was a submisssion ", this.props.homePageData.currentWeather);
            // if(prevProps.homePageData.currentWeather.cod !== '404') {
                
            //     this.setState({invalidZip: true);
            // } 






        }
        // if(this.state.submittedCall) {
        //     console.log("status: ", prevProps.homePageData.currentWeather.cod);
        // }
        // if(this.state.weatherUpdated) {

        //     console.log("has been updated once!");
        //     console.log("curent weather: ", this.props.homePageData.currentWeather); 
            
        //     //if the zipcode is invalid
        //     if(prevProps.homePageData.currentWeather.cod !== '404') {
        //         this.setState({invalidZip: true})
        //     } 
                
              

        // } else { // first time weather comes through, 
        //     (prevProps.homePageData.currentWeather != this.props.homePageData.currentWeather) 
        //      //   && this.setState({weatherUpdated:true});
        // }
        
    }
    handleChange(e) {
        this.setState({zipValue: e.target.value, submittedCall: false});
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.getWeather(this.state.zipValue);
        this.setState({submittedCall:true});
    }
    render() {
        let weatherInfo = this.props.homePageData.currentWeather;
        console.log("props fron render: ", this.props);
        return (
            <div id="homePage">
                <DocumentMeta {...meta.homePage} />
                <h1>{this.props.homePageData.title}</h1>  
                <form onSubmit={this.handleSubmit}>
                    <input 
                        type="zip" 
                        id="zip"
                        value={this.state.zipValue} 
                        onChange={this.handleChange} 
                        placeholder="Enter your zip code"
                        maxLength={5}
                    />
                    <input type="submit" value="submit" />
                </form>
                { this.state.weatherUpdated &&
                    weatherInfo.name &&
                        <section>
                            <h2>{weatherInfo.name}</h2>
                        </section>
                }
                { this.state.weatherUpdated &&
                    !weatherInfo.name &&
                        <section>
                            <h2>Dude this aint a real US zip code player</h2>
                        </section>
                }
                {/* !weatherInfo.name && 
                    <section>
                        <h1>Sorry that was an invalid zip yo.</h1>
                    </section>
              */  }
                
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
        getWeather: (zip) => {
            dispatch(actions.loadHomePageData(zip));
        },
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
