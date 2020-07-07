// document ready start
$(document).ready(function () {

  // richiamo l'api con l'elenco delle cose da cosaDaFare

  todoList ();

  // dichiaro le mie variabili:
  var aggiungi = $('#addText');


  // Quando clicco sulla barra spaziatrice  (..):
  // -- > salvo il contenuto della input sul server     saveInput ()
  // -- > refresho la pagina e mostro il nuovo elemento a schermo
  $("#inputBar").keypress ( function () {


    if (event.which === 13 || event.keyCode === 13) {

      saveInput ()
      todoList ();

    }

  });


  // Quando clicco sul bottone aggiungi  genero un evento:
  // -- > salvo il contenuto della input sul server     saveInput ()
  // -- > refresho la pagina e mostro il nuovo elemento a schermo
  aggiungi.click( function (){
    saveInput ()
    todoList ();

  });


  // Quando clicco sul bottone delete ( X )  genero un evento:
  // -- > elimino l'elemento cliccato
  $(document).on('click', '.deleteText', function () {

    var elementID  = $(this).parent().attr("data-id");

    deleteElementList (elementID)
    // alert("click elimina");

  });


});

// fine document ready






// ==========         - --   FUNZIONI   -- -                ============

// === #1 FUNZIONE todoList
// con questa funzione richiamo la mia api porta :3021/todos
// ottengo gli elementi della lista

function todoList () {

  reset();

  $.ajax( {

    url: "http://157.230.17.132:3021/todos",
    method: 'GET', // leggo
    success: function(dataResponse) {

      if( dataResponse.length > 0) {

        var source = $("#list-template").html();
        var template = Handlebars.compile(source);

        for (var i = 0; i < dataResponse.length; i++) {

          var cosaDaFare = dataResponse[i];
          var html = template(cosaDaFare);


          $("#todo-list").append(html);
        }
      }

    },
    error: function () {

      console.log("si è verificato un errore")

    }

  })

}
// === FINE FUNZIONE todoList




// === #2 FUNZIONE // saveInput
// Creo una funzione che mi permette di salvare il contenuto della input sul server

function saveInput () {

  // leggo il contenuto della input
  var input = $("input").val();

  if ( input.length > 0 ) {

    $.ajax ( {

      url: "http://157.230.17.132:3021/todos",
      method: 'POST', // leggo
      data: {
        text: input
      },
      success: function(dataResponse) {
      },

      error: function () {

      }

    })

  } else {

    alert( " attenzione, il campo di testo è vuoto");
  }

  $("#inputBar").val("");

}

// === FINE FUNZIONE saveInput



// === #3 FUNZIONE  deleteElementList
// -- > function deleteElementList mi permette di eliminare singolarmente gli elementi della lista
// -- >  gli elementi vengono eliminati anche dal server

function deleteElementList (elementID) {

  $.ajax ( {

    url: "http://157.230.17.132:3021/todos/" + elementID, // aggiungo l'id corrispondente all'elemento della lsita
    method: 'DELETE',
    success: function(dataResponse) {

        // console.log(dataResponse)

        todoList ()
    },

    error: function() {

      alert("ops, qualcosa è andato storto");
    }

  })

}

// === FINE FUNZIONE  deleteElementList



// === #4 FUNZIONE  reset
// -- > refresho in contenuto della pagina ogni volta che aggiungo un nuovo elemento nella lista

function reset () {

  $("#todo-list").html("");

}

// === FINE  FUNZIONE  reset
