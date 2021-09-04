modules["new-colleague"] = function (html) {

// $(function () {
  //   var modal = $('#myModal');
  var modal = document.getElementById("myModal");
  var sidepanel = document.getElementById("mySidepanel");
  var selectedID;

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
        console.log("yay!");
        // debugger
        var tr = $(`
        <tr data-col-id="${
          res.id
        }" oncontextmenu="javascript:alert('success!');return false;">
        <td>${res.firstname + " " + res.lastname}</td>
        <td>${res.personalemail}</td>
        <td>${res.jobtitle}</td>
        <td>some workgroup</td>
        <td>
        ${res.startdate}
        </td>
        <td>
        ${res.enddate}
        </td>
        <!-- <td><a href="javascript:" class="view-link">View</a></td> -->
        </tr>
        `);
        $("#colleagues tbody").append(tr);

        tr.on("click", function () {
          var tr = $(this);
          var colID = tr.data("col-id");
          if (selectedID) {
            //just closes the sidepanel
            sidepanel.style.width = "0px";
            selectedID = "";
          } else {
            app.ajax({
              url: "/colleagues/" + colID,
              success: function (res) {
                $(".sidepanel").html(res);
                sidepanel.style.width = "400px";
                selectedID = colID;
              },
            });
          }
        });
        modal.style.display = "none";
        $(".success-msg")
          .html("Added Successfully")
          .show()
          .delay(2500)
          .fadeOut();
      },
    });
  });
// });
}
