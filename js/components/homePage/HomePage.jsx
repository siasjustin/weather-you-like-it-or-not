import React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import actions from '../../actions';
import gsap from 'gsap';

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
            const updateWeatherStatus = () => {  
                this.setState({weatherUpdated:true})
                if(this.props.homePageData.currentWeather) {

                }
            };

            if(prevProps.homePageData.currentWeather != this.props.homePageData.currentWeather)  {
                this.tlBringInWeather = new TimelineMax({})
                    .set('.intro .formHolder #zip', {display:'none'})
                    .to('.intro .formHolder', 1.7, {rotation:"+=720", left:"-100vw"})
                    .to('.intro', .4, {autoAlpha:0}, "-=1.3")
                    .add(updateWeatherStatus);
            }

            console.log("yo, that was a submisssion ", this.props.homePageData.currentWeather);
        }
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

            weatherInfo.statement = weatherInfo.name ? 
                `You are in ${weatherInfo.name}, but hey want to see what the weather is like somewhere else?`
                : `Dude this aint a real US zip code player`;


        console.log("props fron render: ", this.props);
        return (
            <div id="homePage">
                <DocumentMeta {...meta.homePage} />
                
                { this.state.weatherUpdated &&
                        <section className="wrapper apiSuccess">
                            <header style={{background:'yellow'}}>
                                <h2>{weatherInfo.statement}</h2>
                                <form onSubmit={this.handleSubmit}>
                                    <input 
                                        type="zip"
                                        id="zip"
                                        value={this.state.zipValue} 
                                        onChange={this.handleChange} 
                                        maxLength={5}
                                        size={5}
                                    />
                                    <input type="submit" value="submit" />
                                </form>
                            </header>
                            <section className="display">
                                
                            </section>
                        </section>
                }
                { !this.state.weatherUpdated && 
                    <section className="wrapper intro">
                        <div className="formHolder">
                            <h1>Enter your zip code to find out about the weather.</h1>  
                            <form onSubmit={this.handleSubmit}>
                                <input 
                                    type="zip"
                                    id="zip"
                                    value={this.state.zipValue} 
                                    onChange={this.handleChange} 
                                    autoFocus={true}
                                    maxLength={5}
                                    size={5}
                                />
                                <input type="submit" value="submit" />
                            </form>
                        </div>
                    </section>
                }
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
