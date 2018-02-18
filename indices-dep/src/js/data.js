import $ from 'jquery'

const idUrl = 'static/data/indices.json';
const linksUrl = 'static/data/dependencies.json';

function loadOne (url) {
  var d = $.Deferred();
  $.ajax({
    dataType: 'json',
    url: url,
    success: data => d.resolve(data),
    error: err => d.reject(err)    
  })
  return d;
}

function load () {
  return Promise.all([
    loadOne(idUrl),
    loadOne(linksUrl)
  ]).then(results => {
    return {
      nodes: results[0],
      links: results[1]
    }
  }).catch(err => {
    console.log("Load static data failed.")
    console.log(err);
  })
}

export default load;