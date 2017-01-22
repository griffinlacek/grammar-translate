// web/components/IndexPage.js
import React from 'react';
import { Editor, EditorState, ContentState } from 'draft-js';
import striptags from 'striptags';
import 'whatwg-fetch';
import LangControls from './LangControls';
import GrammarBox from './GrammarBox';
import TranslateBox from './TranslateBox';
import { helpers } from '../helpers/Helpers';
import { grammar } from '../helpers/Grammar';
import localization from '../data/localization';

export default class IndexPage extends React.Component {
  constructor(props) {
    super(props);

    let contentState = ContentState.createFromText(localization.initInput);
    let editorState = EditorState.createWithContent(contentState);
    editorState = EditorState.moveFocusToEnd(editorState);

    this.state = {
      fromLang: localization.code,
      toLang: localization.defaultTrans,
      grammarErrors: {},
      translation: '',
      editorState: editorState
    };
  }

  componentDidMount() {
    helpers.translateFetch(
      localization.initInput,
      this.state.fromLang,
      this.state.toLang
    ).then(json => {
      this.setState({ translation: json.translation });
    });
  }

  handleLangChange(e) {
    this.setState({ [e.target.className]: e.target.value });

    // Move focus to end of editor and set new state
    let editorState = EditorState.moveFocusToEnd(this.state.editorState);
    this.setState({ editorState });

    // Translate editor content if toLang is changed
    if( e.target.className === 'toLang') {
      let currentText = editorState.getCurrentContent().getPlainText();

      helpers.translateFetch(
        currentText,
        this.state.fromLang,
        e.target.value
      ).then(json => {
        this.setState({ translation: json.translation });
      });
    }
  }

  handleLangSwitch(e) {
    e.preventDefault();

    // Translate translation to current input language
    helpers.translateFetch(
      this.state.translation,
      this.state.toLang,
      this.state.fromLang
    ).then(json => {
      // Switch translation text to editor
      let editorState = EditorState.push(
        this.state.editorState,
        ContentState.createFromText(this.state.translation)
      );

      editorState = EditorState.moveFocusToEnd(editorState);

      this.setState({ editorState });
      this.setState({ translation: json.translation });
    });

    // Switch language dropdowns
    this.setState({ fromLang: this.state.toLang, toLang: this.state.fromLang });
  }

  updateText(editorState) {
    this.setState({ editorState });

    let currentText = editorState.getCurrentContent().getPlainText();

    helpers.translateFetch(
      currentText,
      this.state.fromLang,
      this.state.toLang
    ).then(json => {
      this.setState({ translation: json.translation });
    });
  }

  submitText(e) {
    e.preventDefault();

    let text = this.state.editorState.getCurrentContent().getPlainText();
    //Strip html tags and remove extra spaces from input text
    let cleanText = striptags(text).replace(/\s+/g, ' ');

    fetch('/api/grammar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'mode': 'no-cors'
      },
      body: JSON.stringify({
        text: cleanText,
        fromLang: this.state.fromLang
      })
    })
    .then(helpers.checkResponseStatus)
    .then(helpers.parseJSON)
    .then(json => {
      let errorText = grammar.insertErrors(json, cleanText);

      this.setState({ grammarErrors: json });
      this.setState({ text: errorText });
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
            editorState={this.state.editorState}
            onChange={this.updateText.bind(this)}
            onClick={this.submitText.bind(this)}
          />
          <TranslateBox
            translation={this.state.translation}
          />
        </div>
      </div>
    );
  }
}
