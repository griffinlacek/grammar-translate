// web/components/LangControls.js
import React from 'react';

export default class LangControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {fromValue: 'en', toValue: 'es'};

    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
  }

  handleFromChange(event) {

  }

  handleToChange(event) {

  }

  render() {
    return (
      <div className="controls-container">
        <select className="fromLang" value={this.state.fromValue} onChange={this.handleFromChange}>
        </select>

        <select className="toLang" value={this.state.toValue} onChange={this.handleToChange}>
        </select>
      </div>
    );
  }
}
