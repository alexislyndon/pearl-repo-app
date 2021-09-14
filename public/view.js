modules["view"] = function (html) {
  $(function () {
    
    var availableTags = [
      { id: "1", label: "a" },
      { id: "1", label: "aa" },
      { id: "1", label: "axa" },
      { id: "1", label: "abba" },
    ];

    var id = $(this).siblings('input[name="id"]').val();

    var options = {
      url: '/workgroups/' + id + '/nadmins',
      success: function(res) {
        alert('yays!')
      }
    }

    $("#autoc")
      .autocomplete({
        source: $.ajax(options),
        minLength: 0,
        open: function () {
          console.log("openedview");
        },
      })
      .on("focus", function () {
        $(this).autocomplete("search", "");
      });

    $("#autoc").on("autocompletecreate", function (event, ui) {
      alert("created");
    });

    $("form.view").on("submit", function (e) {
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
          // setTimeout(function () {
          //   window.location.reload();

          // }, 2000);
        },
      });
    });

    $("#delete-btn").on("click", function () {
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
              // setTimeout(function () {
              //   window.location.reload();
              // }, 2000);
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
  });
};
