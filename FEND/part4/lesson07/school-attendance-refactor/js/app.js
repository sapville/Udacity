'use strict';
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
  this.view.setHandlers(this);
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

App.prototype.checkboxClick = function (id, col) {
  const idx = this.data.attendance.findIndex(function (elem) {
    return elem.col === Number(col) && elem.id === id;
  });
  this.data.attendance[idx].attend = !this.data.attendance[idx].attend;
  this.view.updateMissedCol(id, this.data.attendance.filter(function (elem) {
    return elem.id === id && !elem.attend;
  }).length);
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
  for (let i = attendance.length - 1; i >= 0; i--) {
    const checked = attendance[i].attend ? 'checked' : '';
    tbody.find('.name-col').last().after(
      `<td class="attend-col"><input id="${attendance[i].col}" class="${id}" type="checkbox" ${checked}></td>`);
    if (!checked) {
      attendNum++;
    }
  }
  tbody.find('.attend-col').last().after(`<td class="missed-col ${id}">${attendNum}</td>`);
};

View.prototype.updateMissedCol = function (id, missed) {
  missed = missed ? missed : 0;
  $(`td.missed-col.${id}`).text(missed);
};

View.prototype.setHandlers = function (handler) {
  $('td>input').click(
    function () {
      const target = $(this);
      handler.checkboxClick(target.attr('class'), target.attr('id'));
    }
  );
};

$(function () {
  const app = new App(new Data(12), new View());
  app.init();
}());
