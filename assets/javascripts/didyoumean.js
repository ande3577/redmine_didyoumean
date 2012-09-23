function observeIssueSubjectField(project_id) {

	document.getElementById('issue_subject').onchange = function(event){
    emptySimilarIssuesBlock();
    var url = dym.search_url;
    new jQuery.ajax(url, {
      data: {
        project_id: project_id,
        query: event.currentTarget.value
      },
      success: function(data, textStatus, jqXHR) {
        if(data.total) {
          drawSimilarIssuesBlock();
          populateSimilarIssuesBlock(data);
        }
      },
      evalJSON: true
    });  
  };
}

function drawSimilarIssuesBlock() {
  
  document.getElementById('issue_subject').parentNode.appendChild(document.getElementById('similar_issues'));

}

function populateSimilarIssuesBlock(data) {
  
  document.getElementById('similar_issues_list').innerHTML = '';
  
  var items = data.issues;
  for (var i = items.length - 1; i >= 0; i--) {
    var item_html = displayItem(items[i]);
    document.getElementById('similar_issues_list').innerHTML += item_html;
  };

  document.getElementById('issues_count').innerHTML = data.total;
  if (document.getElementById('similar_issues').style.display == "none")
	  document.getElementById('similar_issues').style.display = "inline";
  if (data.total > data.issues.length) {
    var more = data.total - data.issues.length;
    document.getElementById('similar_issues_list').insert({bottom: '<li>+' + more + ' ' + dym.label_more + '</li>'});
  }
}

function displayItem(item) {
  return '<li><a href="' + dym.issue_url + '/' + item.id + '">' + item.tracker_name + ' #' + item.id + ' &ndash; ' + item.subject + '</a> (' + item.status_name + ' ' + dym.label_in + ' ' + item.project_name +')</li>';
}

function emptySimilarIssuesBlock() {
  
  document.getElementById('similar_issues_list').innerHTML = '';

  if (document.getElementById('similar_issues').style.display != "none")
	  document.getElementById('similar_issues').style.display = "none"

}
