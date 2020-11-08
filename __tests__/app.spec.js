// import { mount } from '@vue/test-utils'
// import SortList from '../src/components/SortList.vue'
// import { shallow, createLocalVue } from '@vue/test-utils'
// import sinon from 'sinon'
// import Vuex from 'vuex'
// import App from '@/App'

// const localVue = createLocalVue()

// describe('SortList', () => {
//     // Inspect the raw component options
//     it('has data', () => {
//         expect(typeof SortList.data).toBe('function')
//     })
// })


// describe('App', () => {

//     let actions
//     let store

//     beforeEach(() => {
//         actions = {
//             toggleDevice: jest.fn()
//         }
//         store = new Vuex.Store({
//             state: {},
//             modules: {
//                 auth
//             },
//             actions
//         })
//     })

//     it('should have beforeMount hook', () => {
//         const wrapper = shallow(App, { store, localVue })
//         wrapper.getCo
//     })
// })

// describe('SortList component unit test', () => {
//     test('Is a vue instance', () => {
//         const wrapper = mount(SortList, {
//             props: {
//                 sort: "test"
//             }
//         })
//         expect(wrapper.isVueInstance()).toBeTruthy()
//     })
// })

import Vuex from 'vuex'
import { shallow, createLocalVue } from '@vue/test-utils'
import App from '@/App'
// import Getters from '@/Getters.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
describe('Getters', () => {
  describe('with a store', () => {
    let store
    let getters
    beforeEach(() => {
      getters = {
        posts: () => [],
        postActions: () => [],
      }
      store = new Vuex.Store({ getters })
    })
    it('renders a values from getters', () => {
      const wrapper = shallow(App, {
        store,
        localVue
      })
      expect(wrapper.find('.map-getters')
        .toHaveLength(5))
    })
  })
})
