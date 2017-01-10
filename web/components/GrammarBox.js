// web/components/GrammarBox.js
import React from 'react';
import Textarea from 'react-textarea-autosize';

export default class GrammarBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="grammar-container">
        <form onSubmit={this.props.onSubmit}>
          <Textarea autoFocus value={this.props.text} onChange={this.props.onChange}></Textarea>
          <input type="submit" value="Check Text" />
        </form>
      </div>
    );
  }
}
