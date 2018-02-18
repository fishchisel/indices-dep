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
        <b-button  @click="format('indexType')">Index Type</b-button>
      </b-button-group>
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
    }
  },
  mounted () {
    load().then(data => {
      this.notLoaded = false;
      for(let index of data.nodes) {
        index.owner = Math.random().toString();
      }

      viva.init(data, 'graphDiv')
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
  top:0;
  left:0;
}

</style>

<style>
svg {
  width:100%;
  height:100%;
}
</style>
