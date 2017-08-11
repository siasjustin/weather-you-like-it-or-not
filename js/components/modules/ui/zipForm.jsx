import React from 'react';
import { render } from 'react-dom';

class ZipForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input 
                    type="zip" 
                    id="zip"
                    value={this.props.val} 
                    onChange={this.props.change} 
                    placeholder={this.props.instructions}
                    maxLength={5}
                />
                <input type="submit" value="submit" />
            </form>
        )
    }
}

export default ZipForm;

/*}   
<ZipForm
    val={this.state.zipValue}
    changeFunc={this.handleChange}
    submitFunc={this.handleSubmit}
    instruction="Enter your zip code" />
*/