<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
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
    // get
    this.$axios
      .get('', {
        params: {
          module: 'admin',
          action: 'thumb',
          func: 'doQueryThumb',
          page: 1,
          num: 10,
          type: 1,
          tid: 0,
          pid: 0
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
        action: 'thumb',
        func: 'doQueryThumb',
        page: 1,
        num: 10,
        type: 1,
        tid: 0,
        pid: 0
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
  }
}
</script>

<style lang="less">
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
</style>
