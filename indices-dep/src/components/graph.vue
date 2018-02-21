<template>
  <div>
    <div id="graphDiv">
    </div>

    <div id="buttons">
      <div class="btn-toolbar mr-2" role="toolbar">
        <b-button-group class="btn-group-sm mr-2">
          <b-button v-on:click="toggle" :disabled=notLoaded>{{rendering ? "Stop" : "Start"}}</b-button>
          <!-- <b-button v-on:click="reset">Reset</b-button> -->
        </b-button-group>
        <b-button-group class="btn-group-sm mr-2">
          <b-button @click="format('none')">None</b-button>
          <b-button @click="format('assetClass')">Asset Class</b-button>
          <b-button @click="format('owner')">Owner</b-button>
          <b-button  @click="format('type')">Index Type</b-button>
        </b-button-group>

        <b-button-group class="btn-group-sm mr-2">
          <b-button @click="play('2018-02-08')">Play 8th Feb</b-button>
          <b-button @click="play('2018-02-09')">Play 9th Feb</b-button>
          <b-button @click="stopPlay()">Stop</b-button>
        </b-button-group>
      </div>
    </div>

    <div id="calc-status" v-if="currTime">
      Time: {{currTimeDisplay}}<br />
      Calculated: {{calculated}} / {{tot}}
    </div>

    <div id="info" class="card" v-if="node.indexId">
      <span v-bind:class="{'font-weight-bold': selected }">{{node.indexId}}</span>
      <span v-bind:class="{'font-weight-bold': selected }">{{node.name}}</span>
      {{node.owner}}<br />
      {{node.type}}<br />
      {{node.assetClass}}
      <a href="#" class="card-link" v-if="selected" @click="remove()">Remove</a>
    </div>
  </div>  
</template>

<script>
import load from '../js/data.js'
import viva from '../js/viva.js'
import dataPlay from '../js/dataPlay'
import dateFormat from 'dateformat'

export default {
  name: 'Graph',
  data () {
    return {
      rendering: false,
      notLoaded: true,
      node: {},
      selected: false,
      currTime: null,
      currTimeDisplay: null,
      setIntervalHandle: null,
      calculated: 0,
      tot: 0
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
    },
    play(dateStamp) {
      this.currTime = new Date(dateStamp);
      this.currTimeDisplay = dateFormat(this.currTime, 'yyyy-mm-dd HH:MM:ss')
      this.tot = dataPlay.getTotalIndices(dateStamp);

      let lastTime = this.currTime;
      let ids = dataPlay.getIdsBetween(dateStamp, new Date('2000-01-01'), this.currTime);
      viva.removeMulti(ids);
      this.calculated += ids.length;
      let that = this;
      let handle = window.setInterval(() => {
        lastTime = new Date(that.currTime.getTime());
        that.currTime.setMinutes(that.currTime.getMinutes() + 10);
        let ids = dataPlay.getIdsBetween(dateStamp, lastTime, that.currTime);
        that.currTimeDisplay = dateFormat(that.currTime, 'yyyy-mm-dd HH:MM:ss')
        this.calculated += ids.length;
        viva.removeMulti(ids);
      }, 1000);

      this.setIntervalHandle = handle;
    },
    stopPlay() {
      window.clearInterval(this.setIntervalHandle);
      this.currTime = null;

      this.setIntervalHandle = null;
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

      dataPlay.setData(data.calcTimes);
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
  top:0.5rem;
  left:0.5rem;
}

#info {
  position: fixed;
  right:0.5rem;
  top:0.5rem;
  padding:4px;
  text-align: right;
}

#calc-status {
  position: fixed;
  right:50%;
  top:5%;
  text-align: center;
  font-weight: bold;
  font-size: larger;
}
</style>

<style>
svg {
  width:100%;
  height:100%;
}
</style>
