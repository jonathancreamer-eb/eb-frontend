import React from 'react';
import styles from './app.css';

export default class App extends React.PureComponent {
    public componentDidMount() {
        console.log("test");
    }

    public render() {
        return (
            <div className={styles.app}>
                <h1>App 1</h1>
            </div>
        )
    }
}