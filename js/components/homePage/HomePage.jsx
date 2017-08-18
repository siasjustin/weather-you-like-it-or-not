import React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import actions from '../../actions';
import gsap from 'gsap';
import ReactHtmlParser from 'react-html-parser';

const convertKelvinToFahrenheight = kelvinDegrees => {
    let fahrenheightDegrees = (((kelvinDegrees-273.15)*1.8)+32).toFixed();
    return fahrenheightDegrees;
}

const validateExistence = (test) => {
    let returnValue = test ? test : 'undefined';
}

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
        this.setState({
            test:"test"
        });
       

        console.log("test: ", this.state.test);
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
        let { description, main, id } = this.props.homePageData.currentWeather.weather[0];

        let temperature = weatherInfo.weather 
            ? convertKelvinToFahrenheight(weatherInfo.main.temp) 
            : "unknown";

         weatherInfo.statement = weatherInfo.name ? 
            `You are in <em>${weatherInfo.name}</em>, and it is <em>${temperature}º</em> and <em>${description}</em><br />but hey want to see what the weather is like somewhere else?`
            : `Dude this aint a real US zip code player! Maybe you should try again fool!`;

        weatherInfo.apiClass = weatherInfo.name ?
            `apiSuccess`
            : `apiFail`;

        return (
            <div id="homePage">
                <DocumentMeta {...meta.homePage} />
                
                { this.state.weatherUpdated &&
                        <section style={{backgroundImage:'url(/images/backgrounds/' + id + '.jpg)'}} className={"wrapper " + weatherInfo.apiClass}>
                            <header>
                                <div className="container">
                                    <h2>{ReactHtmlParser(weatherInfo.statement)}</h2>
                                    <div className="formHolder">
                                        <form onSubmit={this.handleSubmit}>
                                            <input 
                                                type="zip"
                                                id="zip"
                                                value={this.state.zipValue} 
                                                onChange={this.handleChange} 
                                                maxLength={5}
                                                size={5}
                                                placeholder="Enter Zip"
                                            />
                                            <input type="submit" value="submit" />
                                        </form>
                                    </div>
                                </div>
                            </header>
                            <section className="display">
                                <div className="box box1">1</div>
                                <div className="box box2">2</div>
                                <div className="box box3">3</div>
                                <div className="box box4">4</div>
                                <div className="box box5">5</div>
                                <div className="box box6">6</div>
                                <div className="box box7">7</div>

                                <div className="box box8">8</div>
                                <div className="box box9">9</div>
                                <div className="box box10">10</div>
                                <div className="box box11">11</div>
                                <div className="box box12">12</div>
                                <div className="box box13">13</div>
                                <div className="box box14">14</div>

                                <div className="box box15">15</div>
                                <div className="box box16 visible">
                                    <div>Temperature: {temperature}</div>
                                </div>
                                <div className="box box17">17</div>
                                <div className="box box18">18</div>
                                <div className="box box19">19</div>
                                <div className="box box20">20</div>
                                <div className="box box21">21</div>

                                <div className="box box22">22</div>
                                <div className="box box23">23</div>
                                <div className="box box24">24</div>
                                <div className="box box25">25</div>
                                <div className="box box26">26</div>
                            </section>
                        </section>
                }
                { !this.state.weatherUpdated && 
                    <section className="wrapper intro">
                        <div className="formHolder circle">
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
                                    placeholder="Enter Zip"
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
