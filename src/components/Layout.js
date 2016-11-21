import React, { Component } from 'react';
import FileUpload from './FileUpload';

export default class Layout extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="text-center">AWS File Uploading</h1>
        <FileUpload />
      </div>
    );
  }
}
