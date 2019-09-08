// TIC TAC TOE
(function app() {
  const board = ['', '', '', '', '', '', '', '', ''];
  const symbols = {
    options: ['O', 'X'],
    turn_index: 0,
    change: function () {
      symbols.turn_index = (symbols.turn_index + 1) % 2;
    }
  };
  let container_element = null;
  let gameover = false;
  const winning_sequences = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  function init(container) {
    container_element = container;
    document.querySelector('.btn').addEventListener('click', () => {
      restart();
    });
  }

  function make_play(position) {
    if (gameover || board[position] !== '') return false;

    const currentSymbol = symbols.options[symbols.turn_index];
    board[position] = currentSymbol;
    draw();

    const winning_sequences_index = check_winning_sequences(currentSymbol);
    if (is_game_over()) {
      game_is_over();
    }
    if (winning_sequences_index >= 0) {
      game_is_over();
      stylize_winner_sequence(winning_sequences[winning_sequences_index]);
    } else {
      symbols.change();
    }

    return true;
  }

  function stylize_winner_sequence(winner_sequence) {
    winner_sequence.forEach((position) => {
      container_element
        .querySelector(`button:nth-child(${position + 1})`)
        .classList.add('winner');
    });
  }

  function check_winning_sequences(symbol) {
    for (i in winning_sequences) {
      if (board[winning_sequences[i][0]] == symbol &&
        board[winning_sequences[i][1]] == symbol &&
        board[winning_sequences[i][2]] == symbol) {
        return i;
      }
    };
    return -1;
  }

  function game_is_over() {
    gameover = true;
    document.querySelector('#game-over').style.display = 'block';
  }

  function is_game_over() {
    return !board.includes('');
  }

  function start() {
    board.fill('');
    draw();
    document.querySelector('#game-over').style.display = 'none';
    gameover = false;
  }

  function restart() {
    if (is_game_over() || gameover || confirm('Are you sure you want to restart this game?')) {
      start();
    }
  }

  function draw() {
    const divs = container_element.querySelectorAll('button');
    const divCount = divs.length;
    if (divCount === 0) {
      board.forEach((element, index) => {
        const div = document.createElement('button');
        div.textContent = element;
        div.addEventListener('click', e => {
          make_play(index);
        });
        container_element.appendChild(div);
      });
    } else {
      divs.forEach((div, index) => {
        if (!board[index]) {
          div.removeAttribute('class');
        }
        div.textContent = board[index];
      });
    }
  }

  init(document.querySelector('.game'));
  start();
})();
