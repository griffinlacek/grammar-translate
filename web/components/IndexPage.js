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
      fromLang: 'en',
      toLang: 'es',
      text: 'Type or paste your own text here to get grammar suggestions & translation to the language of your choice.',
      grammarErrors: {},
      translation: ''
    };
  }

  handleLangChange(e) {
    this.setState({ [e.target.className]: e.target.value });
  }

  handleLangSwitch(e) {
    e.preventDefault();

    // Translate translation to current input language
    fetch('/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        text: this.state.translation,
        fromLang: this.state.toLang,
        toLang: this.state.fromLang
      })
    })
    .then(helpers.checkResponseStatus)
    .then(helpers.parseJSON)
    .then(json => {
      // Switch translation text to input text box
      this.setState({ text: this.state.translation });
      // Set new translation
      this.setState({ translation: json.translation });
      // Switch language dropdowns
      this.setState({ fromLang: this.state.toLang, toLang: this.state.fromLang });
    })
    .catch(error => {
      console.log(error);
    });
  }

  updateText(e) {
    this.setState({ text: e.target.value });

    fetch('/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        text: e.target.value,
        fromLang: this.state.fromLang,
        toLang: this.state.toLang
      })
    })
    .then(helpers.checkResponseStatus)
    .then(helpers.parseJSON)
    .then(json => {
      this.setState({ translation: json.translation })
    })
    .catch(error => {
      console.log(error);
    });
  }

  submitText(e) {
    e.preventDefault();

    fetch('/api/grammar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'mode': 'no-cors'
      },
      body: JSON.stringify({
        text: this.state.text,
        fromLang: this.state.fromLang
      })
    })
    .then(helpers.checkResponseStatus)
    .then(helpers.parseJSON)
    .then(json => {
      this.setState({ grammarErrors: json });
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="home">
        <LangControls
          fromLang={this.state.fromLang}
          toLang={this.state.toLang}
          onChange={this.handleLangChange.bind(this)}
          onClick={this.handleLangSwitch.bind(this)}
        />
      <div className="text-container">
          <GrammarBox
            text={this.state.text}
            onChange={this.updateText.bind(this)}
            onSubmit={this.submitText.bind(this)}
          />
          <TranslateBox
            translation={this.state.translation}
          />
        </div>
      </div>
    );
  }
}
