<template>
  <div>
    <el-row>
      <el-col>
        <el-card shadow="hover">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/auth' }">权限配置</el-breadcrumb-item>
          </el-breadcrumb>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-card shadow="hover">
          <el-row type="flex" justify="start" align="middle">
            <el-col :span="3">
              <el-button
                size="mini"
                circle
                type="success"
                @click="openDialog1()"><i class="el-icon-plus"></i></el-button>
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
              prop="sName"
              label="分组名称">
            </el-table-column>
            <el-table-column label="新建话题">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.iNewForum"
                  active-value="1"
                  inactive-value="0"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  @change="authChange(scope.row)">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column label="新建帖子">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.iNewThread"
                  active-value="1"
                  inactive-value="0"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  @change="authChange(scope.row)">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column label="发表回复">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.iNewPost"
                  active-value="1"
                  inactive-value="0"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  @change="authChange(scope.row)">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column label="查看">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.iViewDesc"
                  active-value="1"
                  inactive-value="0"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  @change="authChange(scope.row)">
                </el-switch>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      title="新组名"
      :visible.sync="dialog1.visible"
      width="30%">
      <el-row type="flex" justify="center" align="middle">
        <el-col :span="16">
          <el-input v-model="dialog1.name" placeholder="请输入～"></el-input>
        </el-col>
        <el-col :span="8">
          <el-button type="success" icon="el-icon-check" circle @click="addGroup()"></el-button>
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
      dialog1: {
        visible: false,
        name: ''
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
    // 加载分组信息
    request () {
      this.loading = true
      let param = {
        module: 'admin',
        action: 'group',
        func: 'doQueryGroupAll'
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
            this.$message.error(data.retCode > 0 ? data.retInfo : '加载分组数据失败')
          }
        })
        .catch(() => {
          this.$message.error('error!请联系georgehuang')
        })
        .finally(() => {
          this.loading = false
        })
    },
    authChange (row) {
      this.loading = true
      let param = {
        module: 'admin',
        action: 'group',
        func: 'doUpdateGroup',
        id: row.iId,
        new_forum: row.iNewForum,
        new_thread: row.iNewThread,
        new_post: row.iNewPost,
        view_desc: row.iViewDesc
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
    openDialog1 () {
      this.dialog1.visible = true
    },
    addGroup () {
      this.loading = true
      let param = {
        module: 'admin',
        action: 'group',
        func: 'doAddGroup',
        name: this.dialog1.name
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
