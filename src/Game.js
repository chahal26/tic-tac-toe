import React, { useEffect,useState } from 'react';

const rowStyle = {
  display: 'flex'
}

const squareStyle = {
  'width':'60px',
  'height':'60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'white'
}

const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}

function  Square(props) {
  return (
    <div
      className="square"
      style={squareStyle}
      onClick={props.onClick}>
      {props.value}
    </div>
  );
}

function Board() {

  const [turn, setTurn] = useState(0);
  const [winner, setWinner] = useState('');

  const [data, setData] = useState(['','','','','','','','','']);

  const draw = (e, index) => {
    
    if(data[index - 1] === '' && winner === ''){
      data[index -1] = turn ;
      e.target.innerText = turn === 0 ? '0' : 'X';
      setTurn(turn === 0 ? 1 : 0);
    }


  }

  useEffect(() => {
    const checkRow = () => {
      let ans = false ;
      for (let i = 0; i < 9; i += 3) {
        ans |= (data[i] === data[i + 1] && data[i] === data[i+2] && data[i] !== '')
      }
      return ans ;
    }

    const checkCol = () => {
      let ans = false ; 
      for (let i = 0; i < 3; i++){
        ans |= (data[i] === data[i + 3] &&  data[i] === data[i + 6] &&  data[i] !== '')
      }
      return ans ;
    }

    const checkDiagonal = () => {
      return ((data[0] === data[4] && data[0] === data[8] && data[0] !== '') || (data[2] === data[4] && data[2] === data[6] && data[2] !== ''))
    }

    const checkWin = () => {
      return (checkRow() || checkCol() || checkDiagonal());
    }

    if(checkWin()){
      setWinner(turn === 1 ? '0 Wins' : 'X wins');
    }
  })

  const resetBoard = () => {
    setData(['','','','','','','','','']);
    setWinner('');
    setTurn(0);

    const squares = document.getElementsByClassName('square')
    Array.from(squares).forEach(square => {
      square.innerText = '';
    });

  }

  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>Next player: <span>{turn === 0 ? '0' : 'X'}</span></div>
      <div id="winnerArea" className="winner" style={instructionsStyle}>Winner: <span>{winner}</span></div>
      <button style={buttonStyle} onClick={ () => resetBoard()}>Reset</button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          <Square onClick={ (e) => draw(e,1) } value= '' />
          <Square onClick={ (e) => draw(e,2) } value= '' />
          <Square onClick={ (e) => draw(e,3) } value= '' />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square onClick={ (e) => draw(e,4) } value= ''/>
          <Square onClick={ (e) => draw(e,5) } value= ''/>
          <Square onClick={ (e) => draw(e,6) } value= ''/>
        </div>
        <div className="board-row" style={rowStyle}>
          <Square onClick={ (e) => draw(e,7) } value= ''/>
          <Square onClick={ (e) => draw(e,8) } value= ''/>
          <Square onClick={ (e) => draw(e,9) } value= '' />
        </div>
      </div>
    </div>
  );
}

export default function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}
