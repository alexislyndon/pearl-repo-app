modules["view"] = function (html) {
  var id = html.find('form input[name="id"]').val();
  var route = $("div.view").data("tab");
  jQuery.get(`/${route}/` + id + "/notadmins", function (data) {
    html.find("#autoc").autocomplete({ source: data });
  });

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
    $("#autoc").autocomplete("option", "source", obj);
    a.closest("div").remove();
  }

  //stage new admins for adding
  html.find("a.add-admin").on("click", function () {
    if (!html.find("#stage-admin").val()) return alert("pls select a person"); //return if hidden input is empty
    var source = html.find("#autoc").autocomplete("option", "source");
    var id = html.find("#stage-admin").val();
    source = $.grep(source, function (e) {
      return e.id != id;
    });
    html.find("#autoc").autocomplete("option", "source", source);
    // console.log(
    //   `id: ${html.find("#stage-admin").val()}, label: ${html
    //     .find("#autoc")
    //     .val()}
    //   `
    // );
    var el =
      $(`<div><a class="remove inline" href="javascript:">Remove</a>    <p name="users" class="inline" data-user-id="${html
        .find("#stage-admin")
        .val()}">${html.find("#autoc").val()}</p></div>
      `);

    // appendDiv(html.find("div.stage"), html.find("#stage-admin"), html.find("#autoc").val());
    html.find("#stage-admin").val(""); //clear hidden input
    html.find("#autoc").autocomplete("close").val(""); // close autocomplete and clear value
    html.find("div.stage").append(el); //finally, append "candidate" admin to the list

    var a = el.find("a.remove"); //bind click event handler for newly appended elements above
    a.on("click", function () {
      removeUser(a);
    });
  });

  function appendDiv(div, id, name) {
    var el = `<div><a class="remove inline" href="javascript:">Remove</a>    <p name="users" class="inline" data-user-id="${id}">${name}</p></div>`;
    $(div).append(el);
  }

  html.find("a.remove").on("click", function () {
    //click handler for existing admins
    removeUser($(this));
  });

  //submit wg form
  html.find("form#wg-form").on("submit", function (e) {
    e.preventDefault();
    var users = html
      .find("p[data-user-id]")
      .map(function () {
        return $(this).attr("data-user-id");
      })
      .get();

    $.ajax({
      url: `/workgroups`,
      type: "POST",
      data: { id: id, users: users },
      success: function (res) {
        $("div.stage").children().appendTo("div.admins");
        // console.log(res);
        $(".indicator")
          .addClass("saved")
          .html("Updated Successfully")
          .show()
          .delay(1800)
          .fadeOut();
        setTimeout(() => {
          $(".indicator").removeClass("saved");
        }, 3500);
      },
    });
  });

  //submit colleague form
  html.find("form#col-form").on("submit", function (e) {
    e.preventDefault();
    var tab = $(this).closest("div.view").data("tab");
    var form = $(this);
    var formData = form.serialize();

    $.ajax({
      url: `/${tab}`,
      type: "POST",
      data: formData,
      success: function (res) {
        $(".success-msg")
          .html("Updated Successfully")
          .show()
          .delay(1800)
          .fadeOut();
        setTimeout(() => {
          $(".indicator").removeClass("saved");
        }, 3500);
      },
    });
  });

  // submit app form
  html.find("form#a-form").on("submit", function (e) {
    e.preventDefault();
    var users = html
      .find("p[data-user-id]")
      .map(function () {
        return $(this).attr("data-user-id");
      })
      .get();

    $.ajax({
      url: `/apps`,
      type: "POST",
      data: { id: id, users: users },
      success: function (res) {
        $("div.stage").children().appendTo("div.admins");
        // console.log(res);
        $(".indicator")
          .addClass("saved")
          .html("Updated Successfully")
          .show()
          .delay(1800)
          .fadeOut();
        setTimeout(() => {
          $(".indicator").removeClass("saved");
        }, 3500);
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
