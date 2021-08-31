$.ajaxSetup({
  beforeSend: function () {
    $("#loader").show();
  },
  complete: function () {
    $("#loader").fadeOut();
  },
});

$(function () {
  var body = $("body");
  // var span = document.getElementsByClassName("close")[0];
  // span.onclick = function () {
  //   modal.style.display = "none";
  // };
  // // When the user clicks anywhere outside of the modal, close it

  var sidepanel = document.getElementById("mySidepanel");
  var modal = document.getElementById("myModal");
  var selectedID;

  $("table tbody tr").on("click", function () {
    var tr = $(this);
    var colID = tr.data("col-id");
    if (selectedID) {
      //just closes the sidepanel
      sidepanel.style.width = "0px";
      selectedID = "";
    } else {
      $.ajax({
        url: "/colleagues/" + colID,
        success: function (res) {
          $(".sidepanel").html(res);
          sidepanel.style.width = "400px";
          selectedID = colID;
        },
      });
    }
  });

  $("a.closebtn").on("click", function () {
    sidepanel.style.width = "0px";
    // sidepanel.animate({width:'0px', opacity: '0.5'})
    selectedID = "";
  });

  $("#add-colleague").on("click", function () {
    $.ajax({
      url: "/colleagues/new",
      success: function (res) {
        $("#myModal").html(res);
        modal.style.display = "block";
        // $(modal).fadeIn(500);
      },
    });
  });

  window.onclick = function (event) {
    if (event.target == modal) {
      // modal.style.display = "none";
      var m = $("#myModal").find("*").addBack();
      $(m).fadeOut(200, function () {
        modal.style.display = "none";
      });
    }
  };

  var side = $(".sidepanel").find("*").addBack();

  // $("html > *")
  //   .not(side)
  //   .on("click", function (e) {
  //     // sidepanel.css('width', $(sidepanel).width() > 0 ? '0' : '');
  //     if ($(sidepanel).width() > 0) {
  //       sidepanel.style.width = "0px";
  //       selectedID = "";
  //     }
  //   });

  //
  const target = document.querySelector(".sidepanel");

  document.addEventListener("click", (event) => {
    const withinBoundaries = event.composedPath().includes(target);

    if (selectedID) {
      if (withinBoundaries) {
        // target.innerText = "Click happened inside element";
      } else {
        sidepanel.style.width = "0px";
        selectedID = "";
      }
    }
  });
  //

  //end
});
