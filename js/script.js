function randomString() {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    var str = '';
    for (var i = 0; i < 10; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
};

function random_col() {
    var color = '#',
        letters = ['9C6B77','633818','20a0b1','35a707','ff8d00','1d61ae','781111'];
        color += letters[Math.floor(Math.random() * letters.length)];
    
    return color
};

$(function() {

//BODY
    var body = {
            name: 'Kanban body',
            addBoard: function(board) {
                this.$element.append(board.$element);
            },
            $element: $('#body')
        },
        btnNewBoard = $('#newBoard-btn');

    btnNewBoard.on('click', function() {
        var boardTitle = prompt("Enter the name of the board"),
        board = new Board(boardTitle);
        
        body.addBoard(board);
    });

//BOARD

    function Board(title) {
        var self = this;

        this.id = randomString();
        this.title = title || "New board";
        this.$element = createBoard();

        function createBoard() {

            //BOARD COMPONENTS

            var $board = $('<div>').addClass('board'),
                $boardTitle = $('<h2>').addClass('board-title').text(self.title),
                $boardColumnContainer = $('<div>').addClass('column-container'),
                $boardDelete = $('<button>').addClass('btn-delete').text('x'),
                $boardAddColumn = $('<button>').addClass('create-column').text('Add a column');
            
            //BOARD ACTIONS

            $boardDelete.click(function() {
                self.removeBoard();
            });
            $boardAddColumn.click(function() {
                self.addColumn(new Column(prompt("Enter the name of the column")));
            });

            //BOARD ELEMENTS

            $board.append($boardTitle)
                .append($boardDelete)
                .append($boardAddColumn)
                .append($boardColumnContainer);

            return $board;
        };
    };

    Board.prototype = {
        addColumn: function(column) {
          this.$element.children('div').append(column.$element);
          initSortable();          
        },
        removeBoard: function() {
          this.$element.remove();
        }
    };

//COLUMN

    function Column(name) {
        var self = this;

        this.id = randomString();
        this.name = name || "New column";
        this.$element = createColumn();

        function createColumn() {

            //COLUMN COMPONENTS

            var $column = $('<div>').addClass('column'),
                $columnTitle = $('<h2>').addClass('column-title').text(self.name),
                $columnCardList = $('<ul>').addClass('column-card-list'),
                $columnDelete = $('<button>').addClass('btn-delete').text('x'),
                $columnAddCard = $('<button>').addClass('add-card').text('Add a card');
            
            //COLUMN ACTIONS

            $columnDelete.click(function() {
                self.removeColumn();
            });
            $columnAddCard.click(function() {
                self.addCard(new Card(prompt("Enter the name of the card")));
            });

            //COLUMN ELEMENTS

            $column.append($columnTitle)
                .append($columnDelete)
                .append($columnAddCard)
                .append($columnCardList);

            return $column;
        };
    };

    Column.prototype = {
        addCard: function(card) {
          this.$element.children('ul').append(card.$element);
        },
        removeColumn: function() {
          this.$element.remove();
        }
    };

//CARD

    function Card(description) {
        var self = this;
    
        this.id = randomString();
        this.description = description || "New card";
        this.$element = createCard();
    
        function createCard() {

            //CARD COMPONENTS

            var $card = $('<li>').addClass('card').css("background-color", random_col()),
                $cardDescription = $('<p>').addClass('card-description').text(self.description),
                $cardDelete = $('<button>').addClass('btn-delete').text('x');
            
            //CARD ACTIONS

            $cardDelete.click(function(){
                self.removeCard();
            });

            //CARD ELEMENTS

            $card.append($cardDelete)
                .append($cardDescription);

            return $card;
        }
    };

    Card.prototype = {
        removeCard: function() {
            this.$element.remove();
        }
    };

//MOVING CARDS

    function initSortable() {
        $('.column-card-list').sortable({
            connectWith: '.column-card-list',
            placeholder: 'card-placeholder'
        }).disableSelection();
    };

//CREATING COLUMN

    $('.create-column').click(function(){
        var name = prompt('Enter a column name'),
            column = new Column(name);
        board.addColumn(column);
    });


//DEFAULT ELEMENTS

    // CREATING BOARD

    var board = new Board('Kanban Board');

    // ADDING BOARD TO THE BODY

    body.addBoard(board);

    // CREATING COLUMNS

    var todoColumn = new Column('To do'),
        doingColumn = new Column('Doing'),
        doneColumn = new Column('Done');

    // ADDING COLUMNS TO THE BOARD

    board.addColumn(todoColumn);
    board.addColumn(doingColumn);
    board.addColumn(doneColumn);

    // CREATING CARDS

    var card1 = new Card('New task'),
        card2 = new Card('Create kanban boards'),
        card3 = new Card('Done!');

    // ADDING CARDS TO COLUMNS

    todoColumn.addCard(card1);
    doingColumn.addCard(card2);
    doneColumn.addCard(card3);
});