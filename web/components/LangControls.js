// web/components/LangControls.js
import React from 'react';

export default class LangControls extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="controls-container">
        <select className="fromLang" value={this.props.fromLang} onChange={this.props.onChange}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
        </select>

        <button onClick={this.props.onClick}>
          Switch
        </button>

        <select className="toLang" value={this.props.toLang} onChange={this.props.onChange}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
        </select>
      </div>
    );
  }
}
