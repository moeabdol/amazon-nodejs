$(document).ready(function() {
  $('#search').keyup(function() {
    var search_term = $(this).val();

    $.ajax({
      method: 'POST',
      url: '/api/search',
      data: { search_term },
      dataType: 'json',
      success: function(json) {
        var data = json.hits.hits.map(function(hit) {
          return hit;
        });

        $('#search-results').empty();

        for (var i = 0; i < data.length; i++) {
          var html = '';
          html += '<div class="col-md-4">';
          html += '<a href="/product/' + data[i]._source._id + '">';
          html += '<div class="card mb-3">';
          html += '<img class="card-img-top" src="' + data[i]._source.image + '" alt="">';
          html += '<div class="card-body">';
          html += '<h4 class="card-title">' + data[i]._source.name + '</h4>';
          html += '<h4 class="card-text">' + data[i]._source.category.name + '</h4>';
          html += '<h4 class="card-text">' + data[i]._source.price + '</h4>';
          html +='</div></div></a></div>';

          $('#search-results').append(html);
        }
      },
      error: function(err) {
        console.log(err);
      }
    });
  });
});
