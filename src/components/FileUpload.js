import React, { Component } from 'react';

export default class FileUpload extends Component {
  constructor() {
    super();
    this.state = {
      file: '',
    };

    this._onSubmit = this._onSubmit.bind(this);
    this._onFileSelect = this._onFileSelect.bind(this);
  }

  _onFileSelect(e) {
    e.preventDefault();
    console.log('_onFileSelect');
    const file = e.target.files[0];
    console.log('file: ', file);
  }

  _onSubmit(e) {
    e.preventDefault();
    console.log('_onSubmit');
  }

  render() {
    return (
      <div>
        <form onSubmit={this._onSubmit}>
          <input type="file" onChange={this._onFileSelect} />
          <button>Upload</button>
        </form>
      </div>
    );
  }
}
