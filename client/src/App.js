import React, { Component } from 'react';
import './App.css';

class App extends Component {
   state = {
    name:'',
    summoner:'',
    elo:'iron',
    main:'top',
    secondary:'top',
    view:1
   };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();

    var self = this;

    

    fetch('http://localhost:5000/register', {
      method: 'POST',
      body: JSON.stringify({
        name: self.state.name,
        summoner: self.state.summoner,
        elo: self.state.elo,
        main: self.state.main,
        secondary: self.state.secondary,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).then(function (response) {
      if(response.status === 200){
         self.setState({ view: 2 });
      }
    });
  }


  render() {
    switch (this.state.view){
      case 1:
        return (
          <section className="hero-bg">
            <div className="center">
              <form onSubmit={this.onSubmit}>
                <br />
                <label htmlFor="name">Name</label>
                <input className="inputForm" type="text" name="name" id="name" placeholder="Insert Name" onChange={this.onChange}/>
                <br />
                <label htmlFor="summoner">Summoner Name</label>
                <input className="inputForm" type="text" name="summoner" id="summoner" placeholder="Insert Summoner Name" onChange={this.onChange}/>
                <br />
                <label htmlFor="elo">Elo</label>
                <select className="inputForm" name="elo" id="elo" onChange={this.onChange}>
                  <option value="iron" selected="selected">Iron</option>
                  <option value="bronze">Bronze</option>
                  <option value="silver">Silver</option>
                  <option value="gold">Gold</option>
                  <option value="platinun">Platinun</option>
                  <option value="diamond">Diamond</option>
                  <option value="master">Master</option>
                  <option value="grandmaster">GrandMaster</option>
                  <option value="challenger">Challenger</option>
                </select>
                <br />
                <label htmlFor="main">Main Role</label>
                <select className="inputForm" name="main" id="main" onChange={this.onChange}>
                  <option value="top" selected="selected">Top</option>
                  <option value="jungler">Jungler</option>
                  <option value="mid">Mid</option>
                  <option value="adc">Adc</option>
                  <option value="support">Support</option>
                  <option value="fill">Fill</option>
                </select>
                <br />
                <label htmlFor="secondary">Secondary Role</label>
                <select className="inputForm" name="secondary" id="secondary" onChange={this.onChange}>
                  <option value="top" selected="selected">Top</option>
                  <option value="jungler">Jungler</option>
                  <option value="mid">Mid</option>
                  <option value="adc">Adc</option>
                  <option value="support">Support</option>
                  <option value="fill">Fill</option>
                </select>
                <div className="buttons">
                  <input type="submit" defaultValue="Save" className="submitButton" />
                </div>
              </form>
            </div>
          </section>
        );
      case 2:
      return(
         <div className="center">
           <h1 className="msgSucess">Register done</h1>
         </div>
      );
    }
    
  }
}

export default App;
