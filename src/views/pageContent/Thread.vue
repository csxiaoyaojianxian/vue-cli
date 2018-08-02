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
            <el-col :span="8">
              <el-input v-model="searchName" placeholder="搜索内容" @keyup.enter.native="request(1)"></el-input>
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
              prop="sName"
              label="话题"
              :formatter="formatForum"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="sTitle"
              label="标题"
              width="100"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="sDesc"
              label="描述"
              width="180"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="iViews"
              label="阅读量"
              sortable>
            </el-table-column>
            <el-table-column
              prop="iFirstPostTime"
              label="时间"
              sortable>
            </el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="openDialog2(scope.$index, scope.row)">编辑</el-button>
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
export default {
  data () {
    return {
      tableData: [],
      multipleSelection: [],
      loading: false,
      // 搜索内容
      searchName: '',
      // 分页参数
      pager: {
        size: 20, // 每页数量
        total: 0 // 数据总量
      },
      // dialog1 data
      dialog1: {
        visible: false,
        iId: 0,
        sName: '',
        iType: '',
        sHeadImg: '',
        sHeadImgMobile: '',
        topicOptions: [
          {
            value: '1',
            label: '普通话题'
          },
          {
            value: '2',
            label: '活动话题'
          }
        ]
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
    // 格式化输出话题内容
    formatForum (row, column) {
      return 1
    },
    // 编辑按钮
    openDialog2 (index, row) {
      this.dialog1.visible = true
      this.dialog1.iId = row.iId
      this.dialog1.sName = row.sName
      this.dialog1.iType = row.iType
      this.dialog1.sHeadImg = row.sHeadImg
      this.dialog1.sHeadImgMobile = row.sHeadImgMobile

      console.log(index, row)
    },
    request (page) {
      this.loading = true
      this.$axios
        .get('index.php', {
          params: {
            module: 'admin',
            action: 'thread',
            func: 'doQueryThread',
            page: page || 1,
            num: this.pager.size
          }
        })
        .then(res => {
          let data = res.data
          if (data.retCode === 0) {
            this.pager.total = parseInt(data.count)
            this.tableData = data.data || []
            console.log(data.data)
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
    }
  },
  created () {
    this.request()
  }
}
</script>

<style lang="less">

</style>
