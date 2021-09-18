var modules = {};
// var modal = $("#myModal");
var modal = document.getElementById("myModal");
var selectedID, active;
var sidepanel = $("#mySidepanel");
var u = "";

$(window).on("hashchange", function () {
  var url = location.hash.replace(/#/g, "");
  if (url === "/") {
  }
  if (url === "/" + active) return;
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
      active = url.split("/")[1];
      if (url === "/") {
        $(document).html(response);
      }
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
      // options.data = { user: u };
      options.headers = {
        "Content-Type": "application/json",
        user: u,
      };
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

//document.ready
$(function () {
  var body = $("body");

  const target = document.querySelector(".sidepanel");
  const tabs = document.querySelector(".tabs");
  document.addEventListener("click", (event) => {
    // event.preventDefault();
    const withinBoundaries = event.composedPath().includes(target);
    if (
      selectedID?.match(
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/g
      )
    ) {
      //if sidepanel is open
      if (withinBoundaries) {
        // target.innerText = "Click happened inside element";
      } else if (event.composedPath().includes(tabs)) {
        selectedID = "";

        $(".sidepanel").empty().width(0);
      } else {
        $(".sidepanel").empty().width(0);
        selectedID = "";
        location.hash = "/" + active;
      }
    }
  });

  $("#select-user").change(function () {
    u = $(this).val();
    alert(`user changed: ${u}`);
    $.ajax({
      url: "/",
      data: { user: u },
      headers: {
        "Content-Type": "application/json",
        user: u,
      },
      success: function (res) {
        location.hash = "/";
      },
    });
  });

  // $("#main").on("click", "table#colleagues tbody tr", function () {
  //   var tr = $(this);
  //   var colID = tr.data("col-id");

  //   if (selectedID) {
  //     // $(".sidepanel").width(0);
  //     // selectedID = "";
  //     // location.hash = active;
  //   } else {
  //     location.hash = "/colleagues/" + colID;
  //   }
  // });

  // $("#main").on("click", "table#workgroups tbody tr", function () {
  //   var tr = $(this);
  //   var wg_id = tr.data("wg-id");

  //   if (selectedID) {
  //     // $(".sidepanel").width(0);
  //     // selectedID = "";
  //     // location.hash = active;
  //   } else {
  //     location.hash = "/workgroups/" + wg_id;
  //   }
  // });

  $("#main").on("click", "table tbody tr", function () {
    var tab = $(this).closest("table").attr("id");
    var tr = $(this);
    var id = tr.data("id");

    if (selectedID) {
      // $(".sidepanel").width(0);
      // selectedID = "";
      // location.hash = active;
    } else {
      location.hash = `/${tab}/` + id;
    }
  });

  $("a.closebtn").on("click", function () {
    selectedID = "";

    $(".sidepanel").empty().width(0);
  });

  $("#main").on("click", "#add-colleague", function () {
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

  //end
});

$(window).trigger("hashchange");
