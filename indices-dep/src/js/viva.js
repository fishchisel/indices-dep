import Viva from 'vivagraphjs'

let renderer = null;
let rendering = null;

function init (data, elmName) {
  var graph = Viva.Graph.graph()

  var layout = Viva.Graph.Layout.forceDirected(graph, {
    springLength : 80,
    springCoeff : 0.0002,
    //dragCoeff : 0.02,
    //gravity : -0.1
  });

  var graphics = Viva.Graph.View.webglGraphics()

  renderer = Viva.Graph.View.renderer(graph, {
    container: document.getElementById(elmName),
    graphics: graphics,
    layout: layout
  });

  addData(graph, data)
}

function addData (graph, data) {

  for (let index of data.nodes) {
    graph.addNode(index.indexId)
  }
  for (let link of data.links) {
    graph.addLink(link.source, link.dependsOn)
  }
}

function toggle () {
  if (rendering === null)
    renderer.run()
  else if (rendering === false)
    renderer.resume()
  else
    renderer.pause();
  return rendering = !rendering;
}

function reset () {
  renderer.reset()
}

export default {
  init: init,
  toggle: toggle,
  reset: reset,
}