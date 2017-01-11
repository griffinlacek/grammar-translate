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

  componentDidMount() {
    helpers.translateFetch(
      this.state.text,
      this.state.fromLang,
      this.state.toLang
    ).then(json => {
      this.setState({ translation: json.translation });
    });
  }

  handleLangChange(e) {
    this.setState({ [e.target.className]: e.target.value });
  }

  handleLangSwitch(e) {
    e.preventDefault();

    // Translate translation to current input language
    helpers.translateFetch(
      this.state.translation,
      this.state.toLang,
      this.state.fromLang
    ).then(json => {
      // Switch translation text to input text box
      this.setState({ text: this.state.translation });
      
      this.setState({ translation: json.translation });
    });

    // Switch language dropdowns
    this.setState({ fromLang: this.state.toLang, toLang: this.state.fromLang });
  }

  updateText(e) {
    this.setState({ text: e.target.value });

    helpers.translateFetch(
      e.target.value,
      this.state.fromLang,
      this.state.toLang
    ).then(json => {
      this.setState({ translation: json.translation });
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
