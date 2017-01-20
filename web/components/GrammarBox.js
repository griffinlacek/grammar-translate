// web/components/GrammarBox.js
import React from 'react';
import {Editor, EditorState} from 'draft-js';

export default class GrammarBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="grammar-container">
        <div className="editor">
          <Editor
            editorState={this.props.editorState}
            onChange={this.props.onChange}
          />
        </div>
          <button className="submit" onClick={this.props.onClick}>Check Text</button>
      </div>
    );
  }
}
