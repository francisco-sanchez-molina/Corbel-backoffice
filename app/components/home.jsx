import React from "react";

class Home extends React.Component {

  render() {
    var divStyle = {
      width: '100%',
      heigth: '100%',
      textAlign: 'center',
      verticalAlign: 'middle',
      lineHeight: '90px'
    };

    return (
      <div className='padded pane' style={divStyle}>
        <h1>
          Welcome to Corbel backoffice
        </h1>
        <img width='200px' src='assets/corbel.png'/>
      </div>
    )
  }
}

export default Home;
