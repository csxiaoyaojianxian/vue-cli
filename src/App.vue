<template>
  <div id="app">
    <!-- <div id="nav"></div> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: []
    }
  },
  created () {
    /*
    // get
    this.$axios
      .get('', {
        params: {
          module: 'admin',
          action: 'thumb'
        }
        // baseURL: 'http://bbs.cfhd.cf.qq.com/index.php'
      })
      .then(res => {
        // this.data = res.data.message
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        console.log('最终执行get')
      })

    // post
    this.$axios
      .post('', {
        module: 'admin',
        action: 'thumb'
      }, {
        // 设置
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      })
      .then(res => {
        // this.data = res.data.message
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        console.log('最终执行post')
      })
    */
  },
  methods: {

  }
}
</script>

<style lang="less">
body {
    margin: 0px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
/* 通用全局样式 */
/*布局*/
.mr-sm {
  margin-right: 6px;
}
.mt-sm {
  margin-top: 6px;
}
.float-left {
  float: left;
}
/*尺寸*/
.text-small {
  font-size: 14px;
}
.text-large {
  font-size: 26px;
}

/*文字*/
.ellipsis {
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.ellipsis-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

</style>
