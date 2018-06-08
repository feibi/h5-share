<template>
  <div class="detail">
      <div class='content'>
        房源信息详情
        <div class="item">
            {{$lodash.get(detail,'id')}}
        </div>
      </div>
      <div class='fix-bar center'>
        fix
      </div>
  </div>
</template>

<script>
import {getHouse} from '../../services/house';

const defaultDetail = {
  belongerVo: {},
  id: undefined
};
export default {
  name: 'houseDetail',
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

.item {
  height: 20000px;
}

.fix-bar {
  position: fixed;
  background: linear-gradient(right, #ec4b39, #ff2c52);
  color: #fff;
  bottom: 0;
  height: 100px;
  width: 100%;
}
</style>


