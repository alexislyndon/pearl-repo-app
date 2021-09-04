modules["view-colleague"] = function (html) {

// $(function () {
  $("form.view").on("submit", function (e) {
    e.preventDefault();
    var form = $(this);
    var formData = form.serialize();
    console.log("got into submit handler");
    //update
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
        setTimeout(function () {
          window.location.reload();
        }, 2000);
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
            setTimeout(function () {
              window.location.reload();
            }, 2000);
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
}
