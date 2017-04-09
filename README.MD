# Grammar-Translate

Blends <a href="https://www.languagetool.org/">Language Tool</a>, an open source language based grammar checker with <a href="https://www.microsoft.com/en-us/translator/translatorapi.aspx">Microsoft Translate</a> to allow language learners to practice writing in 20 different languages with grammar corrections and a language translation of their choice.

## Local Dev Setup

For local development, after cloning the repo an npm install is required for dependency setup. To build the application front-end, use **npm build**, which will build using Webpack & compile all React/ES2015 code via Babel. The bundle will build to /views/js. To run the application use **npm start**, which runs the application using babel-node.

The local application is available at localhost:3000.

## Testing

Basic Grammar/Translate API tests are implemented using Mocha & Chai. Current tests can be found at /test. To run API tests, simply run **npm test**, which runs Mocha with a timeout of 5 seconds.
