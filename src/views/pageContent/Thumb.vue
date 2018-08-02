<template>
  <div>
    <el-row>
      <el-col>
        <el-card shadow="hover">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>内容配置</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/content/thumb' }">点赞</el-breadcrumb-item>
          </el-breadcrumb>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-card shadow="hover">
          <el-row type="flex" justify="start" align="middle">
            <el-col :span="8">
              <el-input v-model="search.content" placeholder="搜索内容" @keyup.enter.native="request(1,true)"></el-input>
            </el-col>
          </el-row>
          <el-table
            ref="multipleTable"
            :data="tableData"
            v-loading="loading"
            stripe
            max-height="500"
            style="width: 100%"
            tooltip-effect="dark">
            <el-table-column
              prop="sTitle"
              label="标题"
              width="250"
              v-if="search.type == 1"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="sDesc"
              label="描述"
              v-if="search.type == 1"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="sContent"
              label="回复内容"
              v-if="search.type == 2"
              sortable>
            </el-table-column>
            <el-table-column
              prop="sComment"
              label="评论内容"
              v-if="search.type == 3"
              sortable>
            </el-table-column>
            <el-table-column
              prop="iThumb"
              label="点赞数"
              width="80">
            </el-table-column>
            <el-table-column
              prop="tsTime"
              label="时间"
              width="100"
              v-if="search.type == 1"
              sortable>
            </el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  circle
                  type="primary"
                  @click="openDialog1(scope.$index, scope.row)"><i class="el-icon-edit"></i></el-button>
                <el-button
                  size="mini"
                  circle
                  type="danger"
                  v-if="search.type == 1"
                  @click="requestPost(scope.$index, scope.row)"><i class="el-icon-view"></i></el-button>
                <el-button
                  size="mini"
                  circle
                  type="info"
                  v-if="search.type == 2"
                  @click="requestComment(scope.$index, scope.row)"><i class="el-icon-view"></i></el-button>
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
    <el-dialog
      title="点赞数"
      :visible.sync="dialog1.visible"
      width="30%">
      <el-row type="flex" justify="center" align="middle">
        <el-col :span="16">
          <el-input v-model="dialog1.thumb" placeholder="请输入～"></el-input>
        </el-col>
        <el-col :span="8">
          <el-button type="success" icon="el-icon-check" circle @click="edit()"></el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      loading: false,
      // 分页参数
      pager: {
        size: 20, // 每页数量
        total: 0 // 数据总量
      },
      search: {
        content: '',
        type: 1, // 类型： 1主贴  2回帖  3评论
        tid: 0, // 用于加载type=2的数据
        pid: 0 // 用于加载type=3的数据
      },
      dialog1: {
        visible: false,
        id: 0,
        thumb: 0
      }
    }
  },
  methods: {
    // 页码控制
    handleCurrentChange (val) {
      this.request(val)
    },
    searchTypeChange () {
      this.request()
    },
    request (page, reset) {
      this.loading = true
      if (reset) this.search.type = 1
      let param = {
        module: 'admin',
        action: 'thumb',
        func: 'doQueryThumb',
        page: page || 1,
        num: this.pager.size,
        type: this.search.type,
        tid: this.search.tid,
        pid: this.search.pid
      }
      if (this.search.content) {
        param['content'] = this.search.content
      }
      this.$axios
        .get('index.php', {
          params: param
        })
        .then(res => {
          let data = res.data
          if (data.retCode === 0) {
            this.pager.total = parseInt(data.count)
            this.tableData = data.data || []
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
    requestPost (index, row) {
      this.search.type = 2
      this.search.tid = row.iId
      this.request()
    },
    requestComment (index, row) {
      this.search.type = 3
      this.search.pid = row.iId
      this.request()
    },
    openDialog1 (index, row) {
      this.dialog1.id = row.iId
      this.dialog1.thumb = row.iThumb
      this.dialog1.visible = true
      console.log(this.dialog1)
    },
    edit () {
      this.loading = true
      let param = {
        module: 'admin',
        action: 'thumb',
        func: 'doUpdateThumb',
        id: this.dialog1.id,
        thumb: this.dialog1.thumb,
        type: this.search.type
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
            this.$message.error(data.retCode > 0 ? data.retInfo : '修改数据失败')
          }
        })
        .catch(() => {
          this.$message.error('error!请联系georgehuang')
        })
        .finally(() => {
          this.loading = false
          this.dialog1.visible = false
        })
    }
  },
  created () {
    this.request()
  }
}
</script>

<style lang="less">

</style>
