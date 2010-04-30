jQuery(document).ready(function($) {
   // Categories->Add() && Categories->Edit()
   // Hide/reveal the permissions grids when the AllowDiscussions checkbox is un/checked.
   $('[name=Category/AllowDiscussions]').click(function() {
      if ($(this).attr('checked'))
         $('#Permissions,#UrlCode').slideUp('fast');
      else
         $('#Permissions,#UrlCode').slideDown('fast');
   });
   // Categories->Add() && Categories->Edit()
   // Hide onload if unchecked   
   if ($('[name=Category/AllowDiscussions]').attr('checked'))
      $('#Permissions,#UrlCode').hide();
   
   // Categories->Delete()
   // Hide/reveal the delete options when the DeleteDiscussions checkbox is un/checked.
   $('[name=Form/DeleteDiscussions]').click(function() {
      if ($(this).attr('checked')) {
         $('#ReplacementCategory,#ReplacementWarning').slideDown('fast');
         $('#DeleteDiscussions').slideUp('fast');
      } else {
         $('#ReplacementCategory,#ReplacementWarning').slideUp('fast');
         $('#DeleteDiscussions').slideDown('fast');
      }
   });
   // Categories->Delete()
   // Hide onload if unchecked   
   if (!$('[name=Form/DeleteDiscussions]').attr('checked')) {
      $('#ReplacementCategory,#ReplacementWarning').hide();
      $('#DeleteDiscussions').show();
   } else {
      $('#ReplacementCategory,#ReplacementWarning').show();
      $('#DeleteDiscussions').hide();
   }

   // Categories->Manage()
   // Make category table sortable
   if ($.tableDnD) {
      saveAndReload = function(table, row) {
         var webRoot = gdn.definition('WebRoot', '');
         var transientKey = gdn.definition('TransientKey');
         var tableId = $($.tableDnD.currentTable).attr('id');
         var data = $.tableDnD.serialize() + '&TableID=' + tableId + '&DeliveryType=VIEW&Form/TransientKey=' + transientKey;
         $.post(gdn.combinePaths(webRoot, 'index.php/vanilla/settings/sortcategories/'), data, function(response) {
            if (response == 'TRUE') {
               // Reload the page content...
               $.get(gdn.combinePaths(webRoot, '/index.php/vanilla/settings/managecategories/?DeliveryType=VIEW'), function(data){
                  $('#Content form').remove();
                  $('#Content').append(data);
                  $('table.Sortable tbody tr td').effect("highlight", {}, 1000);
                  $("table.Sortable").tableDnD({onDrop: saveAndReload});
               });
            }
         });
      }
      $("table.Sortable").tableDnD({onDrop: saveAndReload});
   }

});