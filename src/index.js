import React from 'react'
import ReactDOM from 'react-dom'

import  { createStore }  from 'redux'
import countReducer from './countReducer'
import notesReducer from './notesReducer'

const counterStore = createStore( countReducer )
const noteStore = createStore( notesReducer )

noteStore.dispatch({type: 'ADD_NOTE', note: 'Buy Milk'})


// DEMO PURPOSES ONLY - WE'RE SUBSCRIBING TO AN EVENT RIGHT AWAY
counterStore.subscribe(function(){
  console.log('Beef')
})

counterStore.subscribe(() => console.log('Yay!'))

function App (props) {
  return (
    <div>
    <h1>My Cool App!</h1>
    < Counter store={props.store} />
    < Note store={props.otherStore} />
  </div>)
}

class Note extends React.Component {
  componentDidMount(){
    console.log("Component Mounted!!!")
    this.props.store.subscribe( this.forceUpdate.bind(this) )
  }

  // handleNewNote(event) {
  //   debugger
  //   this.props.store.dispatch({type: 'ADD_NOTE',note: 'Buy Milk' })
  //   // console.log(this.props.store.getState())
  // }
  handleNewNote(e) {
    e.preventDefault()
    const text = this.noteText.value
    this.props.store.dispatch({type: 'ADD_NOTE',note: text })
  }

  render() {
    return <div><form  onSubmit={this.handleNewNote.bind(this)}><input type='text' ref={(input) => this.noteText = input} /><button type='submit'>Add note</button></form><p>{this.props.store.getState()}</p></div>
  }
}

class Counter extends React.Component {


  componentDidMount(){
    console.log("Component Mounted!!!")
    this.props.store.subscribe( this.forceUpdate.bind(this) )
  }

  handleIncrement(){
    this.props.store.dispatch({type: 'INCREMENT_COUNT' })
    console.log(this.props.store.getState())
  }

  handleDecrement(){
    this.props.store.dispatch({type: 'DECREMENT_COUNT' })
    console.log(this.props.store.getState())
  }

  handleReset(){
    this.props.store.dispatch({type: 'RESET_COUNT' })
    console.log(this.props.store.getState())
  }

  render(){
    return (
      <div>
        <h1>{ this.props.store.getState() }</h1>
        <button onClick={this.handleIncrement.bind(this)}>Increment Count</button>
        <button onClick={this.handleDecrement.bind(this)}>Decrement Count</button>
        <button onClick={this.handleReset.bind(this)}>Reset Count</button>
      </div>
    )
  }
}

ReactDOM.render(< App store={counterStore} otherStore={noteStore}  />, document.getElementById('container'))
