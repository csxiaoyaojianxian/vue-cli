<template>
  <div>
    <el-row>
      <el-col>
        <el-card shadow="hover">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>内容配置</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/content/thread' }">帖子</el-breadcrumb-item>
          </el-breadcrumb>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-card shadow="hover">
          <el-row type="flex" justify="start" align="middle">
            <el-col :span="2">
              <el-select v-model="search.type" @change="searchTypeChange">
                <el-option
                  v-for="item in search.option"
                  :key="item.type"
                  :label="item.label"
                  :value="item.type">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="8">
              <el-input v-model="search.content" placeholder="搜索内容" @keyup.enter.native="request(1)"></el-input>
            </el-col>
            <el-col :span="2">
              <el-button
                size="small"
                type="danger"
                circle
                icon="el-icon-delete"
                @click="delSelected()">
              </el-button>
            </el-col>
          </el-row>
          <el-table
            ref="multipleTable"
            :data="tableData"
            v-loading="loading"
            stripe
            max-height="500"
            style="width: 100%"
            tooltip-effect="dark"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              label="话题"
              width="120">
              <template slot-scope="scope">
                <el-tag v-for="(value,key,index) in scope.row.forumNames" :key="index">{{value}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="sTitle"
              label="标题"
              width="280"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="sDesc"
              label="描述"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="iViews"
              label="阅读量"
              width="100">
            </el-table-column>
            <el-table-column
              label="时间"
              width="100"
              :formatter="formatTimestamp"
              sortable>
            </el-table-column>
            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  circle
                  type="warning"
                  @click="edit(scope.$index, scope.row)"><i class="el-icon-edit"></i></el-button>
                <el-button
                  size="mini"
                  circle
                  type="primary"
                  v-if="scope.row.iStatus == 0"
                  @click="setTop(scope.$index, scope.row, 1)"><i class="el-icon-arrow-up"></i></el-button>
                <el-button
                  size="mini"
                  circle
                  type="danger"
                  v-if="scope.row.iStatus == 1"
                  @click="setTop(scope.$index, scope.row, 2)"><i class="el-icon-arrow-down"></i></el-button>
                <el-button
                  size="mini"
                  type="primary"
                  v-if="scope.row.iForumUp == 0"
                  @click="setTop(scope.$index, scope.row, 3)">话题<i class="el-icon-arrow-up"></i></el-button>
                <el-button
                  size="mini"
                  type="danger"
                  v-if="scope.row.iForumUp == 1"
                  @click="setTop(scope.$index, scope.row, 4)">话题<i class="el-icon-arrow-down"></i></el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              layout="total, prev, pager, next, jumper"
              background
              @current-change="handleCurrentChange"
              :page-size="pager.size"
              :total="pager.total">
            </el-pagination>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import moment from 'moment/moment'

export default {
  data () {
    return {
      tableData: [],
      multipleSelection: [],
      loading: false,
      // 搜索内容
      search: {
        type: '话题',
        content: '',
        option: [
          {type: 1, label: '话题'},
          {type: 2, label: '标题'},
          {type: 3, label: '作者'}
        ]
      },
      // 分页参数
      pager: {
        size: 20, // 每页数量
        total: 0 // 数据总量
      }
    }
  },
  methods: {
    // 页码控制
    handleCurrentChange (val) {
      this.request(val)
    },
    // 多选选中状态改变触发
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(val)
    },
    searchTypeChange () {
      this.request()
    },
    // 格式化时间
    formatTimestamp (row, column) {
      return moment.unix(row.iFirstPostTime).format('YYYY-MM-DD HH:mm:ss')
    },
    request (page) {
      this.loading = true
      let param = {
        module: 'admin',
        action: 'thread',
        func: 'doQueryThread',
        page: page || 1,
        num: this.pager.size
      }
      switch (this.search.type) {
        case '话题':
          param['forum'] = this.search.content
          break
        case 1:
          param['forum'] = this.search.content
          break
        case 2:
          param['title'] = this.search.content
          break
        case 3:
          param['author'] = this.search.content
          break
      }
      console.log(this.search.type)
      this.$axios
        .get('index.php', {
          params: param
        })
        .then(res => {
          let data = res.data
          if (data.retCode === 0) {
            this.pager.total = parseInt(data.count)
            this.tableData = data.data || []
            this.solveForumNames()
            console.log(this.tableData)
          } else {
            this.$message.error(data.retCode > 0 ? data.retInfo : '加载数据失败')
          }
        })
        .catch(() => {
          this.$message.error('error!请联系georgehuang')
        })
        .finally(() => {
          this.loading = false
        })
    },
    // 删除所选项
    delSelected () {
      this.loading = true
      // 提取id数组
      let ids = []
      for (let i = 0; i < this.multipleSelection.length; i++) {
        ids.push(this.multipleSelection[i].iId)
      }
      let param = {
        module: 'admin',
        action: 'thread',
        func: 'doDelThread',
        ids: ids.join('|')
      }
      this.$axios
        .get('index.php', {
          params: param
        })
        .then(res => {
          let data = res.data
          if (data.retCode === 0) {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.request()
          } else {
            this.$message.error(data.retCode > 0 ? data.retInfo : '删除数据失败')
          }
        })
        .catch(() => {
          this.$message.error('error!请联系georgehuang')
        })
        .finally(() => {
          this.loading = false
        })
    },
    // 编辑
    edit (index, row) {
      // 打开链接
      window.open(`http://bbs.cfhd.cf.qq.com/index.php?module=forum&action=display&func=editPost&tid=${row.iId}&pid=${row.pid}`)
    },
    // 置顶
    setTop (index, row, type) {
      this.loading = true
      let param = {
        module: 'admin',
        action: 'thread',
        id: row.iId
      }
      switch (type) {
        // 全局置顶
        case 1:
          param['func'] = 'doSetTopThread'
          break
        case 2:
          param['func'] = 'doUnsetTopThread'
          break
        // 话题置顶
        case 3:
          param['func'] = 'doSetTopThreadForum'
          break
        case 4:
          param['func'] = 'doUnsetTopThreadForum'
          break
      }
      this.$axios
        .get('index.php', {
          params: param
        })
        .then(res => {
          let data = res.data
          if (data.retCode === 0) {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.request()
          } else {
            this.$message.error(data.retCode > 0 ? data.retInfo : '操作失败')
          }
        })
        .catch(() => {
          this.$message.error('error!请联系georgehuang')
        })
        .finally(() => {
          this.loading = false
        })
    },
    // 处理话题 => array
    solveForumNames () {
      for (var i = 0; i < this.tableData.length; i++) {
        let arr = this.tableData[i]['sFnames'].split('|')
        arr.pop()
        arr.shift()
        this.tableData[i]['forumNames'] = arr
      }
    }
  },
  created () {
    this.request()
  }
}
</script>

<style lang="less">

</style>
