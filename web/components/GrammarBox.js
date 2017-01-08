// web/components/GrammarBox.js
import React from 'react';

export default class GrammarBox extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="grammar-container">
        <form onSubmit={this.props.onSubmit}>
          <textarea value={this.props.text} onChange={this.props.onChange} />
          <input type="submit" value="Check Text" />
        </form>
      </div>
    );
  }
}
