// web/components/TranslateBox.js
import React from 'react';

export default class TranslateBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="translate-container">
        <p className="translation">{this.props.translation}</p>
      </div>
    );
  }
}
