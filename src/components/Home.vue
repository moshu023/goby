<template>
  <div>
  <el-container class="home-container">
    <el-aside width="65px" class="left-aside">
      <!--头像区域-->
      <div class="home-avatar">
        <img src="../assets/avatar.png" alt="avatar">
      </div>
      <!--登录按钮-->
      <div>
        <span class="login" slot="title">登录</span>
      </div>
      <!--侧边栏主菜单-->
      <el-menu class="icon" unique-opened :router="true">
        <el-menu-item index="scan" @click="getScan">
          <el-tooltip effect="dark" content="扫描" placement="right-end" :enterable="false">
            <svg class="icon-items" aria-hidden="true">
              <use xlink:href="#icon-saomiao"></use>
            </svg>
          </el-tooltip>
        </el-menu-item>
        <el-menu-item index="assets" @click="getAssets3">
          <el-tooltip effect="dark" content="资产" placement="right-end" :enterable="false">
            <svg class="icon-items" aria-hidden="true">
              <use xlink:href="#icon-zichan-copy-copy"></use>
            </svg>
          </el-tooltip>
        </el-menu-item>
        <el-menu-item index="bug">
          <el-tooltip effect="dark" content="漏洞" placement="right-end" :enterable="false">
            <svg class="icon-items" aria-hidden="true">
              <use xlink:href="#icon-avdsloudongsaomiao"></use>
            </svg>
          </el-tooltip>
        </el-menu-item>
        <el-menu-item index="report" @click="getReport">
          <el-tooltip  effect="dark" content="报告" placement="right-end" :enterable="false">
            <svg class="icon-items" aria-hidden="true">
              <use xlink:href="#icon-icon_app_report_"></use>
            </svg>
          </el-tooltip>
        </el-menu-item>
        <el-menu-item index="extender">
          <el-tooltip effect="dark" content="扩展程序" placement="right-end" :enterable="false">
            <svg class="icon-items" aria-hidden="true">
              <use xlink:href="#icon-_H_"></use>
            </svg>
          </el-tooltip>
        </el-menu-item>
      </el-menu>
      <!--侧边栏主菜单结束-->
      <!--侧边栏副菜单-->
      <div class="icon-bottom">
        <div class="exit" >
          <el-tooltip effect="dark" content="关闭程序" placement="top" :enterable="false">
            <svg class="icon-items" aria-hidden="true">
              <use xlink:href="#icon-dianyuan1"></use>
            </svg>
          </el-tooltip>
        </div>
        <div class="setting">
          <el-tooltip effect="dark" content="设置" placement="top" :enterable="false">
            <svg class="icon-items" aria-hidden="true">
              <use xlink:href="#icon-shezhi"></use>
            </svg>
          </el-tooltip>
        </div>
        <div class="more">
          <el-tooltip effect="dark" content="更多" placement="top" :enterable="false">
            <svg class="icon-items" aria-hidden="true">
              <use xlink:href="#icon-gengduo"></use>
            </svg>
          </el-tooltip>
        </div>
      </div>
      <!--侧边栏副菜单结束-->
    </el-aside>
    <el-main>
      <!--路由占位符-->
      <router-view></router-view>
      <!--环形进度条-->
      <div class="saomiao" v-if="isShowCircle">
          <el-progress
            class="circleCenter"
            :text-inside="true"
            :stroke-width="26"
            style="width: 100%"
            :percentage="((this.fenzi / this.fenmu).toFixed(2)) * 100 || 0"></el-progress>
        <div>
          <el-button type="primary" @click="drawer = true">
            <span v-show="!isShow1">扫描</span>
          </el-button>
        </div>
      </div>
    </el-main>
    <el-aside width="65px" class="right-aside">
      <!--右侧菜单-->
      <!--新建扫描抽屉功能-->
       <el-drawer
        title="新建扫描任务"
        :visible.sync="drawer"
       ref="firstDrawer">
        <!--嵌入表单-->
        <el-form :model="addForm" ref="addFormRef"
                 label-width="100px" class="demo-ruleForm"
                 @select="firstDrawerClose" label-position="right">
          <el-form-item label="IP/Domain">
            <el-select v-model="addForm.taskKind" placeholder="请选择输入IP/Domain">
              <el-option @click.native="controlIPAndDomain" label="IP" value="0"></el-option>
              <el-option @click.native="controlIPAndDomain" label="Domain" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="!isIP" prop="ip" :rules="[{validator:validateIPAddress, trigger: 'blur' }]">
            <div slot="label">
              <span>IP：</span>
              <span>
                <el-tooltip effect="dark" placement="bottom" :enterable="false">
                <div slot="content">
                  <span>多IP段示例：</span><br/>
                  <span>192.0.0.0/24</span><br/>
                  <span>192.0.1.0/24</span><br/>
                  <span>192.0.2.0/24</span><br/>
                  <span>或：192.0.0.1-192.0.3.255</span>
                </div>
                <svg class="icon-help" aria-hidden="true">
                  <use xlink:href="#icon-bangzhu"></use>
                </svg>
              </el-tooltip>
              </span>
            </div>
            <el-input v-model="addForm.ip" class="input1" type="textarea" autocomplete="off" size="mini" value="10.245.150.0/24"></el-input>
          </el-form-item>
          <el-form-item v-if="!isDomain" prop="domain" :rules="[{validator:validateDomain, trigger: 'blur' }]">
            <div slot="label">
              <span>Domain：</span>
              <span>
                <el-tooltip effect="dark" placement="bottom" :enterable="false">
                <div slot="content">
                  <span>Domain, Example: </span><br/>
                  <span>gobies.org</span><br/>
                  <span>cn.gobies.org</span><br/>
                </div>
                <svg class="icon-help" aria-hidden="true">
                  <use xlink:href="#icon-bangzhu"></use>
                </svg>
              </el-tooltip>
              </span>
            </div>
            <el-input v-model="addForm.domain" class="input1" type="textarea" autocomplete="off" size="mini"></el-input>
          </el-form-item>
          <el-form-item>
            <div slot="label">
              <span>端口：</span>
              <span>
                <el-tooltip effect="dark" placement="bottom" :enterable="false">
                  <div slot="content">
                    <span>自定义UDP端口：</span><br/>
                    <span>U:5008</span><br/>
                    <span>自定义UDP端口协议</span><br/>
                    <span>U:50050:cobaltstrike</span>
                  </div>
                  <svg class="icon-help" aria-hidden="true">
                    <use xlink:href="#icon-bangzhu"></use>
                  </svg>
                </el-tooltip>
              </span>
            </div>
            <el-select placeholder="请选择端口" v-model="isUdp">
              <el-option @click.native="chooseTest" label="test3389" value="3389"></el-option>
              <el-option @click.native="chooseTest" label="test8080" value="8080"></el-option>
              <el-option @click.native="chooseTest" label="test1" value="3389#80#443#22#8080"></el-option>
              <el-button type="primary" style="width: 100%;" @click="dialogFormVisible = true">+ 自定义端口</el-button>
            </el-select>
          </el-form-item>
          <el-form-item prop="ports" :rules="[{validator:validatePort, trigger: 'blur' }]">
            <el-input v-model="this.addForm.ports" class="input1" type="textarea" autocomplete="off" size="mini">
              {{this.addForm.ports}}
            </el-input>
          </el-form-item>
          <el-form-item class="prosetting" style="text-align: right">
            <span @click="changeIsShow">高级配置</span>
            <span @click="changeIsShow" v-show="isButton1">
              <svg aria-hidden="true" class="icon-prosetting">
                <use xlink:href="#icon-insert-bottom-full"></use>
              </svg>
            </span>
              <span @click="changeIsShow" v-show="isButton2">
                <svg aria-hidden="true" class="icon-prosetting">
                  <use xlink:href="#icon-insert-top-full"></use>
                </svg>
              </span>
          </el-form-item>
          <el-form-item label="任务名称:" v-show="isShow">
            <el-input v-model="addForm.taskName"></el-input>
          </el-form-item>
          <el-form-item style="text-align: left">
            <el-button type="primary" style="width: 200px; background-color: #4778C7" @click="addTask">开始</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
         <!--自定义端口对话框-->
         <el-dialog title="自定义端口" :visible.sync="dialogFormVisible">
           <el-form :model="addForm" ref="addPortsRef">
             <el-form-item prop="ports" label="端口名称" :rules="[{validator:validatePort, trigger: 'blur' }]">
               <el-input type="textarea" v-model="addForm.ports" autocomplete="off" placeholder="多个端口号请以'#'隔开!"></el-input>
             </el-form-item>
           </el-form>
           <div slot="footer" class="dialog-footer">
             <el-button @click="dialogFormVisible = false">取 消</el-button>
             <el-button type="primary" @click="addPort">确 定</el-button>
           </div>
         </el-dialog>
      </el-drawer>
      <el-menu class="icon-right" router>
        <el-menu-item class="add" @click="drawer = true">
          <el-tooltip effect="dark" content="新建扫描" placement="left" :enterable="false">
            <svg class="icon-items-add" aria-hidden="true">
              <use xlink:href="#icon-xinjiantianjia"></use>
            </svg>
          </el-tooltip>
        </el-menu-item>
        <el-menu-item @click="getHistory" :router="false">
          <el-tooltip effect="dark" content="扫描历史任务" placement="left" :enterable="false">
            <svg class="icon-items" aria-hidden="true">
              <use xlink:href="#icon-lishi"></use>
            </svg>
          </el-tooltip>
        </el-menu-item>
        <!--任务列表-->
        <el-drawer
          title="历史任务记录"
          :visible.sync="table"
          ref="secondDrawer"
          direction="rtl"
          size="70%">
          <el-button type="warning" round
                     class="historyButton"
                     @click="handleDeleteMore">批量删除</el-button>
          <el-table :data="taskData.slice((queryInfo.currentPage-1)*queryInfo.pagesize, queryInfo.currentPage*queryInfo.pagesize)"
                    :default-sort = "{prop: 'taskCode', order: 'descending'}"
                    @selection-change="changeBox"
                    stripe height="500px">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="IP：">
                    <span>{{ props.row.ip }}</span>
                  </el-form-item>
                  <el-form-item label="Domain：">
                    <span>{{ props.row.domain }}</span>
                  </el-form-item>
                  <el-form-item label="任务名称：">
                    <span>{{ props.row.taskName }}</span>
                  </el-form-item>
                  <el-form-item label="任务类型：">
                    <span>{{ props.row.taskKind }}</span>
                  </el-form-item>
                  <el-form-item label="端口：">
                    <span>{{ props.row.ports }}</span>
                  </el-form-item>
                  <el-form-item label="任务编码：">
                    <span>{{ props.row.taskCode }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column property="ip" label="IP" key="ip" width="220"></el-table-column>
            <el-table-column v-if="(taskData.domain !== '')" property="domain" label="Domain" key="domain" width="220"></el-table-column>
            <!--<el-table-column property="ip_status" label="进度" width="50"></el-table-column>-->
            <el-table-column property="assets" label="资产" width="80">-</el-table-column>
            <el-table-column property="bug" label="漏洞" width="100">-</el-table-column>
            <el-table-column sortable property="taskName" label="任务名称"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="props">
                <el-button
                  @click="getToResult(props.row)"
                  size="mini">查看</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(props.$index, props.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.currentPage"
            :page-sizes="[1, 5, 8]"
            :page-size="queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </el-drawer>
        <el-menu-item index="servers">
          <el-tooltip effect="dark" content="服务器管理" placement="left" :enterable="false">
            <svg class="icon-items" aria-hidden="true">
              <use xlink:href="#icon-fuwuqi"></use>
            </svg>
          </el-tooltip>
        </el-menu-item>
        <el-menu-item index="web">
          <el-tooltip effect="dark" content="Web检测" placement="left" :enterable="false">
            <svg class="icon-items" aria-hidden="true">
              <use xlink:href="#icon-web-channel"></use>
            </svg>
          </el-tooltip>
        </el-menu-item>
        <el-menu-item index="IP">
          <el-tooltip effect="dark" content="IP Lib" placement="left" :enterable="false">
            <svg class="icon-items" aria-hidden="true">
              <use xlink:href="#icon-IP"></use>
            </svg>
          </el-tooltip>
        </el-menu-item>
        <el-menu-item index="bug">
          <el-tooltip effect="dark" content="漏洞" placement="left" :enterable="false">
            <svg class="icon-items" aria-hidden="true">
              <use xlink:href="#icon-loudong"></use>
            </svg>
          </el-tooltip>
        </el-menu-item>
        <el-menu-item index="data">
          <el-tooltip effect="dark" content="数据统计" placement="left" :enterable="false">
            <svg class="icon-items" aria-hidden="true">
              <use xlink:href="#icon-tongji"></use>
            </svg>
          </el-tooltip>
        </el-menu-item>
        <el-menu-item index="extender1">
          <el-tooltip effect="dark" content="扩展程序" placement="left" :enterable="false">
            <svg class="icon-items" aria-hidden="true">
              <use xlink:href="#icon-extend"></use>
            </svg>
          </el-tooltip>
        </el-menu-item>
      </el-menu>
    </el-aside>
  </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 帮助跳转report，记录当前行的taskCode
      thisTaskCode: '',
      // 轮询ID记录器
      timer: 0,
      // 进度条隐藏状态
      isShowCircle: true,
      taskStatus: '',
      taskCode: '',
      isUdp: '',
      // 选择填写IP还是域名的状态校验
      isDomain: true,
      isIP: true,
      isShowIP: true,
      isShowDomain: true,
      // 右边抽屉
      drawer: false,
      // 表单显示与隐藏状态
      isShow: false,
      // 环形进度条状态
      isShow1: false,
      isButton1: true,
      isButton2: false,
      // 进度条百分比
      arr: [],
      fenzi: 0.0,
      fenmu: 0.0,
      // 分页设置
      queryInfo: {
        // 当前页数
        currentPage: 1,
        // 当前每页显示的数据条数
        pagesize: 8
      },
      total: 0,
      // 批量删除历史记录，暂时存储数据数组
      selectedList: [],
      multipleSelection: [],
      // 历史记录状态
      table: false,
      defaultActive: false,
      taskData: [{
        taskCode: '',
        taskName: '',
        taskKind: '',
        ip: '',
        domain: '',
        ports: '',
        ip_status: '',
        domain_status: ''
      }],
      dialogFormVisible: false,
      // 发布任务提交表单数据
      addForm: {
        taskName: '',
        taskKind: '',
        ip: '',
        domain: '',
        ports: ''
      }
    }
  },
  created() {
    // 实现轮询
    //   window.setInterval(() => {
    //     setTimeout(this.getStatus(), 0);
    //   }, 3000);
    // },
  },
  methods: {
    // 自定义IP验证规则，注意正斜杠筛选
    validateIPAddress(rule, value, callback) {
      const regexp = /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}\/?([0-9]{2})?$/
      const valdata = value.split('#')
      let isCorrect = true
      if (valdata.length) {
        for (let i = 0; i < valdata.length; i++) {
          if (regexp.test(valdata[i]) === false) {
            isCorrect = false
          }
        }
      }
      if (value === '') {
        return callback(new Error('请输入iP地址！'))
      } else if (!isCorrect) {
        callback(new Error('请输入正确的ip地址！'))
      } else {
        callback()
      }
    },
    // 自定义域名校验规则
    validateDomain(rule, value, callback) {
      const reg = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/
      const valdomain = value.split('#')
      let isCorrect = true
      if (valdomain.length) {
        for (let i = 0; i < valdomain.length; i++) {
          if (reg.test(valdomain[i]) === false) {
            isCorrect = false
          }
        }
      }
      if (value === '') {
        return callback(new Error('请输入域名!'))
      } else if (!isCorrect) {
        callback(new Error('请输入正确的域名!'))
      } else {
        callback()
      }
    },
    // 域名验证自定义规则
    validatePort(rule, value, callback) {
      const reg = /^(([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5]))$/
      const valport = value.split('#')
      let isCorrect = true
      if (valport.length) {
        for (let i = 0; i < valport.length; i++) {
          if (reg.test(valport[i]) === false) {
            isCorrect = false
          }
        }
      }
      if (value === '') {
        return callback(new Error('请输入端口号!'))
      } else if (!isCorrect) {
        callback(new Error('请输入正确的端口号!'))
      } else {
        callback()
      }
    },
    // 自定义端口预校验
    addPort() {
      this.$refs.addPortsRef.validate(async valid => {
        if (!valid) {
          return
        }
        this.dialogFormVisible = false
      })
    },
    // 控制ip和domain输入
    controlIPAndDomain() {
      if (this.addForm.taskKind === '0') {
        this.isDomain = true
        this.isIP = false
      } else if (this.addForm.taskKind === '1') {
        this.isIP = true
        this.isDomain = false
      }
      // console.log(this.addForm.taskKind)
      // console.log(this.isDomain)
    },
    // 重置表单
    resetForm() {
      this.$refs.addFormRef.resetFields()
    },
    // 改变高级配置显示与隐藏状态
    changeIsShow() {
      this.isShow = !this.isShow
      this.isButton1 = !this.isButton1
      this.isButton2 = !this.isButton2
    },
    // changeIsShow1() {
    //   this.isShow1 = !this.isShow1
    // },
    // 端口快捷选择
    chooseTest() {
      // console.log(this.isUdp)
      if (this.isUdp === '3389') {
        this.addForm.ports = '3389'
      }
      if (this.isUdp === '3389#80#443#22#8080') {
        this.addForm.ports = '3389#80#443#22#8080'
      } else if (this.isUdp === '8080') {
        this.addForm.ports = '8080'
      }
      // console.log(this.addForm.ports)
    },
    // 发布任务
    addTask() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) {
          this.$message.error('请先填写发布任务所需信息！')
          return
        } else if (this.addForm.taskKind === '') {
          this.$message.error('请先选择IP/Domain类型!')
          return
        }
        this.submitWork()
      })
    },
    // 发布任务
    submitWork() {
      this.$axios({
        method: 'get',
        url: '/submitTask',
        params: {
          taskName: this.addForm.taskName,
          taskKind: this.addForm.taskKind,
          ip: this.addForm.ip,
          domain: this.addForm.domain,
          ports: this.addForm.ports
        }
      }).then(res => {
        if (res.data.success !== true) {
          this.$message.error('发布任务失败！')
        }
        // this.$message.success('发布任务成功！')
        // console.log(res.data.data)
        this.taskCode = res.data.data.taskCode
        // console.log(this.taskCode)
        this.$message.success('发布任务成功！扫描进行中！')
        this.firstDrawerClose()
        this.getBeforeData()
        this.getScanStatus()
      })
    },
    // 轮询得到状态的方法
    // 请求当前扫描状态
    getScanStatus() {
      const self = this
      this.$axios({
        method: 'get',
        url: '/getStatus',
        params: {
          taskCode: this.taskCode
        }
      }).then(result => {
        if (result.data.success !== true) {
          this.$message.error('扫描失败！')
        } else {
          this.taskStatus = result.data.data.taskStatus
          this.arr = this.taskStatus.split('/')
          this.fenzi = this.arr[0]
          this.fenmu = this.arr[1]
          this.timer = setTimeout(() => {
            self.getScanStatus()
          }, 2000)
          if ((this.fenzi / this.fenmu).toFixed(2) === '1.00') {
            this.$message.success('扫描成功！')
            clearTimeout(this.timer)
            // this.getIpsAndPortsInfo()
            this.isShowCircle = false
            console.log(this.isShowCircle)
            this.getScan1()
            // window.location.reload()
          }
          console.log(this.taskStatus)
        }
      })
    },
    // getIpsAndPortsInfo() {
    //   this.$axios({
    //     method: 'get',
    //     url: '/getIpsAndPortsAll',
    //     params: {
    //       taskCode: this.taskCode
    //     }
    //   }).then(res => {
    //     this.ipPortsInfo = res.data.data
    //   })
    // },
    // 跳转到数据加载过渡页
    getBeforeData() {
      this.$router.push('loading')
    },
    // 关闭发布任务的抽屉方法
    firstDrawerClose() {
      this.$refs.firstDrawer.closeDrawer()
    },
    secondDrawerClose() {
      this.$refs.secondDrawer.closeDrawer()
    },
    // 打开历史记录页面
    getHistory() {
      this.getTaskList()
      this.table = true
    },
    // 整合方法并关闭抽屉二
    getToResult(val) {
      this.secondDrawerClose()
      this.isShowCircle = false
      console.log(this.isShowCircle)
      this.thisTaskCode = val.taskCode
      this.getScan2(val)
      // window.location.reload()
    },
    // 通过资产按钮跳转
    getAssets3() {
      if (this.thisTaskCode) {
        this.$router.push({ path: '/assets3', query: { taskCode: this.thisTaskCode } })
      }
      else {
        this.$router.push({ path: '/assets3', query: { taskCode: this.taskCode } })
      }
    },
    // 通过扫描按钮跳转到详情页
    getScan() {
      if (this.thisTaskCode) {
        this.$router.push({ path: '/scan', query: { taskCode: this.thisTaskCode } })
      }
      else {
        this.$router.push({ path: '/scan', query: { taskCode: this.taskCode } })
      }
    },
    getScan1() {
      if (this.taskCode) {
        this.$router.push({ path: '/scan', query: { taskCode: this.taskCode } })
      }
    },
    // 通过历史记录的taskCode来获得ip和端口信息并跳转到扫描结果页面
    getScan2(val) {
      this.$router.push({ path: '/scan', query: { taskCode: val.taskCode } })
    },
    // 查询历史记录
    getTaskList() {
      this.$axios({
        method: 'get',
        url: '/getTaskList'
      }).then(res => {
        // this.ip = res.data.data.ip
        // this.ip_status = res.data.data.ip_status
        // this.taskCode = res.data.data.taskCode
        // console.log(this.taskCode)
        this.taskData = res.data.data
        this.total = res.data.data.length
      })
    },
    // 历史记录分页方法
    // 监听pageSize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getTaskList()
      console.log(newSize)
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.currentPage = newPage
      this.getTaskList()
      console.log(newPage)
    },
    // 批量删除历史任务记录
    changeBox(val) {
      this.multipleSelection = val
    },
    handleDeleteMore() {
      const length = this.multipleSelection.length
      for (let i = 0; i < length; i++) {
        // console.log(this.multipleSelection[i])
        this.selectedList.push(this.multipleSelection[i].taskCode)
        console.log(this.selectedList[i])
      }
      for (let j = 0; j < length; j++) {
        this.$axios({
          method: 'get',
          url: '/deleteTaskRecordByTaskCode',
          params: {
            taskCode: this.selectedList[j]
          }
        }).then(res => {
          this.taskData = res.data.data
        })
      }
      this.getTaskList()
    },
    // 删除历史记录
    handleDelete(index, row) {
      // console.log(index, row)
      this.$axios({
        method: 'get',
        url: '/deleteTaskRecordByTaskCode',
        params: {
          taskCode: row.taskCode
        }
      }).then(res => {
        this.taskData = res.data.data
      })
      this.getTaskList()
    },
    getReport() {
      this.isShowCircle = false
      if (this.thisTaskCode) {
        this.$router.push({ path: '/report', query: { taskCode: this.thisTaskCode } })
      }
      else {
        this.$router.push({ path: '/report', query: { taskCode: this.taskCode } })
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.home-container {
  height: 100%;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.home-avatar > img {
  margin-top: 20px;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin-bottom: 14px;
}
.el-menu .el-menu-item .el-> img {
  width: 10px;
  height: 10px;
}
.icon {
  margin-top: 20px;
  background-color: #4778C7;
  border-right: none;
}
.icon-items {
  width: 2em;
  height: 2em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.saomiao {
  width: 1365px;
  position: fixed;
  bottom: 10px;
}
.historyButton {
  top: 20px;
  float: right;
  margin-right: 60px;
}
.icon-help {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: #A0B0CD;
  overflow: hidden;
}
.circleCenter {
  bottom: 10px;
  color: #333333;
}
.icon-prosetting {
  width: 1.25em;
  height: 1.25em;
  vertical-align: -0.15em;
  fill: #A0B0CD;
  overflow: hidden;
}
.prosetting {
  //float: right;
  cursor: pointer;
}
.input1, .el-form-item{
  font-size: 16px;
  font-family: "Microsoft YaHei";
}
.el-progress {
  margin-top: 60px;
}
.icon-right .icon-items-add {
  width: 2em;
  height: 2em;
  vertical-align: -0.15em;
  overflow: hidden;
}
.icon-right {
  background-color: #F2F7FF;
  text-align:center;
}
.icon-right .icon-items{
  width: 1.5em;
  height: 1.5em;
  vertical-align: -0.15em;
  background-color: #F2F7FF;
}
.icon-bottom {
  font-size: 8px;
  color: #fff;
  line-height: 24px;
  text-align: center;
  letter-spacing: .2em;
  cursor: pointer;
  margin-top: 200px;
  background-color: #4778C7;
  border-right: none;
}
.exit {
  margin-bottom: 15px;
}
.setting {
  margin-bottom: 15px;
}
.login {
  cursor: pointer;
  color: #C8D7EE;
  font-size: 12px;
  text-align: center;
}
.left-aside {
  background-color: #4778C7;
  color: #333;
  text-align: center;
}
.right-aside {
  border-left:1px solid #E5EBF7;
  background-color: #F2F7FF;
  color: #333;
}
.el-main {
  background-color: #F2F7FF;
  color: #333;
  text-align: center;
}
</style>
