// web/components/GrammarBox.js
import React from 'react';
import 'whatwg-fetch';
import { helpers } from '../helpers/Helpers';

export default class GrammarBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { textValue: 'Type or paste your own text here to get grammar suggestions & translation to the language of your choice.' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ textValue: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    console.log(this.state.textValue);

    fetch('/api/grammar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: this.state.textValue,
        fromLang: 'es'
      })
    })
    .then(helpers.checkResponseStatus)
    .then(helpers.parseJSON)
    .then(json => {
      console.log(json);
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="grammar-container">
        <form onSubmit={this.handleSubmit}>
          <textarea value={this.state.textValue} onChange={this.handleChange} />
          <input type="submit" value="Check Text" />
        </form>
      </div>
    );
  }
}
