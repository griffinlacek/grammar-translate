// web/components/GrammarBox.js
import React from 'react';

export default class GrammarBox extends React.Component {
  render() {
    return (
      <div className="grammar-container">
        <form onSubmit={this.handleSubmit}>
          <textarea onChange={this.handleChange} />
          <input type="submit" value="Check Text" />
        </form>
      </div>
    );
  }
}
