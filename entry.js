$(document).ready(function() {
  MappableTable.scanTable($('.mappabletable'));

  $('.dynawidthcontainer').on('input', DynaWidth.onInput);
  $('.dynawidthinput').trigger('input');

//  $('.rendezvous').keydown(OnDynaWidthKeyDown);
//  $('.rendezvous').keyup(OnDynaWidthKeyUp);

var $rvtables = $(".rendezvous");
$rvtables.each(function() { new RendezvousTable(this) });
$rvtables.each(function() { this.rvobj.DeleteVenueRow(0) });
});

// DynaWidth OBJECT
// .dyanwidthinput, added to class of <input type='text'...>, provides
//  dynamic sizing of the input to match the contents.
// .dynawidthcontainer should be used on a container (table, div, etc.),
//  which contains a set of .dynawidthinput elements.
var DynaWidth = {
  // From: https://codepen.io/Momciloo/pen/bpyMbB (no spaces w/input)
  //       & http://jsfiddle.net/philfreo/MqM76/
  textWidth: function ($elem) {
    if (!DynaWidth.textWidth.tempSpan)
      DynaWidth.textWidth.tempSpan = $('<span>').hide().appendTo(document.body);
    var text = $elem.val() || $elem.text() || $elem.attr('placeholder');
    DynaWidth.textWidth.tempSpan.text($elem.val() || $elem.text() || $elem.attr('placeholder'))
                                .css('font', $elem.css('font'));
    return DynaWidth.textWidth.tempSpan.width();
  },
  // https://stackoverflow.com/a/841121
  selectRange: function($elem, start, end) {
    if (end === undefined)
      end = start;
    return $elem.each(function() {
      if ('selectionStart' in $elem) {
        $elem.selectionStart = start;
        $elem.selectionEnd = end;
      } else if ($elem.setSelectionRange) {
        $elem.setSelectionRange(start, end);
      } else if ($elem.createTextRange) {
        var range = $elem.createTextRange();
        range.collapse(true);
        range.moveEnd('character', end);
        range.moveStart('character', start);
        range.select();
      }
    });
  },
  // https://www.smashingmagazine.com/2010/04/seven-javascript-things-i-wish-i-knew-much-earlier-in-my-career/#event-delegation
  onInput: function (event) {
    var $table = $(this);
    var $elem = $(event.target);
    if ($elem.hasClass('dynawidthinput')) {
      var paddingAndBorder = $elem.outerWidth() - $elem.width();
      var textWidth = DynaWidth.textWidth($elem);
      var newInputWidth = textWidth + paddingAndBorder;
      $elem.css( { width: newInputWidth } );
    }
  }
}
// DynaWidth OBJECT

// MapableTable OBJECT
var MappableTable = {
  // https://stackoverflow.com/a/13426773
  cellPos: 'cellPos',
  dims: 'dims',
  scanTable: function ($table) {
    var m = [];
    var pos = undefined;
    $table.find('tr').each(function(y, row) {
      $(row).find('td, th').each(function(x, cell) {
        var $cell = $(cell);
        var cspan = ($cell.attr('colspan') | 0) || 1;
        var rspan = ($cell.attr('rowspan') | 0) || 1;
        for (; m[y] && m[y][x]; x++)
          ;
        for (var tx = x; tx < x + cspan; tx++) {
          for (var ty = y; ty < y + rspan; ty++) {
            if (!m[ty])
              m[ty] = [];
            m[ty][tx] = true;
          }
        }
        pos = { left: x, top: y };
        $cell.data(DynaWidth.cellPos, pos);
      });
    });
    var dims = { width: pos.left + 1, height: pos.top + 1};
    $table.data(DynaWidth.dims, dims);
  },
  posFrom$Cell: function($cell, rescan) {
    var pos = $cell.data(DynaWidth.cellPos);
    if (!pos || rescan) {
      var $table = $cell.closest('table');
      DynaWidth.scanTable($table);
      pos = $cell.data(DynaWidth.cellPos);
    }
    return pos;
  },
  $cellFromPos: function ($anyelemintable, pos) {
    var $table = $anyelemintable.closest('table');
    var $cell = undefined;
    $table.find('tr').each(function(i, row) {
      $(row).find('th, td').each(function(i, e) {
        var $e = $(e);
        var cellpos = $e.data(DynaWidth.cellPos);
        var cspan = ($e.attr('colspan') | 0) || 1;
        var rspan = ($e.attr('rowspan') | 0) || 1;
        if (cellpos && (cellpos.left + cspan > pos.left) && (celpos.top + rspan > pos.top)) {
          $cell = $e;
          return false; // exit jquery loop
        }
      });
      if ($cell)
        return false; // exit jquery loop
    });
    return $cell;
  }
}
// MappableTable OBJECT

// RendezvousTable OBJECT
// !!! Requires table to also be DynaWidth table and MappableTable.
function RendezvousTable($table) {
  this.$elem = $table;
  console.assert(!$table.rvobj);
  $table.rvobj = this;
  if (!RendezvousTable.prototype.DeleteVenueRow) {

    RendezvousTable.prototype.DATEHEADER = "<th class='rvdate'><input type='text' class='dynawidth' placeholder='Date'></th>";
    RendezvousTable.prototype.TIMEHEADER = "<th class='rvtime'><input type='text' class='dynawidth' placeholder='Time'></th>";
    RendezvousTable.prototype.VENUEHEADER = "<th class='rvvenue'><input type='text' class='dynawidth' placeholder='Venue'></th>";
    RendezvousTable.prototype.COURTHEADER = "<th class='rvcourt'><input type='text' class='dynawidth' placeholder='Court'></th>";
    RendezvousTable.prototype.RENDEZVOUS = "<td><input type='checkbox' checked></td>";

    RendezvousTable.prototype.DeleteVenueRow = function(top) {
      console.log("RendezvousTable::rvDeleteVenueRow() called");
    }

  }

/*
  onDynaWidthInputKeyDown: function($dwi, event) {
    var $dwi = $(dwi);
    var key = event.which;
    var text = $dwi.val();
    var curpos = dwi.selectionStart;
    var $thiscell = $dwi.closest('th');
    var cellpos = MappableTable.posFrom$Cell($thiscell);
    var $table = $thiscell.closest('table');
    switch (key) {
      case 8: // [Backspace]
        if (text.length <= 0) {
          event.preventDefault();
          if (curpos == 0) {
            if (cellpos.left > 1) {
              if (cellpos.top == 0) {
                RendezvousTable.deleteDateColumn($table, cellpos.left);
              }
            }
          }
        }
    }
  }
*/
}
// RendezvousTable OBJECT