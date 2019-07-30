import React, { Component } from "react"
import axios from "axios"

export default class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  render() {
    const { data } = this.state
    const elements = data.map(i => <p key={i.number}>{i.text}</p>)
    return <div>
      <input type="text" onKeyUp={this.handleSubmit}></input>
      <div> {elements} </div>
    </div>
  }
  async handleSubmit(e) {
    const val = e.target.value
    if (val.length > 0) {
      if (e.key === 'Enter') {
        try {
          const { data } = await axios.get('http://localhost:3001/search/eng/' + val)
          console.log(data)
          this.setState({data})
        } catch (err) {
          console.log(err)
        }
      }
    } else {
      this.setState({ data: [] })
    }
  }
}
