import React from 'react';

class Index extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        // console.log("addddddd");
        return( 
            <div>
                <p>this is index {this.props.msg? "我來自view" : "我來自client"} </p>
            </div>
        );
        
    }
}

export default Index;