---
---

(function () {
  function displaySearchResults(results) {
    var searchResults = document.getElementById('search-results');

    if (results.length) {
      resultsString = '';
      results.forEach(function (result) {

        var item = window.documents.find(function (document) {
          console.log(document);
          console.log(result.ref);
          return document['url'] == result.ref;
        });
        resultsString += '<dt><a href="{{ site.baseurl }}' + item.url + '">' + item.title + '</a></dt>';
        resultsString += '<dd>' + item.content.substring(0, 150) + '...</dd>';

      });
      searchResults.innerHTML = resultsString;
    } else {
      searchResults.innerHTML = '<li>No results found</li>';
    }
  }

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');

      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      }
    }
  }

  var searchTerm = getQueryVariable('q');

  if (searchTerm) {
    document.getElementById('search-box').setAttribute("value", searchTerm);

    var idx = lunr(function () {
      this.ref('url')
      this.field('title', { boost: 10 })
      this.field('content')
      window.documents.forEach(function (doc) {
        this.add(doc)
      }, this)
    });

    var results = idx.search(searchTerm); // Get lunr to perform a search
    displaySearchResults(results);
  }
})();
