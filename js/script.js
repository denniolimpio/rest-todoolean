$(document).ready(function () {

  // dichiaro le mie variabili:
  var aggiungi = $('#addText');
  var elimina = $('#deleteText');
  // richiamo l'api con l'elenco delle cose da cosaDaFare
  todoList ();


// Quando clicco sul bottone aggiungi  genero un evento:
// -- > salvo il contenuto della input sul server     saveInput ()
// -- > refresho la pagina e mostro il nuovo elemento a schermo
    aggiungi.click( function (){
    saveInput ()
    todoList ();
  });


// Quando clicco sul bottone delete ( X )  genero un evento:
// -- > elimino l'elemento cliccato
  $(document).on('click', elimina, function () {

    alert ( "hai cliccato elimina");
    
  });



});

// fine document ready




// ------- funzioni -------


// con questa funzione richiamo la mia api porta :3021/todos

function todoList () {

  reset();

  $.ajax( {

    url: "http://157.230.17.132:3021/todos",
    method: "GET", // leggo
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


// Creo una funzione che mi permette di salvare il contenuto della input sul server

function saveInput () {

 // leggo il contenuto della input
  var input = $("input").val();

  if ( input.length > 0 ) {

    $.ajax ( {

      url: "http://157.230.17.132:3021/todos",
      method: "POST", // leggo
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
}


//reset, refresho in contenuto della pagina ogni volta che aggiungo un nuovo elemento nella lista
function reset () {
  $("#todo-list").html("");

}

// salvo i valori della input nella Api cosi da vederlo anche al refresh della pagina
