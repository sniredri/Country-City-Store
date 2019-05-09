import React, { Component } from 'react'
import Footer from "../Components/Footer"
import Header from "../Components/Header"

export class layout extends Component {
  render() {
    return (
      <div>
        <main style={{marginTop: "10%"}}>{this.props.children}</main>
      </div>
    )
  }
}

export default layout