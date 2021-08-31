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
        console.log("yay!");
        // debugger
        var html = `
        <tr data-col-id="${res.id}" oncontextmenu="javascript:alert('success!');return false;">
        <td>${res.firstname +" "+res.lastname}</td>
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
        `;
        $('#colleagues tbody').append(html);
        modal.style.display = "none";
        form.find(".success-msg").show().delay(3000).fadeOut();
      },
    });
  });
});
