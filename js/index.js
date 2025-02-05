//Menu event listener
//Store table data in an array
var cells = document.querySelectorAll("td");
//Add listener to table cells
for (var cell of cells) {
  cell.addEventListener('click', setCategory)
}

//Functions
function setCategory() {
  //Store the selected category name in a variable
  var category = this.textContent;
  //Set the category title in local storage
  localStorage.setItem("cat", category);
  consol.log(category + " is selected.");
}