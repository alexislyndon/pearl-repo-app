var modules = {};
// var modal = $("#myModal");
var modal = document.getElementById("myModal");
var selectedID, active;
var sidepanel = $("#mySidepanel");

$(window).on("hashchange", function () {
  var url = location.hash.replace(/#/g, "");
  // debugger;
  if (!url) {
    return $("#mySidepanel").empty();
  }

  if (url.substring(0, 1) !== "/") {
    url = "/" + url;
  }

  app.ajax({
    url: url,
    success: function (response) {
      selectedID = url.split("/").pop();
      active = selectedID;
      if (
        selectedID.match(
          /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/g
        )
      ) {
        $("#mySidepanel").html(response).width(400);
      } else {
        selectedID = "";
        $("#main").html(response);
      }
    },
  });
});

var app = (function () {
  function bindScripts(html) {
    var scriptAttr = html.parent().find("[data-scripts]");

    if (!scriptAttr[0]) return;

    for (var item of scriptAttr) {
      item = $(item);

      var scriptName = item.data("scripts");

      item.removeAttr("data-scripts");

      // if (!scriptName) throw 'scriptname is empty';
      if (scriptName) {
        for (var name of scriptName.split(" ")) {
          var target = modules[name];

          if (!target) return;

          target(item);
        }
      }
    }
  }

  return {
    ajax: function (options) {
      if (options.success) {
        var success = options.success;

        options.success = function (response, textStatus, xhr) {
          var ishtml = /<\/?[a-z][\s\S]*>/i.test(response);

          if (ishtml) {
            response = $(response);
          }

          success(response, textStatus, xhr);

          if (ishtml) {
            bindScripts(response);
          }
        };
      }

      $.ajax(options);
    },
  };
})(); ///

///////////////////
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

  $("table tbody tr").on("click", function () {
    var tr = $(this);
    var colID = tr.data("col-id");

    if (selectedID) {
      $(".sidepanel").width(0);
      selectedID = "";
      location.hash = "";
    } else {
      location.hash = "/colleagues/" + colID;
    }
  });

  $("a.closebtn").on("click", function () {
    sidepanel.style.width = "0px";
    // sidepanel.animate({width:'0px', opacity: '0.5'})
    selectedID = "";
  });

  $("#add-colleague").on("click", function () {
    app.ajax({
      url: "/colleagues/new",
      success: function (res) {
        $("#myModal").html(res).show();
        // $(modal).fadeIn(500);
      },
    });
  });

  //tabs

  $(".tab").on("click", function (e) {
    // e.preventDefault();
    $(".tab").removeClass("active-tab");
    var tab = $(this);
    location.hash = tab.data("url");
    tab.addClass("active-tab");
  });

  //tabs end

  window.onclick = function (event) {
    var modal = document.getElementById("myModal");

    if (event.target == modal) {
      // modal.style.display = "none";
      var m = $("#myModal").find("*").addBack();
      $(m).fadeOut(200, function () {
        // modal.style.display = "none";
        $(modal).empty();
      });
    }
  };

  const target = document.querySelector(".sidepanel");
  document.addEventListener("click", (event) => {
    const withinBoundaries = event.composedPath().includes(target);

    if (selectedID) {
      //if sidepanel is open
      if (withinBoundaries) {
        // target.innerText = "Click happened inside element";
      } else {
        $(".sidepanel").width(0);
        selectedID = "";
        location.hash = "";
      }
    }
  });
  //

  //end
});
$(window).trigger("hashchange");
