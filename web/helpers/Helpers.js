import React from 'react';
import 'whatwg-fetch';

class Helpers {

  /**
  * Checks an Http response to see if the status code is Ok
  * @param response - Http response
  * @return response - Http resonse
  * @throws error - error containing the response status text
  */
  checkResponseStatus(response) {
    if (response.status >= 200 && response.status <= 300) {
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }

  /**
  * Returns response json data. Used as a callback in fetch functions.
  * @param response - Http response
  * @return json
  */
  parseJSON(response) {
    return response.json();
  }

  /**
  * Returns fetch json data from /api/translate.
  * @param text - text to be translated
  * @param fromLang - language code to translate from
  * @param toLang - language code to translate to
  * @return json
  */
  translateFetch(text, fromLang, toLang) {
    let response = fetch('/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        text: text,
        fromLang: fromLang,
        toLang: toLang
      })
    })
    .then(this.checkResponseStatus)
    .then(this.parseJSON)
    .catch(error => {
      console.log(error);
    });

    return response;
  }
}

export let helpers = new Helpers();
