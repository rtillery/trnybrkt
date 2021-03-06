var scriptlocation = location.href.replace(document.location.pathname, '');
console.log("XXX file location:", scriptlocation);

teams = [];

function onExcelPaste() {
  var data = $('textarea[name=excel_data]').val();
    console.log(data);
  var rows = data.split("\n");

  var table = $('<table />');
  for(var y in rows) {
      var cells = rows[y].split("\t");
teams[y] = { club: cells[0], team: cells[1], friendlyName: cells[2], code: cells[3], points: cells[5] };
      var row = $('<tr />');
      for(var x in cells) {
          row.append('<td>'+cells[x]+'</td>');
      }
      table.append(row);
  }

  // Insert into DOM
  $('#excel_table').html(table);
}

var request = new XMLHttpRequest();

function SendData() {
console.log(`readyState: ${request.readyState}, status: ${request.status}`);
console.log(request);
  if (request.readyState == 4 && request.status == 200) {
    console.log("Data upload complete.");
  }
}

function SendDataToServer(data) {
var url = scriptlocation + "/server.js";
//var url = 'https://evening-everglades-20208.herokuapp.com/server.js';
//  var url = 'http:/localhost:4242/server.js';
  request.open('POST', url, true);
request.setRequestHeader('Content-type', 'application/json');
  request.onreadystatechange = SendData;
  request.send(data);
}

function GatherLocations() {
  var locations = [];
  var venue = '';
  $(".event tbody tr th").each(function(index, elem) {
    var $cell = $(this);
    if ($cell.hasClass('rvvenue')) {
      venue = $cell.find('.dynawidth').val();
    } else {
      locations.push(venue + ' ' + $cell.find('.dynawidth').val());
    }
  })
  return locations;
}

// @@@ TODO: BUG: Date not included in times
function GatherTimes() {
  var times = [];
  $(".event thead th").each(function(index, elem) {
    var $cell = $(this);
    if ($cell.hasClass('rvtime')) {
      times.push($cell.find('.dynawidth').val());
    }
  })
  return times;
}

function GatherLocationsAndTimes() {
  var locations = GatherLocations();
  var times = GatherTimes();
  var tablerow = $('.matrix tbody tr:first-child');
  var locationsAndTimes = [];
  var location = 0;
  $('.event tbody tr').each(function() {
    var time = 0;
    $('td', this).each(function() {
      locationsAndTimes.push({
        location: locations[location],
        time: times[time],
      });
      time++;
    });
    location++;
  });
console.log("locationsAndTimes:", locationsAndTimes);
  return locationsAndTimes;
}

function SendEntryDataToServer() {
  var name = $("input[name='name']").val();
  var date = $("input[name='date']").val();
  var dateFormat = dateOptions[$('#dateformats').val()];
  var language = GetLang();
  var teamsPerPool = $("input[name='teamsperpool']").val();
  var numPools = $("input[name='numpools']").val();
  var numPowerPools = $("input[name='numpowerpools']").val();
  var teamsPerPowerPool = $("input[name='teamsperpowerpool']").val();
  var avoidClub = $("input[name='avoidclub']").is(':checked');
  var locationsAndTimes = GatherLocationsAndTimes();
  var entryData = {
    name: name,
    date: date,
    dateFormat: dateFormat,
    language: language,
    teamsPerPool: teamsPerPool,
    numPools: numPools,
    numPowerPools: numPowerPools,
    teamsPerPowerPool: teamsPerPowerPool,
    avoidClub: avoidClub,
    locationsAndTimes: locationsAndTimes,
    teams: teams,
  };
console.log("*** SENDING DATA TO SERVER ***");
console.log(entryData);
  var postData = JSON.stringify(entryData);
  SendDataToServer(postData);
console.log("******************************");

  return false; // ???
}

function GetLang() {
  if (navigator.languages && navigator.languages.length) {
    return navigator.languages[0];
  } else {
    return navigator.userLanguage || navigator.language || navigator.browserLanguage || 'en-US';
  }
}
dateOptions = [
  { year: 'numeric', month: 'long', day: 'numeric' },
  { year: '2-digit', month: 'numeric', day: 'numeric'},
  { year: 'numeric', month: 'numeric', day: 'numeric'},
];
function onDateChange() {
  $('#dateformats').children('option').remove();
  var rawdate = $("input[name='date']").val();
  var dateparts = rawdate.split('-');
  var format = new Date(dateparts[0], dateparts[1] - 1, dateparts[2]);
console.log(format);
  $.each(dateOptions, function(index, value){
    var date = format.toLocaleDateString(GetLang(), value);
    $('#dateformats').append($('<option>', { 'value': index, 'text': date }));
  });
}
// https://ntrvolleyball.net/wp-content/uploads/2017/08/Power-Pool-Format-Information-1.pdf
//    Teams : Power Pools, Teams per Power Pool
//    <= 12 :      0     ,          0
// 13 <= 16 :      1     ,          3
// 17 <= 24 :      1     ,          4
// 25 <= 32 :      2     ,          3
// 33 <=    :      2     ,          4

