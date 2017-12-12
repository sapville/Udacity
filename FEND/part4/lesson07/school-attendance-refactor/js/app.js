/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */
function createAttendance (names) {

  function getRandom () {
    return (Math.random() >= 0.5);
  }

  if (!localStorage.attendance) {
    console.log('Creating attendance records...');

    const attendance = {};

    names.each(function () {
      var name = this.innerText;
      attendance[name] = [];

      for (var i = 0; i <= 11; i++) {
        attendance[name].push(getRandom());
      }
    });

    localStorage.attendance = JSON.stringify(attendance);
  }
}

/* STUDENT APPLICATION */
function old () {
  var attendance = JSON.parse(localStorage.attendance),
    $allMissed = $('tbody .missed-col'),
    $allCheckboxes = $('tbody input');

  // Count a student's missed days
  function countMissing () {
    $allMissed.each(function () {
      var studentRow = $(this).parent('tr'),
        dayChecks = $(studentRow).children('td').children('input'),
        numMissed = 0;

      dayChecks.each(function () {
        if (!$(this).prop('checked')) {
          numMissed++;
        }
      });

      $(this).text(numMissed);
    });
  }

  // Check boxes, based on attendace records
  $.each(attendance, function (name, days) {
    var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
      dayChecks = $(studentRow).children('.attend-col').children('input');

    dayChecks.each(function (i) {
      $(this).prop('checked', days[i]);
    });
  });

  // When a checkbox is clicked, update localStorage
  $allCheckboxes.on('click', function () {
    var studentRows = $('tbody .student'),
      newAttendance = {};

    studentRows.each(function () {
      var name = $(this).children('.name-col').text(),
        $allCheckboxes = $(this).children('td').children('input');

      newAttendance[name] = [];

      $allCheckboxes.each(function () {
        newAttendance[name].push($(this).prop('checked'));
      });
    });

    countMissing();
    localStorage.attendance = JSON.stringify(newAttendance);
  });

  countMissing();
}

const App = function (data, view) {
  this.data = data;
  this.view = view;
};

App.prototype.init = function () {
  this.data.addStudent('st1', 'Slappy the Frog');
  this.data.addStudent('st2', 'Lilly the Lizard');
  this.data.addStudent('st3', 'Paulrus the Walrus');
  this.data.addStudent('st4', 'Gregory the Goat');
  this.data.addStudent('st5', 'Adam the Anaconda');
  this.data.createAttendance();
  this.drawTable();
};

App.prototype.getAttendance = function (id) {
  return this.data.attendance.find(function (attend) {return attend.id === id;});
};

App.prototype.drawTable = function () {
  this.view.drawHeader(this.data.colNum);
  for (let i = 0; i < this.data.students.length; i++) {
    const id = this.data.students[i].id;
    this.view.drawTableLine(
      this.data.students[i].name,
      this.data.students[i].id,
      this.data.attendance.filter(function (attendance) {
        if (attendance.id === id) {return attendance;}
      }));
  }
};

const Data = function (colNum) {
  this.students = [];
  this.attendance = [];
  this.colNum = colNum;
};

Data.prototype.addStudent = function (id, name) {
  this.students.push({id, name});
};

Data.prototype.createAttendance = function () {
  function getRandom () {
    return (Math.random() >= 0.5);
  }

  if (this.attendance.length === 0) {
    for (let y = 0; y < this.students.length; y++) {
      for (let i = 0; i <= this.colNum - 1; i++) {
        this.attendance.push({
          id: this.students[y].id,
          col: i,
          attend: getRandom()
        });
      }
    }
  }

};

const View = function () {
};

View.prototype.drawHeader = function (colNum) {
  for (let i = 0; i < colNum; i++) {
    const lastCol = $('.missed-col');
    lastCol.before(`<th>${i + 1}</th>`);
  }
};

View.prototype.drawTableLine = function (name, id, attendance) {
  const tbody = $('tbody');
  let attendNum = 0;

  tbody.append('<tr class="student">');
  tbody.children('.student').last().append(`<td class="name-col">${name}</td>`);
  for (let i = 0; i < attendance.length; i++) {
    const checked = attendance[i].attend ? 'checked' : '';
    tbody.find('.name-col').last().after(`<td class="attend-col ${id}"><input type="checkbox" ${checked}></td>`);
    if (checked) {
      attendNum++;
    }
  }
  tbody.find('.attend-col').last().after(`<td class="missed-col ${id}">${attendNum}</td>`);
};

$(function () {
  const app = new App(new Data(12), new View());
  app.init();
}());
