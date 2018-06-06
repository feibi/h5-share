<template>
  <div class="hello">
    <div class='example-square'>12</div>
     <h1>{{ msg }}</h1>
     <div class='example-1px-border'>56</div>
     <div :class="[$style.module,'ignore']">78</div>
     <div class='example-text'>90</div>
  </div>
</template>

<script>
import _ from 'lodash';
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: function() {
    return {
      obj: {
        k: 1
      }
    };
  },
  created() {
    // eslint-disable-next-line
    console.log('测试lodash按需加载', _.get(this.$data, 'obj.k'));
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped module>
h3 {
  margin: 40px 0 0;
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
.module {
  height: 130px;
}
</style>

<style scoped>
.ignore {
  font-size: 16px;
}
</style>

