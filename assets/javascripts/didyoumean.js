function observeIssueSubjectField(project_id, issue_id) {
	
  handleSimilarIssues(project_id,  $('#issue_subject').val());
  $('#issue_subject').change(function(event){
	handleSimilarIssues(project_id, issue_id, event.currentTarget.value);	
  });
}

function handleSimilarIssues(project_id, issue_id, subject) {
    emptySimilarIssuesBlock();
    var url = dym.search_url;
    $.ajax(url, {
      data: {
    	issue_id: issue_id,
        project_id: project_id,
        query: subject
      },
      success: function(data, textStatus, jqXHR) {
        if(data.total) {
          drawSimilarIssuesBlock();
          populateSimilarIssuesBlock(data);
        }
      },
      evalJSON: true
    });
}

function drawSimilarIssuesBlock() {
  
  $('#issue_subject').parent().append($('#similar_issues'));

}

function populateSimilarIssuesBlock(data) {
  
  $('#similar_issues_list').html('');
  
  var items = data.issues;
  for (var i = items.length - 1; i >= 0; i--) {
    var item_html = displayItem(items[i]);
    $('#similar_issues_list').append(item_html);
  };

  $('#issues_count').html(data.total);
  if (!$('#similar_issues').is(":visible"))
	  $('#similar_issues').show();
  if (data.total > data.issues.length) {
    var more = data.total - data.issues.length;
    $('#similar_issues_list').append("<li>+" + more + " " + dym.label_more + "</li>");
  }
}

function displayItem(item) {
  return '<li><a href="' + dym.issue_url + '/' + item.id + '">' + item.tracker_name + ' #' + item.id + ' &ndash; ' + item.subject + '</a> (' + item.status_name + ' ' + dym.label_in + ' ' + item.project_name +')</li>';
}

function emptySimilarIssuesBlock() {
  $('#issues_count').html('');
  if ($('#similar_issues').is(":visible"))
	  $('#similar_issues').hide();

}
