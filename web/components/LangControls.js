// web/components/LangControls.js
import React from 'react';

export default class LangControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {fromLang: 'en', toLang: 'es'};

    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.handleSwitch= this.handleSwitch.bind(this);

  }

  handleFromChange(e) {
    this.setState({fromLang: e.target.value});
  }

  handleToChange(e) {
    this.setState({toLang: e.target.value});
  }

  handleSwitch(e) {
    e.preventDefault();

    this.setState({ fromLang: this.state.toLang, toLang: this.state.fromLang });
  }

  render() {
    return (
      <div className="controls-container">
        <select className="fromLang" value={this.state.fromLang} onChange={this.handleFromChange}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
        </select>

        <button onClick={this.handleSwitch}>
          Switch
        </button>

        <select className="toLang" value={this.state.toLang} onChange={this.handleToChange}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
        </select>
      </div>
    );
  }
}
