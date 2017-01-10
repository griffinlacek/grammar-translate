// web/components/LangControls.js
import React from 'react';
import languages from '../data/languages';

export default class LangControls extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="controls-container">
        <div className="controls">
          <select className="fromLang" value={this.props.fromLang} onChange={this.props.onChange}>
            {languages.map(language => {
              return <option key={language.code} value={language.code}>{language.name}</option>;
            })}
          </select>

          <button className="switchLang" onClick={this.props.onClick}>
            Switch
          </button>

          <select className="toLang" value={this.props.toLang} onChange={this.props.onChange}>
            {languages.map(language => {
              return <option key={language.code} value={language.code}>{language.name}</option>;
            })}
          </select>
        </div>
      </div>
    );
  }
}
