import Vue from "vue";
import Vuex from "vuex";

import discoveryModule from "./modules/discovery"
import topListModule from "./modules/toplist";
import playListModule from "./modules/playlist";
import albumModule from "./modules/album";
import artistsModule from "./modules/artists";
import djRadioModule from "./modules/djradio";
import musicModule from "./modules/song";
import audioPlayListModule from "./modules/audio-play-list";


Vue.use(Vuex);

const state = {}

const store = new Vuex.Store({
  state,
  modules: {
    a: discoveryModule,
    b: topListModule,
    c: playListModule,
    d: albumModule,
    e: artistsModule,
    f: djRadioModule,
    g: musicModule,
    h: audioPlayListModule
  }
})

export default store;