"use strict";

////////////////////////////////////////
// Helper Functions
////////////////////////////////////////
function createElement(element, attribute, inner) {
  if (typeof element === "undefined") {
    return false;
  }
  if (typeof inner === "undefined") {
    inner = "";
  }
  var el = document.createElement(element);
  if (typeof attribute === "object") {
    for (var key in attribute) {
      el.setAttribute(key, attribute[key]);
    }
  }
  if (!Array.isArray(inner)) {
    inner = [inner];
  }
  for (var k = 0; k < inner.length; k++) {
    if (inner[k].tagName) {
      el.appendChild(inner[k]);
    } else {
      el.appendChild(document.createTextNode(inner[k]));
    }
  }
  return el;
}

////////////////////////////////////////
// Section Div
////////////////////////////////////////
const CustomElement = function (elementName, elementId) {
  this.elementId = elementId;
  this.innerElement = createElement(elementName, {
    id: elementId,
  });
};

CustomElement.prototype.getElement = function () {
  return this.innerElement;
};

CustomElement.prototype.appendChild = function (element) {
  if (element instanceof CustomElement) {
    this.innerElement.appendChild(element.getElement());
  } else {
    this.innerElement.appendChild(element);
  }
};

CustomElement.prototype.addSelfToParent = function (parentElement) {
  if (parentElement instanceof HTMLElement) {
    parentElement.appendChild(this.getElement());
  } else {
    throw new Error("Invalid parent element type");
  }
};

const Section = function (name, title) {
  CustomElement.call(this, "section", `section-${name}`);
  this.createHeader(title);
};
Section.prototype = Object.create(CustomElement.prototype);

Section.prototype.createHeader = function (title) {
  const headerContainer = createElement("div", {
    id: `${this.elementId}-header`,
  });
  headerContainer.appendChild(createElement("h1", {}, title));
  this.appendChild(headerContainer);
};

////////////////////////////////////////
// Section Div
////////////////////////////////////////
const Table = function (tableName) {
  CustomElement.call(this, "table", `table-${tableName}`);
};
Table.prototype = Object.create(CustomElement.prototype);

Table.prototype.createHeaderRow = function (headers) {
  const headerRow = createElement("tr");
  for (let i = 0; i < headers.length; i++) {
    headerRow.appendChild(createElement("th", {}, headers[i]));
  }
  this.appendChild(headerRow);
};

Table.prototype.createDataRow = function (dataArray) {
  const dataRow = createElement("tr");
  for (let i = 0; i < dataArray.length; i++) {
    dataRow.appendChild(createElement("td", {}, dataArray[i]));
  }
  this.appendChild(dataRow);
};

const StudentTable = function (tableName) {
  Table.call(this, tableName);
};
StudentTable.prototype = Object.create(Table.prototype);
