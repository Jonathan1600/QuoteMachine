import React from 'react';
import reactDOM from 'react-dom';
import './styles/style.css'

class QuoteBox extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        quoteData: [],
        quote: '',
        author: ''
      }
      this.randomQuote = this.randomQuote.bind(this);
      this.handleClick = this.handleClick.bind(this);
    }
  
    componentDidMount() {
      const API = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/'
      fetch(API)
          .then((response) => response.json())
          .then((data) => {
              this.setState({
                quoteData: data.quotes
              },()=>{
                this.handleClick();
              })
          })
          .catch(error => console.log('Error', error));
         
  
    }
  
    randomQuote() {
      const randomNumber = Math.floor(Math.random() * this.state.quoteData.length);
      return this.state.quoteData[randomNumber];
    }
  
    handleClick() {
      const oneRandomQuote = this.randomQuote();
      this.setState({
        quote: oneRandomQuote.quote,
        author: oneRandomQuote.author
      })
    }
  
    render() {
      return (
        <div id='quote-box'>
          <p id='text'>
            {this.state.quote}
          </p>
          <p id='author'>
           - {this.state.author}
          </p>
          <Buttons handleClick={this.handleClick}/>
        </div>
      )
    }
  }
  
  class Buttons extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return(
        <div className='buttons'>
          <a id='tweet-quote' className='button' href={`https://twitter.com/intent/tweet/?text=${this.props.quote} - ${this.props.author}`}><i className='fa fa-twitter'></i></a>
          <button id='new-quote' className='button' onClick={this.props.handleClick}>
            New quote
          </button>
        </div>
      )
    }
  }
  ReactDOM.render(<QuoteBox />, document.getElementById('root'));