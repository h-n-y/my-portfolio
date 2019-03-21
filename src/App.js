import React, { Component } from 'react';

import MainPage from './MainPage/MainPage';

import './css/styles.css';

class App extends Component {

    constructor(props) {
        super(props);

        /**
         *  TODO: add device type, or boolean flag
         */
        this.state = {
        };
    }

    checkDeviceType() {
        console.log('checking device type...');
        console.log(window.navigator.userAgent);
    }

    componentDidMount() {
        this.checkDeviceType();
    }

    render() {
        return (
            <MainPage />
        );
    }
}

export default App;
