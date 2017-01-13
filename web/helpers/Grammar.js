import React from 'react';

class Grammar {

  /**
  * Adds the remaining text after the final error
  * @param i - for loop iterator
  * @param numErrors - Integer representing length of errors array
  * @param text - user input text
  * @param currOffset - offset to start substring calcuation from
  * @param finalErrorText - final text to return to user
  * @return
  */
  addPostErrorText(i, numErrors, text, currOffset, finalErrorText) {
    if ((i + 1) == numErrors) {
      finalErrorText += text.substr(currOffset);
      console.log(finalErrorText);
    }

    return;
  }

  /**
  * Returns the text preceding an individual error's string representation
  * @param error - JSON object of one grammar error.
  * @param text - user input text to match errors to
  * @param currOffset - offset to start substring calcuation from
  * @return preErrorText
  */
  getPreErrorText(error, text, currOffset) {
    // Starts at currOffset and cuts at the error offset - currOffset
    let preErrorText = text.substr(currOffset, (error.offset - currOffset));

    return preErrorText;
  }

  /**
  * Returns a an individual error's string representation
  * @param error - JSON object of one grammar error.
  * @param text - user input text to match errors to
  * @param currOffset - offset to start substring calcuation from
  * @return errorText
  */
  getErrorText(error, text, currOffset) {
    let errorText = text.substr(error.offset, error.length);

    return errorText;
  }

  /**
  * Returns a string of a span containing the error text with class of the error type
  * @param error - JSON object of one grammar error.
  * @param text - user input text to match errors to
  * @param currOffset - offset to start substring calcuation from
  * @return errorSpan
  */
  createErrorSpan(error, text, currOffset) {
    let errorText = this.getErrorText(error, text, currOffset);
    let errorSpan = `<span className=${error.ruleCategoryId}>${errorText}</span>`;

    return errorSpan;
  }

  /**
  * Returns the text preceding and a new span around an individual error
  * @param error - JSON object of one grammar error.
  * @param text - user input text to match errors to
  * @return errorSubstring
  */
  getErrorSubstring(error, text, currOffset) {
    let preErrorText = this.getPreErrorText(error, text, currOffset);
    let errorSpan = this.createErrorSpan(error, text, currOffset);

    let errorSubstring = preErrorText + errorSpan;

    return errorSubstring;
  }


  /**
  * Returns
  * @param errors - JSON object of grammar errors.
  * @param text - user input text to match errors to
  * @return finalErrorText
  */
  insertErrors(grammarErrors, text) {
    let errors = grammarErrors.matches;
    let numErrors = errors.length;

    if (numErrors == 0) {
      return text;
    }
    else {
      let finalErrorText = "";
      let currOffset = 0;

      for (var i in errors) {
        let errorSubstring = this.getErrorSubstring(errors[i], text, currOffset);

        // If there are multiple errors for a string, just take the first.
        if (errors[i].offset < currOffset) {
          break;
        }

        currOffset = errors[i].offset + errors[i].length;

        finalErrorText += errorSubstring;

        if (i == (numErrors - 1)) {
          finalErrorText += text.substr(currOffset);
        }
      }
      return finalErrorText;
    }
  }
}

export let grammar = new Grammar();
