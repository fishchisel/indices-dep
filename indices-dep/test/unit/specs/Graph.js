import Vue from 'vue'
import HelloWorld from '@/components/Graph'

describe('Graph.vue', () => {
  it('I should write some tests', () => {
    const Constructor = Vue.extend(Graph)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
      .toEqual('Welcome to Your Vue.js App')
  })
})
