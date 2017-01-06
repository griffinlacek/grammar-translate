// web/components/IndexPage.js
import React from 'react';
import LangControls from './LangControls';
import GrammarBox from './GrammarBox';
import TranslateBox from './TranslateBox';


export default class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }

  render() {
    return (
      <div className="home">
        <LangControls />
        <GrammarBox />
        <TranslateBox />
      </div>
    );
  }
}
