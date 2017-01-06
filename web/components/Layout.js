// web/components/Layout.js
import React from 'react';
import { Link } from 'react-router';

export default class Layout extends React.Component {
  render() {
    return (
      <div className="app-container">
        <header>
          <Link to="/">
            <h1>Grammar Translate</h1>
          </Link>
        </header>

        <div className="app-content">{this.props.children}</div>

        <footer>
          <p>Griffin Lacek &copy;2017</p>
        </footer>
      </div>
    );
  }
}
