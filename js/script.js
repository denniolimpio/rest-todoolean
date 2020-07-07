$(document).ready(function () {

// richiamo l'api
todoList ();


  $("#addText").click( function (){



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



  todoList ();



});


});

// fine document ready




// ------- funzioni -------

// con questa funzione richiamo la mia api

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

//reset
function reset () {
  $("#todo-list").html("");

}

// salvo i valori della input nella Api cosi da vederlo anche al refresh della pagina
