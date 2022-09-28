import React, { Component } from 'react'
import spineer from './loading.gif'
export default class Spineer extends Component {
  render() {
    return (
      <div>
        <img src={spineer} alt="spineer"/>
      </div>
    )
  }
}
