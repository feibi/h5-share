<template>
  <div class="detail">
      <div class='content'>
        <swiper v-bind:list="pictures"></swiper>
        <div class="hightlight">
            {{$lodash.get(detail,'property.estateName')}}
            {{houseType}}
            {{$lodash.get(detail,'property.buildingArea', '--')}}m²
        </div>
      </div>
      <div class='fix-bar center flex-between-center'>
        <div></div>
        <a class='tel flex-center-center ' href='tel:17621550978'>电话咨询</a>
      </div>
  </div>
</template>

<script>
import Swiper from '../../components/swiper';
import {getHouse} from '../../services/house';

const defaultDetail = {
  belongerVo: {},
  property: {},
  id: undefined
};
export default {
  name: 'houseDetail',
  components: {Swiper},
  data() {
    return {
      detail: {
        ...defaultDetail
      }
    };
  },
  methods: {
    getHouseDetail: function(params) {
      getHouse(params).then(data => {
        this.detail = data;
      });
    }
  },
  created() {
    const {params, query} = this.$route;
    if (!params.id) {
      return;
    }
    this.getHouseDetail({id: params.id, ...query});
  },
  computed: {
    pictures: function() {
      const {floorImage = [], viewImage = []} = this.detail;
      const pictures = floorImage.concat(viewImage);

      return pictures.map(item => item.url);
    },
    houseType: function() {
      const _ = this.$lodash;
      const {property} = this.detail;
      return `${_.get(property, 'roomCount', '--')}室${_.get(property, 'hallCount', '--')}厅${_.get(
        property,
        'toiletCount',
        '--'
      )}卫`;
    }
  }
};
</script>


<style scoped>
.detail {
  height: 100%;
  padding-bottom: 100px;
  position: relative;
  box-sizing: border-box;
}

.content {
  height: 100%;
  -webkit-overflow-scrolling: touch;
  overflow: auto;
}

.fix-bar {
  position: fixed;

  color: #fff;
  bottom: 0;
  height: 100px;
  width: 100%;
}

.tel {
  color: #fff;
  height: 100%;
  padding: 0 10px;
  flex: 1;
  text-decoration: none;
  background: linear-gradient(to left, #ec4b39, #ff2c52);
}
</style>


