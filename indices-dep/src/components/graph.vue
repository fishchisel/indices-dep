<template>
  <div>
    <div id="graphDiv">
    </div>

    <div id="buttons">
      <b-button-group class="btn-group-sm">
        <b-button v-on:click="toggle" :disabled=notLoaded>{{rendering ? "Stop" : "Start"}}</b-button>
        <b-button v-on:click="reset">Reset</b-button>
      </b-button-group>
      <b-button-group class="btn-group-sm">
        <b-button @click="format('none')">None</b-button>
        <b-button @click="format('assetClass')">Asset Class</b-button>
        <b-button @click="format('owner')">Owner</b-button>
        <b-button  @click="format('type')">Index Type</b-button>
      </b-button-group>
    </div>

    <div id="info" class="card" v-if="node.indexId">
      <span v-bind:class="{'font-weight-bold': selected }">{{node.indexId}}</span>
      <span v-bind:class="{'font-weight-bold': selected }">{{node.name}}</span>
      {{node.owner}}<br />
      {{node.type}}<br />
      {{node.class}}
      <a href="#" class="card-link" v-if="selected" @click="remove()">Remove</a>
    </div>
  </div>  
</template>

<script>
import load from '../js/data.js'
import viva from '../js/viva.js'

export default {
  name: 'Graph',
  data () {
    return {
      rendering: false,
      notLoaded: true,
      node: {},
      selected: false
    }
  },
  methods: {
    toggle () {
      this.rendering = viva.toggle()
    },
    reset () {
      viva.reset()
    },
    format(type) {
      viva.setOverlay(type)
    },
    remove() {
      viva.remove(this.node.indexId);
    }
  },
  mounted () {
    //$('#graphDiv').click(arg => this.selected = false);

    load().then(data => {
      this.notLoaded = false;
      let evts = viva.init(data, 'graphDiv');
      
      evts
        .click(arg => {
          this.node = arg.data
          this.selected = true
        })
        .mouseEnter(arg => { 
          if (!this.selected) this.node = arg.data
        })
        .noclick(arg => this.selected = false)
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#graphDiv {
  position: fixed;
  top:0px;
  left:0px;
  height: 100%;
  width: 100%;
}
#buttons {
  position: fixed;
  top:2px;
  left:2px;
}

#info {
  position: fixed;
  right:2px;
  top:2px;
  padding:4px;
  text-align: right;
}
</style>

<style>
svg {
  width:100%;
  height:100%;
}
</style>