// From: https://codepen.io/Momciloo/pen/bpyMbB (no spaces w/input)
//       & http://jsfiddle.net/philfreo/MqM76/
$.fn.GetTextWidth = function(text, font) {
  if (!$.fn.GetTextWidth.tempSpan)
    $.fn.GetTextWidth.tempSpan = $('<span>').hide().appendTo(document.body);
  $.fn.GetTextWidth.tempSpan
   .text(text || this.val() || this.text() || this.attr('placeholder'))
   .css('font', font || this.css('font'));
  return $.fn.GetTextWidth.tempSpan.width();
};

// https://stackoverflow.com/a/841121
$.fn.SelectRange = function(start, end) {
  if(end === undefined) {
    end = start;
  }
  return this.each(function() {
    if('selectionStart' in this) {
      this.selectionStart = start;
      this.selectionEnd = end;
    } else if(this.setSelectionRange) {
      this.setSelectionRange(start, end);
    } else if(this.createTextRange) {
      var range = this.createTextRange();
      range.collapse(true);
      range.moveEnd('character', end);
      range.moveStart('character', start);
      range.select();
    }
  });
};

$.fn.scanTable = function() {
  var m = [];
  var pos = undefined;
  $(this).find('tr').each(function(y, row) {
    $(row).find('td, th').each(function(x, cell) {
      var $cell = $(cell),
          cspan = ($cell.attr('colspan') | 0) || 1,
          rspan = ($cell.attr('rowspan') | 0) || 1;
      for(; m[y] && m[y][x]; x++);
      for(var tx = x; tx < x + cspan; tx++) {
        for(var ty = y; ty < y + rspan; ty++) {
          if(!m[ty]) {
            m[ty] = [];
          }
          m[ty][tx] = true;
        }
      }
      pos = { left: x, top: y };
      $cell.data('cellPos', pos);
    });
  });
  var dims = { width: pos.left + 1, height: pos.top + 1 };
  $(this).data('dims', dims);
}

$.fn.posFromCell = function(rescan) {
  var $cell = this.first(),
      pos = $cell.data('cellPos');
  if( !pos || rescan ) {
    var $table = $cell.closest('table, thead, tbody, tfoot');
    $table.scanTable();
    pos = $cell.data('cellPos');
  }
  return pos;
}

$.fn.$cellFromPos = function(pos) {
  var $table = $(this).closest('table');
  var $cell = undefined;
  $table.find('tr').each(function(i, row) {
    $(row).find('th, td').each(function(i, e) {
      var cellPos = $(e).data('cellPos');
      var cspan = ($(e).attr( "colspan" ) | 0) || 1,
          rspan = ($(e).attr( "rowspan" ) | 0) || 1;
      if (cellPos && (cellPos.left + cspan > pos.left) && (cellPos.top + rspan > pos.top)) {
        $cell = $(e);
        return false;
      }
    });
    if ($cell)
      return false;
  });
  return $cell;
}

$.fn.headerType = function() {
  var pos = this.data('cellPos');
  var type = undefined;
  if (pos.top >= 2)
    switch (pos.left) {
      case 0: type = 'venue'; break;
      case 1: type = 'court'; break;
    }
  else if (pos.left >= 2)
    switch (pos.top) {
      case 0: type = 'date'; break;
      case 1: type = 'time'; break;
    }
  return type;
}

function OnDynaWidthInput() {
  var paddingAndBorder = $(this).outerWidth() - $(this).width();
  var inputWidth = $(this).GetTextWidth() + paddingAndBorder;
  $(this).css({
    width: inputWidth
  });
}

