modules["view"] = function (html) {
  // $(function () {

  var ul = html.find("ul");
  var id = html.find('form input[name="id"]').val();

  jQuery.get("/workgroups/" + id + "/notadmins", function (data) {
    html.find("#autoc").autocomplete({ source: data });
  });
  var availableTags = [
    { id: "1", label: "a" },
    { id: "1", label: "aa" },
    { id: "1", label: "axa" },
    { id: "1", label: "abba" },
  ];

  html
    .find("#autoc")
    .autocomplete({
      minLength: 0,
      select: function (event, ui) {
        html.find("#stage-admin").val(ui.item.id);
      },
    })
    .on("focus", function () {
      $(this).autocomplete("search", "");
    });

  function removeUser(a) {
    var id = a.siblings("p").data("user-id");
    var name = a.siblings("p").html();
    var obj = html.find("#autoc").autocomplete("option", "source");
    obj.unshift({ id: id, label: name });
    JSON.stringify(obj);
    // source.unshift({ id: id, label: name });
    $("#autoc").autocomplete("option", "source", obj);
    a.closest("div").remove();
  }

  //stage new admins for adding
  html.find("a.add-admin").on("click", function () {
    var source = html.find("#autoc").autocomplete("option", "source");
    var id = html.find("#stage-admin").val();
    source = $.grep(source, function (e) {
      return e.id != id;
    });
    html.find("#autoc").autocomplete("option", "source", source);
    console.log(
      `id: ${html.find("#stage-admin").val()}, label: ${html
        .find("#autoc")
        .val()}
      `
    );
    var el =
      $(`<div><a class="remove inline" href="javascript:">Remove</a>    <p class="inline" data-user-id="${html
        .find("#stage-admin")
        .val()}">${html.find("#autoc").val()}</p></div>
      `);

    html.find("#stage-admin").val("");
    html.find("#autoc").autocomplete("close").val("");
    html.find("div.stage").append(el);

    var a = el.find("a.remove");
    // console.log(a.siblings("p").data("user-id"));
    a.on("click", function () {
      removeUser(a);
    });
  });

  // remove admins
  // $("div.list a").on("click", ".remove", function () {
  //   console.log("clicked remove");
  // });

  html.find("form.view").on("submit", function (e) {
    e.preventDefault();
    var form = $(this);
    var formData = form.serialize();
    $.ajax({
      url: "/colleagues",
      type: "POST",
      data: formData,
      success: function (res) {
        $(".success-msg")
          .html("Updated Successfully")
          .show()
          .delay(1800)
          .fadeOut();
      },
    });
  });

  html.find("#delete-btn").on("click", function () {
    var r = confirm("Press a button!");
    if (r == true) {
      var colID = $(this).siblings('input[name="id"]').val();
      console.log("got into delete");
      $.ajax({
        url: "/colleagues/" + colID,
        type: "DELETE",
        success: function ({ result }) {
          if (result == 1) {
            $(".success-msg")
              .html("Deleted Successfully")
              .show()
              .delay(1800)
              .fadeOut();
          } else {
            debugger;
          }
        },
      });
    } else {
      // txt = "You pressed Cancel!";
    }
  });

  //end
  // });
};
