<template>
  <div>
    <el-row>
      <el-col>
        <el-card shadow="hover">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>内容配置</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/content/forum' }">话题</el-breadcrumb-item>
          </el-breadcrumb>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-card shadow="hover">
          <el-row type="flex" justify="start" align="middle">
            <el-col :span="8">
              <el-input v-model="searchName" placeholder="请输入话题名称" @keyup.enter.native="request(1)"></el-input>
            </el-col>
            <el-col :span="2">
              <el-button
                size="small"
                type="success"
                circle
                icon="el-icon-plus"
                @click="openDialog1()">
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
              prop="sName"
              label="话题名称"
              sortable
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="iType"
              label="话题类型"
              :formatter="formatForum"
              width="100">
            </el-table-column>
            <el-table-column label="图片链接" width="180">
              <template slot-scope="scope">
                <img :src="scope.row.sHeadImg" class="cs-head-img"/>
              </template>
            </el-table-column>
            <el-table-column label="移动端图片连接" width="180">
              <template slot-scope="scope">
                <img :src="scope.row.sHeadImgMobile" class="cs-head-img"/>
              </template>
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
    <el-dialog
      title="话题信息"
      :visible.sync="dialog1.visible"
      width="30%">
      <el-row type="flex" justify="start" align="middle">
        <el-col :span="2">
          <i class="el-icon-news"></i>
        </el-col>
        <el-col :span="6">
          <span>话题名称</span>
        </el-col>
        <el-col :span="16">
          <el-input v-model="dialog1.sName" placeholder="请输入～"></el-input>
        </el-col>
      </el-row>
      <el-row type="flex" justify="start" align="middle" class="mt-sm">
        <el-col :span="2">
          <i class="el-icon-news"></i>
        </el-col>
        <el-col :span="6">
          <span>话题类型</span>
        </el-col>
        <el-col :span="16">
          <el-select v-model="dialog1.iType" placeholder="请选择">
            <el-option
              v-for="item in dialog1.topicOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row v-if="dialog1.iType == 2" type="flex" justify="start" align="middle" class="mt-sm">
        <el-col :span="2">
          <i class="el-icon-news"></i>
        </el-col>
        <el-col :span="6">
          <span>头图链接</span>
        </el-col>
        <el-col :span="16">
          <el-input v-model="dialog1.sHeadImg" placeholder="请输入～"></el-input>
        </el-col>
      </el-row>
      <el-row v-if="dialog1.iType == 2" type="flex" justify="start" align="middle" class="mt-sm">
        <el-col :span="2">
          <i class="el-icon-news"></i>
        </el-col>
        <el-col :span="6">
          <span>移动端头图</span>
        </el-col>
        <el-col :span="16">
          <el-input v-model="dialog1.sHeadImgMobile" placeholder="请输入～"></el-input>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog1.visible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit()">确 定</el-button>
      </span>
    </el-dialog>
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
      return row.iType === '1' ? '普通话题' : '活动话题'
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
    // 新增按钮
    openDialog1 () {
      this.dialog1.visible = true
      this.dialog1.iId = 0
      this.dialog1.sName = ''
      this.dialog1.iType = ''
      this.dialog1.sHeadImg = ''
      this.dialog1.sHeadImgMobile = ''
    },
    handleSubmit () {
      this.loading = true
      var param = {
        module: 'admin',
        action: 'forum',
        type: this.dialog1.iType,
        img: this.dialog1.sHeadImg,
        img_mobile: this.dialog1.sHeadImgMobile
      }
      if (this.dialog1.iId > 0) {
        // 更新
        param['func'] = 'doUpdate'
        param['id'] = this.dialog1.iId
        param['name'] = this.dialog1.sName
      } else {
        // 添加
        param['func'] = 'doAdd'
        param['forum_name'] = this.dialog1.sName
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
            this.dialog1.visible = false
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
    request (page) {
      this.loading = true
      this.$axios
        .get('index.php', {
          params: {
            module: 'admin',
            action: 'forum',
            func: 'doQuery',
            page: page || 1,
            count: this.pager.size,
            name: this.searchName || ''
          }
        })
        .then(res => {
          let data = res.data
          if (data.retCode === 0) {
            this.pager.total = parseInt(data.count)
            this.tableData = data.result || []
            console.log(data.result)
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
.cs-head-img {
  height: 40px;
  float: left;
}
.cs-tooltip {
  width: 100%;
}
.el-select {
  width: 100%;
}
</style>
