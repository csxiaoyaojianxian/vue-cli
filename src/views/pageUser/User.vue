<template>
  <div>
    <el-row>
      <el-col>
        <el-card shadow="hover">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/user' }">用户配置</el-breadcrumb-item>
          </el-breadcrumb>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-card shadow="hover">
          <el-row type="flex" justify="start" align="middle">
            <el-col :span="8">
              <el-input v-model="search.content" placeholder="昵称 / QQ" @keyup.enter.native="request(1)"></el-input>
            </el-col>
            <el-col :span="3" :offset="1">
              <el-button
                size="mini"
                type="danger"
                @click="ban(3)"><i class="el-icon-close"></i>禁言</el-button>
            </el-col>
            <el-col :span="3">
              <el-button
                size="mini"
                type="success"
                @click="ban(4)"><i class="el-icon-check"></i>解除</el-button>
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
              prop="sUin"
              label="QQ"
              width="120"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="sName"
              label="昵称">
            </el-table-column>
            <el-table-column
              prop="dtRegTime"
              label="注册时间"
              width="100"
              sortable>
            </el-table-column>
            <el-table-column label="操作" width="350">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  circle
                  type="danger"
                  v-if="scope.row.iGroupId == 1"
                  @click="ban(1, scope.$index, scope.row)"><i class="el-icon-close"></i></el-button>
                <el-button
                  size="mini"
                  circle
                  type="success"
                  v-else-if="scope.row.iGroupId == 2"
                  @click="ban(2, scope.$index, scope.row)"><i class="el-icon-check"></i></el-button>
                <el-button
                  size="mini"
                  circle
                  type="info"
                  v-else><i class="el-icon-star-on"></i></el-button>
                <el-select v-model="scope.row.tempData1" :placeholder="groupData[scope.row.iGroupId-1].sName" class="cs-user-select" @change="groupChange(scope.row.tempData1,scope.row)">
                  <el-option
                    v-for="item in groupData"
                    :key="item.iId"
                    :label="item.sName"
                    :value="item.iId">
                  </el-option>
                </el-select>
                <el-select v-model="scope.row.tempData2" :placeholder="adminGroupData[scope.row.iAdminId].sName" class="cs-user-select" @change="adminGroupChange(scope.row.tempData2,scope.row)">
                  <el-option
                    v-for="item in adminGroupData"
                    :key="item.iId"
                    :label="item.sName"
                    :value="item.iId">
                  </el-option>
                </el-select>
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
      // 分页参数
      pager: {
        size: 20, // 每页数量
        total: 0 // 数据总量
      },
      search: {
        content: ''
      },
      // 用户分组信息
      groupData: [],
      // 管理员分组
      adminGroupData: [
        {iId: 0, sName: '非管理员'},
        {iId: 1, sName: '管理员'},
        {iId: 2, sName: '超级管理员'}
      ]
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
    // 加载分组信息
    queryGroupAll () {
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
            this.groupData = data.data
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
    request (page) {
      this.loading = true
      let param = {
        module: 'admin',
        action: 'user',
        func: 'doQueryUser',
        page: page || 1,
        count: this.pager.size
      }
      if (this.search.content) {
        param['key'] = this.search.content
      }
      this.$axios
        .get('index.php', {
          params: param
        })
        .then(res => {
          let data = res.data
          if (data.retCode === 0) {
            this.pager.total = parseInt(data.count)
            this.tableData = data.result || []
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
    groupChange (value, row) {
      this.loading = true
      let param = {
        module: 'admin',
        action: 'user',
        func: 'doUpdateUserGroup',
        uid: row.iId,
        gid: value
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
    adminGroupChange (value, row) {
      this.loading = true
      let param = {
        module: 'admin',
        action: 'user',
        func: 'doSetAdmin',
        uid: row.iId,
        admin_id: value
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
    ban (type, index, row) {
      this.loading = true
      // 提取id数组
      let ids = []
      if (type === 1 || type === 2) {
        ids.push(row.iId)
      } else {
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].iId)
        }
      }
      let param = {
        module: 'admin',
        action: 'user',
        ids: ids.join('|')
      }
      switch (type) {
        case 1:
          param['func'] = 'doBanUsers'
          break
        case 2:
          param['func'] = 'doUnBanUsers'
          break
        case 3:
          param['func'] = 'doBanUsers'
          break
        case 4:
          param['func'] = 'doUnBanUsers'
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
    }
  },
  created () {
    this.queryGroupAll()
    this.request()
  }
}
</script>

<style lang="less">
.cs-user-select {
  width: 120px;
  margin-left: 10px;
}
</style>
