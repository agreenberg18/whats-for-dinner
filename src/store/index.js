import { createStore } from 'vuex'

export default createStore({
  state: {
    data: {},
    restaurants: [],
    website:{},
    dataReceived: 0,
    winner:{}
  },
  mutations: {
    resetData(state){
      state.data = {}
      state.restaurants = []
      state.website ={}
      state.winner = {}
      state.dataReceived = 0
    },

    getData(state, data) {
      //console.log(data)
      state.data = data
      for (var i = 0; i < data.businesses.length; i++) {
        if (i==data.businesses.length -1){
          state.dataReceived = 1
        }
        state.restaurants.push(data.businesses[i].name)
        state.website[data.businesses[i].name] = data.businesses[i].url
      }
      console.log(state.dataReceived)
    },
    setWinner(state,theWinner){
      state.winner = theWinner
    }
  },
  actions: {
    getRestaurants(context, location) {
      context.commit('resetData')
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch("https://spinner-middleware.herokuapp.com/getRestaurants?location=" +location, requestOptions)
        .then(response => response.json())
        //.then(data => console.log(data))
        .then(data => context.commit('getData', data))

    },
    setWinner(context, theWinner){
      console.log(theWinner)
      context.commit('setWinner', theWinner)
    }
  },
  getters: {
    allRestaurants: (state) => {
      //console.log(state.restaurants)
      return state.restaurants
    },
    restaurantUrls: (state) => {
      //console.log(state.restaurants)
      return state.website
    },
    getWinner: (state) =>{
      return state.winner
    },
    dataReceived: (state) =>{
      return state.dataReceived
    }
  }
})