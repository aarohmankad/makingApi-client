// Create a request object we will be using
var request = new Request();

/**
 * when the form is submitted, execute code to add student
 * @param event {Object} event information on form submittion
 */
document.getElementById('studentForm').addEventListener('submit', function(event) {
  // Prevent default action of submitting a form
  event.preventDefault();

  // Create a parameters object for sending to api
  var params = {
    name: document.getElementById('name').value,
    age: parseInt(document.getElementById('age').value),
    id: document.getElementById('identification').value,
    gender: document.getElementById('gender').value,
  };

  // Send post request to api endpoint
  request.send({
    method: 'POST',
    url: 'http://localhost:8000/api/students',
    data: params,
  }, function(err, data) {
    if (err) {
      console.log(err);
    }

    // Print the data after we receive it
    addDataToHTML(data);
  });
});

/**
 * when the update form is submitted, execute code to add student
 * @param event {Object} event information on form submission
 */
document.getElementById('updateStudentForm').addEventListener('submit', function(event) {
  // Prevent default action of submitting a form
  event.preventDefault();

  // Create a parameters object for sending to api
  var params = {
    name: document.getElementById('updateName').value,
    age: parseInt(document.getElementById('updateAge').value),
    gender: document.getElementById('updateGender').value,
  };

  // Send post request to api endpoint
  request.send({
    method: 'PUT',
    url: 'http://localhost:8000/api/students/' + document.getElementById('updateIdentification').value,
    data: params,
  }, function(err, data) {
    if (err) {
      console.log(err);
    }

    // Print the data after we receive it
    document.getElementById('getAllStudents').click();
  });
});

/**
 * when the delete form is submitted, execute code to add student
 * @param event {Object} event information on form submission
 */
document.getElementById('deleteStudentForm').addEventListener('submit', function(event) {
  // Prevent default action of submitting a form
  event.preventDefault();

  // Send post request to api endpoint
  request.send({
    method: 'DELETE',
    url: 'http://localhost:8000/api/students/' + document.getElementById('deleteIdentification').value,
  }, function(err, data) {
    if (err) {
      console.log(err);
    }

    // Print the data after we receive it
    document.getElementById('getAllStudents').click();
  });
});

/**
 * When the get students button is clicked, execute this code
 */
document.getElementById('getAllStudents').addEventListener('click', function() {
  // Send get request to server for all students
  request.send({
    method: 'GET',
    url: 'http://localhost:8000/api/students',
  }, function(err, data) {
    if (err) {
      console.log(err);
    }

    // Print all student when we receive them
    replaceHTMLWithData(data);
  });
});

/**
 * adds student data to students table
 * @param data {Object} new student data
 */
function addDataToHTML (data) {
  // Create row for new student
  var row = document.createElement('tr');
  // Create columns of attributes
  var nameCol = document.createElement('td');
  var ageCol = document.createElement('td');
  var idCol = document.createElement('td');
  var genderCol = document.createElement('td');

  // Set content of columns 
  nameCol.innerHTML = data.name;
  ageCol.innerHTML = data.age;
  idCol.innerHTML = data.id;
  genderCol.innerHTML = data.gender;

  // Add all columns to the row
  row.appendChild(nameCol);
  row.appendChild(ageCol);
  row.appendChild(idCol);
  row.appendChild(genderCol);

  // Add row to table
  document.getElementById('students').appendChild(row);
}

/**
 * empties students table and adds all students to it
 * @param data {Array} array of student data
 */
function replaceHTMLWithData (data) {
  // empty students table
  document.getElementById('students').innerHTML = '';

  // Loop through all students
  for (var i = 0; i < data.length; i++) {
    // Create row for new student
    var row = document.createElement('tr');
    // Create columns of attributes
    var nameCol = document.createElement('td');
    var ageCol = document.createElement('td');
    var idCol = document.createElement('td');
    var genderCol = document.createElement('td');

    // Set content of columns 
    nameCol.innerHTML = data[i].name;
    ageCol.innerHTML = data[i].age;
    idCol.innerHTML = data[i].id;
    genderCol.innerHTML = data[i].gender;

    // Add all columns to the row
    row.appendChild(nameCol);
    row.appendChild(ageCol);
    row.appendChild(idCol);
    row.appendChild(genderCol);

    // Add row to table
    document.getElementById('students').appendChild(row);
  }
}
