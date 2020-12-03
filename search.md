---
layout: page
---

<form action="{{ 'search' | relative_page }}" method="get">
  <label for="search-box">Search</label>
  <input type="text" id="search-box" name="q">
  <input type="submit" value="search">
</form>

<h2>Search results</h2>

<dl id="search-results"></dl>

<script>
  window.documents = [
    {% for page in site.pages %}
      {% unless page.url contains "404" or page.url contains "search" %}
      {
        "title": "{{ page.title | xml_escape }}",
        "content": {{ page.content | strip_html | strip_newlines | jsonify }},
        "url": "{{ page.url | xml_escape }}"
      }{% unless forloop.last %}, {% endunless %}
      {% endunless %}
    {% endfor %}
  ];
</script>
<script src="https://cdn.jsdelivr.net/npm/lunr@2.3.9/lunr.min.js"></script>
<script src="{{ '/assets/js/search.js' | relative_url }}"></script>

