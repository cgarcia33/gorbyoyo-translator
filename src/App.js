import React, { Component } from 'react';
import './App.css';
import Axios from 'axios';

class App extends Component {
  state = { textToTranslate: "i am not selling knives", translatedText: "" };

  // check if there is a translation stored in the database
  componentDidMount() {
    Axios.get("/latestTranslation")
      .then(translation => {
        if (translation.data !== "none") {
          this.setState({ translatedText: translation.data });
        }
      });
  }

  handleChange = e => {
    this.setState({ textToTranslate: e.target.value });
  }

  // translate the text via the translation route
  handleSubmit = e => {
    e.preventDefault();
    Axios.post("/translate", { text: this.state.textToTranslate })
      .then(translation => {
        this.setState({ translatedText: translation.data });
      });
  }

  render() {
    return (
      <div className="container">
        <h1>English to Gorbyoyo Translator</h1>
        <div className="translation-output">
          <p>{this.state.translatedText}</p>
        </div>
        <div className="translation-input">
          <form onSubmit={this.handleSubmit}>
            <label>
              Text to translate:
            <input type="text" value={this.state.textToTranslate} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Translate" />
          </form>
        </div>
      </div>
    );
  }
}

export default App;