$.fn.DeleteVenueRow = function(top) {
  var $table = this;

}
function OnDynaWidthKeyDown(e) {
  var key = e.which;
  var text = $(this).val();
  var curpos = this.selectionStart;
  var $thiscell = $(this).closest('th');
  var cellpos = $thiscell.data('cellPos');
  var $table = $thiscell.closest('table');
  switch (key) {
    case 8: // [Backspace]
      if (text.length <= 0) {
        e.preventDefault();
        // Delete this header (unless only in this row) and move to previous in this row (unless first)
        if (curpos == 0) {
          if (cellpos.left > 1) {
            if (cellpos.top == 0) {
              $table.DeleteDateColumn(cellpos.left);
            } else if (cellpos.top == 1) {
              $table.DeleteTimeColumn(cellpos.left);
            }
          } else if (cellpos.top > 1) {
            if (cellpos.left == 0) {
              $table.DeleteVenueRow(cellpos.top);
            } else if (cellpos.left == 1) {
              $table.DeleteCourtRow(cellpos.top);
            }
          }
        }
      }
      break;
    // case 9: // [Tab]
    //   // Move to next header in this row (unless last)
    //   break;
    // case 16: // [Shift]+[Tab]
    //   // Move to previous header in this row (unless first)
    //   break;
    case 37: // [←] (left arrow)
      if (cellpos <= 0) {
        e.preventDefault();
        // Move to previous header in this row (unless first)
        var newpos = { left: cellpos.left - 1, top: cellpos.top };
        if (newpos.left >= 0) {
          var $newcell = $(this).$cellFromPos(newpos);
          if ($newcell) {
            var $newin = $($newcell.find('.dynawidth')[0]);
            if ($newin.length) {
              $newin.focus();
              $newin.SelectRange($newin.val().length);
            }
          }
        }
      }
      break;
    case 38: // [↑] (up arrow)
      e.preventDefault();
      // Move to previous header row (unless first)
      var newpos = { left: cellpos.left, top: cellpos.top - 1 };
      if (newpos.left >= 0) {
        var $newcell = $(this).$cellFromPos(newpos);
        if ($newcell) {
          var $newin = $($newcell.find('.dynawidth')[0]);
          if ($newin.length) {
            $newin.focus();
            $newin.SelectRange(0 /* $newin.val().length */);
          }
        }
      }
      break;
    case 39: // [→] (right arrow)
      if (cellpos >= text.length) {
        e.preventDefault();
        // Move to next header in this row (unless last)
        var cspan = ($thiscell.attr( "colspan" ) | 0) || 1;
        var newpos = { left: cellpos.left + cspan, top: cellpos.top };
        var $newcell = $(this).$cellFromPos(newpos);
        if ($newcell) {
          var $newin = $($newcell.find('.dynawidth')[0]);
          if ($newin.length) {
            $newin.focus();
            $newin.SelectRange(0);
          }
        }
      }
      break;
    case 40: // [↓] (down arrow)
      e.preventDefault();
      // Move to next header row (unless last)
      var rspan = ($thiscell.attr( "rowspan" ) | 0) || 1;
      var newpos = { left: cellpos.left, top: cellpos.top + rspan };
      var $newcell = $(this).$cellFromPos(newpos);
      if ($newcell) {
        var $newin = $($newcell.find('.dynawidth')[0]);
        if ($newin.length) {
          $newin.focus();
          $newin.SelectRange(0 /* $newin.val().length */);
        }
      }
      break;
    case 46: // [Delete]
      if (text.length <= 0) {
        e.preventDefault();
        // Delete this header (unless only in this row) and move to next in this row (unless last)
      }
      break;
  }
}

DATEHEADER = "<th class='rvdate'><input type='text' class='dynawidth' placeholder='Date'></th>";
TIMEHEADER = "<th class='rvtime'><input type='text' class='dynawidth' placeholder='Time'></th>";
VENUEHEADER = "<th class='rvvenue'><input type='text' class='dynawidth' placeholder='Venue'></th>";
COURTHEADER = "<th class='rvcourt'><input type='text' class='dynawidth' placeholder='Court'></th>";
RENDEZVOUS = "<td><input type='checkbox' checked></td>";

$.fn.AddDynaWidthEventHandlers = function() {
  $dynawidth = $(this).find('.dynawidth');
  $dynawidth.on('input', OnDynaWidthInput).trigger('input');
  $dynawidth.keydown(OnDynaWidthKeyDown);
  $dynawidth.keyup(OnDynaWidthKeyUp);
}

