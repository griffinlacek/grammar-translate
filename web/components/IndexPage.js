// web/components/IndexPage.js
import React from 'react';
import LangControls from './LangControls';
import GrammarBox from './GrammarBox';
import TranslateBox from './TranslateBox';
import 'whatwg-fetch';
import { helpers } from '../helpers/Helpers';

export default class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Type or paste your own text here to get grammar suggestions & translation to the language of your choice.'
    };
  }

  updateText(e) {
    this.setState({ text: e.target.value });
  }

  submitText(e) {
    e.preventDefault();

    fetch('/api/grammar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: this.state.text,
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
      <div className="home">
        <LangControls />
        <GrammarBox
          text={this.state.text}
          onChange={this.updateText.bind(this)}
          onSubmit={this.submitText.bind(this)}
          />
        <TranslateBox />
      </div>
    );
  }
}
