import React from 'react';
import styles from './App.module.css';


class Square extends React.Component{
  render(){
    return(
      <button
        className={styles.button}
        onClick={this.props.click}
      >
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      squares : Array(9).fill(null),
      isXNext : true,
    }
  }

  renderSquare(i){
    return <Square
      value = {this.state.squares[i]}
      click = {() => this.clickHandler(i)}
    />
  }

  calculateWinner(squares) {
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]
    for (let i = 0 ; i < lines.length ; i++)
    {
      const [a, b , c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        return squares[a];
      }
    }
    return null;
  }

  clickHandler = (i) =>{
    const squares = [...this.state.squares];
    if (this.calculateWinner(squares) || squares[i]){
      return;
    }
    squares[i] = this.state.isXNext ?  'X' :  'O'
    this.setState({
      squares : squares,
      isXNext : !this.state.isXNext
    });
  }


  render(){
    const winner = this.calculateWinner(this.state.squares);
    let status;
    if (winner){
      console.log('einner is there')
      status = 'winner:' + winner;
    }else{
      status = 'Next player is : ' + (this.state.isXNext ? 'X' : 'O');
    }


    return(
      <div>
        <div>{status}</div>
        <br/>
        <div>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <divs>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </divs>
        {/*<button className={styles.button}></button>*/}
      </div>

    );
  }
}



class App extends React.Component {
  render(){
    return (
      <div>
        <Board/>
      </div>
    );
  }
}

export default App;