$.fn.InsertRendezvousColumn = function(left) {
  var $table = this;
  var dims = $table.data('dims');
  for (var coords = { left: left, top: 2 }; coords.top < dims.height; coords.top++) {
    var $cell = $table.$cellFromPos(coords);
    $cell.after(RENDEZVOUS);
  }
}
$.fn.FinishInsertingTimeColumn = function(left) {
  var $table = this;
  var $timecell = $(this).$cellFromPos({ left: left, top: 1 });
  $(TIMEHEADER)
    .insertAfter($timecell)
    .AddDynaWidthEventHandlers();
  // Add remaining rows of check buttons
  $table.InsertRendezvousColumn(left);
console.log("SCANNING TABLE");
  $table.scanTable();
}
$.fn.InsertDateColumn = function(left) {
  var $table = this;
  // Add new column to the right
  var $datecell = $(this).$cellFromPos({ left: left, top: 0 });
  var cspan = ($datecell.attr('colspan') | 0) || 1;
  // Add new Date header
  $(DATEHEADER).insertAfter($datecell).AddDynaWidthEventHandlers();
  // Add new Time header
  $table.FinishInsertingTimeColumn(left + cspan - 1);
}
$.fn.InsertTimeColumn = function(left) {
  var $table = this;
  // Extend Date header above
  var $datecell = $table.$cellFromPos({ left: left, top: 0 });
  var cspan = ($datecell.attr('colspan') | 0) || 1;
  $datecell.attr('colspan', cspan + 1);
  // Add new column to the right
  // Add new Time header
  $table.FinishInsertingTimeColumn(left);
}

$.fn.InsertRow = function(headers, $row) {
  var $table = this;
  var dims = $table.data('dims');
  var newrow = "<tr>" + headers;
  for(var col = 2; col < dims.width; col++)
    newrow += RENDEZVOUS;
  newrow += "</tr>";
  $(newrow).insertAfter($row).find('th').AddDynaWidthEventHandlers();
  $table.scanTable();
}
$.fn.InsertVenueRow = function(top) {
  var $table = this;
  var $venuecell = $table.$cellFromPos({ left: 0, top: top });
  var rspan = ($venuecell.attr('rowspan') | 0) || 1;
  var $row = $venuecell.closest('tr');
  // Move to top row of Venue group
  while(--rspan)
    $row = $row.next();
  $table.InsertRow(VENUEHEADER + COURTHEADER, $row);
}
$.fn.InsertCourtRow = function(top) {
  var $table = this;
  var $venuecell = $table.$cellFromPos({ left: 0, top: top });
  var rspan = ($venuecell.attr('rowspan') | 0) || 1;
  var $courtcell = $table.$cellFromPos({ left: 1, top: top });
  var $row = $courtcell.closest('tr');
  $venuecell.attr('rowspan', rspan + 1);
  // Add new row below
  $table.InsertRow(COURTHEADER, $row);
}

function OnDynaWidthKeyUp(e) {
console.log(e);
  var key = e.which;
  var text = $(this).val();
  var curpos = this.selectionStart;
  var $thiscell = $(this).closest('th');
  var cellpos = $thiscell.data('cellPos');
  var $table = $thiscell.closest('table');
console.log(`text: ${text}`);
console.log(`text length: ${text.length}`);
console.log(`char: ${e.which}`);
console.log(`cursor: ${curpos}`);
console.log("cellpos:", cellpos);
console.log("$table:", $table);
  switch (key) {
    case 13: // [Enter]
      e.preventDefault();
      // Create a new header in this row/column
      if (curpos == text.length) {
        if (cellpos.left > 1) {
          if (cellpos.top == 0) {
            $table.InsertDateColumn(cellpos.left);
          } else if (cellpos.top == 1) {
            $table.InsertTimeColumn(cellpos.left);
          }
        } else if (cellpos.top > 1) {
          if (cellpos.left == 0) {
            $table.InsertVenueRow(cellpos.top);
          } else if (cellpos.left == 1) {
            $table.InsertCourtRow(cellpos.top);
          }
        }
      }
      break;
  }
}

function pptoggle(elem) {
  var enabled = $(elem).is(":checked");
  $("input.powerpooltoggle").prop('disabled', !enabled);
  if (!enabled) {
    $("input[name='numpowerpools']").val(0);
    $("td.powerpooltoggle").addClass('disabled');
  } else {
    $("td.powerpooltoggle").removeClass('disabled');
  }
}

$(document).ready(function() {
  $('.event').scanTable();

  $('.dynawidth').on('input', OnDynaWidthInput).trigger('input');

  $('.dynawidth').keydown(OnDynaWidthKeyDown);
  $('.dynawidth').keyup(OnDynaWidthKeyUp);
});

// dates/times
// venues/locations
// rows & columns

