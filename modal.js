// Get the modal
var modal1 = document.getElementById("myModal1");
var modal2 = document.getElementById("myModal2");
var modal3 = document.getElementById("myModal3");
var modal4 = document.getElementById("myModal4");

// Get the button that opens the modal
var info1 = document.getElementById("info1");
var info2 = document.getElementById("info2");
var info3 = document.getElementById("info3");
var info4 = document.getElementById("info4");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
info1.onclick = function() {
  modal1.style.display = "block";
}
// When the user clicks the button, open the modal
info2.onclick = function() {
  modal2.style.display = "block";
}
// When the user clicks the button, open the modal
info3.onclick = function() {
  modal3.style.display = "block";
}
// When the user clicks the button, open the modal
info4.onclick = function() {
  modal4.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
close1.onclick = function() {
    modal1.style.display = "none";
  }
close2.onclick = function() {
    modal2.style.display = "none";
  }
close3.onclick = function() {
    modal3.style.display = "none";
  }
close4.onclick = function() {
    modal4.style.display = "none";
  }

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal1) {
    modal1.style.display = "none";
  }
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
  if (event.target == modal3) {
    modal3.style.display = "none";
  }
  if (event.target == modal4) {
    modal4.style.display = "none";
  }
}
