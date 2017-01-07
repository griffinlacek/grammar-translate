import React from 'react';

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
}

export let helpers = new Helpers();
