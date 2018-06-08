<template>
    <div class="swipe" >
        <swipe @change='handleChange' :speed='250' :auto="0" :showIndicators='false'>
        <swipe-item :key="item" v-for="(item) in pictures">
            <img v-lazy='item'>
        </swipe-item>
        </swipe>
        <div class='indicators-wrapper center' v-if="pictures.length > 0">
            <span class='indicators ignore'>{{currentIndex}} / {{pictures.length}}</span>
        </div>
    </div>
</template>

<script>
import {Swipe, SwipeItem} from 'vue-swipe';
import 'vue-swipe/dist/vue-swipe.css';
export default {
  name: 'swiper',
  components: {Swipe, SwipeItem},
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data: function() {
    return {
      pictures: this.list,
      currentIndex: 1
    };
  },
  watch: {
    list: function() {
      this.pictures = this.list;
    }
  },
  methods: {
    handleChange: function(newIndex, index) {
      this.currentIndex = newIndex + 1;
      this.$emit('changes', newIndex, index);
    }
  }
};
</script>
<style>
.swipe {
  position: relative;
  height: 450px;
  text-align: center;
}

.swipe img {
  height: 100%;
  width: 100%;
}

.indicators-wrapper {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  color: #fff;
}
.indicators {
  padding: 6px 30px;
  border-radius: 25px;
  background: rgba(0, 0, 0, 0.8);
}
</style>
<style scoped>
.ignore {
  font-size: 12px;
}
</style>
