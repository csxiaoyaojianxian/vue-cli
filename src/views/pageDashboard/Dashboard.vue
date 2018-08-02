<template>
  <div>
    <el-row>
      <el-col>
        <el-card shadow="hover">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/dashboard' }">数据统计</el-breadcrumb-item>
          </el-breadcrumb>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-card shadow="hover">
          <el-table
            ref="multipleTable"
            :data="tableData"
            v-loading="loading"
            stripe
            max-height="500"
            style="width: 100%"
            tooltip-effect="dark"
            @selection-change="handleSelectionChange"
            :default-sort = "{prop: 'date', order: 'descending'}">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="date"
              label="日期"
              sortable
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址"
              :formatter="formatter"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      multipleSelection: [],
      loading: false,
      // 分页参数
      pager: {
        size: 40, // 每页数量
        total: 1000 // 显示页码总数
      }
    }
  },

  methods: {
    // 页码控制
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    // 多选选中状态改变触发
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(val)
    },
    // 格式化输出
    formatter (row, column) {
      return row.address
    },
    // 按钮操作
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    }
  }
}
</script>

<style lang="less">

</style>
