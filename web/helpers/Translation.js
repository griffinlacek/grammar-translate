import React from 'react';

class Translation {



  /**
  * Returns a string of a span containing the error text with class of the error type
  * @param error - JSON object of ine grammar error.
  * @param text - user input text to match errors to
  * @return json
  */
  createErrorSpan(error, text) {
    let errorText = text.substr(error.offset, error.length);
    let errorSpan = `<span className=${error.ruleCategoryId}>${errorText}</span>`;

    return errorSpan;
  }

  /**
  * Returns
  * @param errors - JSON object of grammar errors.
  * @param text - user input text to match errors to
  * @return json
  */
  insertErrors(grammarErrors, text) {
    let errors = grammarErrors.matches;

    for (var i in errors) {
      let offset = errors[i].offset;
      let errorSpan = this.createErrorSpan(errors[i], text);
    }
    return text;
  }
}

export let translation = new Translation();
