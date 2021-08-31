$(function () {
//   var modal = $('#myModal');
  var modal = document.getElementById("myModal");

  $("form.new").on("submit", function (e) {
    e.preventDefault();
    var form = $(this);
    console.log($(this).serialize());
    var formData = form.serialize();

    $.ajax({
      url: "/colleagues",
      type: "POST",
      data: formData,
      success: function (res) {
        var { p_id } = res;
        console.log("yay!");
        modal.style.display = "none";
      },
    });
  });
});
