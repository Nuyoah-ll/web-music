<template>
  <div id="djradio-preview">
    <div class="list-pre" v-for="item in mock" :key="item.id">
      <common-navbar>
        <template v-slot:left>
          <h1>
            <span>{{ item.name }}</span>
            <span> · 电台</span>
          </h1>
        </template>
      </common-navbar>

      <div class="list-item">
        <dj-radio-box
          v-for="item in hotDjRadioOfIdAndPage(item.id, 1).slice(0, 4)"
          :key="item.id"
          :dj-radio-info="item"
        />
      </div>
    </div>
  </div>
</template>

<script>
import * as types from "store/constant";
import { showedDjCategories } from "assets/mock";
import CommonNavbar from "components/content/common-navbar/CommonNavbar";
import DjRadioBox from "../child-components/DjRadioBox";
import { mapGetters } from "vuex";
export default {
  name: "DjradioPreview",
  components: {
    CommonNavbar,
    DjRadioBox,
  },
  data() {
    return {
      mock: showedDjCategories,
    };
  },
  computed: {
    ...mapGetters(["hotDjRadioOfIdAndPage"]),
  },
  mounted() {
    this.mock.forEach((item) => {
      this.$store.dispatch(types.GET_HOT_DJ_RADIO_ACTION, {
        id: item.id,
        page: 1,
      });
    });
  },
};
</script>

<style scoped>
.list-item{
  display: grid;
  grid-template-columns: repeat(2,1fr);
}
</style>