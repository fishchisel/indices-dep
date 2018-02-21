import Viva from 'vivagraphjs'
import webglGraphics from './webglGraphics/View/webglGraphics'
import stringToRgba from './stringToRgba'
import webGlInputEvents from './webglGraphics/WebGL/webglInputEvents'
import Renderer from './webglGraphics/View/renderer'

import primitives from 'ngraph.physics.primitives'

import dragForce from './dragForceOverride'

let graph = null;
let graphics = null;
let renderer = null;

let rendering = null;

function init (data, elmName) {
  graph = Viva.Graph.graph()

  var layout = Viva.Graph.Layout.forceDirected(graph, {
    springLength : 80,
    springCoeff : 0.0008,
    theta: 0.95, // higher means faster, ubt less accurate
    dragCoeff: 0.04,
    //dragCoeff : 0.02,
    //gravity : -0.1,

    createDragForce: dragForce
  });

//   var layout = Viva.Graph.Layout.forceDirected(graph, {
//     springLength: 80,
//     springCoeff: 0.0008,
//     //gravity: -1.2,
//     theta: 0.9,
//     dragCoeff: 0.02,
//     //timeStep: 20
// });

  graphics = webglGraphics({
    formatNode:  node => ({size: 15, color: 0x009ee8ff})
  })

  var evts = webGlInputEvents(graphics);

  renderer = Renderer(graph, {
    container: document.getElementById(elmName),
    graphics: graphics,
    layout: layout,
    zoomSpeed: 0.7
  });



  addData(graph, data)

  return evts;
}

function addData (graph, data) {
  for (let index of data.nodes) {
    graph.addNode(index.indexId, index)
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

function setOverlay(type) {
  graph.forEachNode(node => {
    // super leaky abstraction..
    let color = 0x009ee8ff
    if (type != 'none') color = stringToRgba(node.data[type]);
    graphics.getNodeUI(node.id).color = color;
  });
}

function remove(indexId) {
  graph.removeNode(indexId)
}

function removeMulti(indexIds) {
  graph.beginUpdate();
  for (let id of indexIds)
    graph.removeNode(id)
  graph.endUpdate();
}

export default {
  init: init,
  toggle: toggle,
  reset: reset,
  setOverlay: setOverlay,
  remove: remove,
  removeMulti: removeMulti
}