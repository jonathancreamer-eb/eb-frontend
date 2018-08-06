import React from "react";

export default class App extends React.PureComponent {
    public componentDidMount() {
        console.log("test");
    }

    public render() {
        return (
            <div>
                <h1>App 1</h1>
            </div>
        )
    }
}