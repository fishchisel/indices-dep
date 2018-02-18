<template>
  <div>
    <div id="graphDiv">
    </div>

    <div id="buttons">
      <b-button-group class="btn-group-sm">
        <b-button v-on:click="toggle">{{rendering ? "Stop" : "Start"}}</b-button>
        <b-button v-on:click="reset">Reset</b-button>
      </b-button-group>
      <b-button-group class="btn-group-sm">
        <b-button>None</b-button>
        <b-button>Asset Class</b-button>
        <b-button>Owner</b-button>
        <b-button>Index Type</b-button>
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
      rendering: false
    }
  },
  methods: {
    toggle () {
      this.rendering = viva.toggle()
    },
    reset () {
      viva.reset()
    }
  },
  mounted () {
    load().then(data => {
      viva.init(data, 'graphDiv')
      //viva.start()
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
