import React from 'react';
import PlaygroundPage from './containers/Page';
// import './app.scss';
/********
    This temp is here as part of the rapid file saver script
    Learn more by reading js/config/scripts/rapidFileSaver.md
 ********/
import util from './tempFile';

export class App extends React.Component {
    componentDidMount() {
        util(1, 2);
    }

    render() {
        return (
            <PlaygroundPage {...this.props} />
        );
    }
}
