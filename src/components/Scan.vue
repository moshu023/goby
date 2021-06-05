<template>
  <div>
    <!--返回键以及标题-->
    <el-page-header @back="goBack" content="扫描结果">
    </el-page-header>
    <!--卡片制作概要信息栏-->
    <el-row :gutter="20" class="importantInfo">
      <el-col :span="6"><div class="grid-content bg-blue">资产
        <h1 class="h1">暂无数据</h1></div></el-col>
      <el-col :span="6"><div class="grid-content bg-blue">活动IP
        <h1 class="h1">{{ this.ipPortsInfo.ipNum }}</h1></div></el-col>
      <el-col :span="6"><div class="grid-content bg-blue">端口
        <h1 class="h1">{{ this.ipPortsInfo.portsNum }}</h1></div></el-col>
      <el-col :span="6"><div class="grid-content bg-blue">漏洞
        <h1 class="h1">暂无数据</h1></div></el-col>
    </el-row>
    <!--主要信息卡片-->
    <el-row :gutter="20">
      <el-col :span="6"><div class="grid-content bg-title">①硬件</div></el-col>
      <el-col :span="6"><div class="grid-content bg-title">②硬件厂商</div></el-col>
      <el-col :span="6"><div class="grid-content bg-title">③软件</div></el-col>
      <el-col :span="6"><div class="grid-content bg-title">④软件厂商</div></el-col>
      <el-col :span="6"><div id="myChart" class="grid-content bg-details">
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-details">暂无数据</div></el-col>
      <el-col :span="6">
        <div class="grid-content bg-details">暂无数据</div>
      </el-col>
      <el-col :span="6"><div class="grid-content bg-details">暂无数据</div></el-col>
      <el-col :span="6"><div class="grid-content bg-title">⑤资产类型</div></el-col>
      <el-col :span="6"><div class="grid-content bg-title">⑥IP</div></el-col>
      <el-col :span="6"><div class="grid-content bg-title">⑦端口</div></el-col>
      <el-col :span="6"><div class="grid-content bg-title">⑧漏洞</div></el-col>
      <el-col :span="6"><div class="grid-content bg-details">暂无数据</div></el-col>
      <el-col :span="6">
        <div id="ipTable" class="grid-content bg-details1">
          <table style="border-collapse:separate; border-spacing:0 10px;">
            <tr style="text-align: left;cursor: pointer;"
                id="ip"
                @click="goAssets(index)"
                v-for="(item, index) in this.ipPortsInfo.ip" :key="item + index">{{ item }}
            </tr>
          </table>
        </div>
      </el-col>
      <el-col :span="6">
        <div id="portsTable" class="grid-content bg-details1">
          <table>
            <tr style="cursor: pointer;text-align: left"
                @click="goAssets1(index)"
                v-for="(item, index) in this.ipPortsInfo.ports"
                :key="item + index">{{ item }}</tr>
          </table>
        </div>
      </el-col>
      <el-col :span="6"><div class="grid-content bg-details">暂无数据</div></el-col>
    </el-row>
  </div>
</template>
<script>
// 引入基本模板
// const echarts = require('echarts/lib/echarts')
// 引入柱状图组件
// require('echarts/lib/chart/bar')
// // 引入提示框和title组件
// require('echarts/lib/component/tooltip')
// require('echarts/lib/component/legend')
// require('echarts/lib/component/title')
export default {
  name: 'scan',
  data() {
    return {
      taskCode: '',
      ipPortsInfo: {
        ip: [],
        ports: [],
        ipNum: 0,
        portsNum: 0,
        ipDetails: [],
        portDetails: []
      }
    }
  },
  created() {
    this.taskCode = this.$route.query.taskCode
    this.getIpsAndPortsInfo()
  },
  watch: {
    $route (to, from) {
      if (to.path === '/scan') {
        this.taskCode = this.$route.query.taskCode
        this.getIpsAndPortsInfo()
      }
    }
  },
  methods: {
    // 从扫描结果跳转到具体的ip详情页，即资产assets
    goAssets(index) {
      this.$router.push({
        path: '/assets',
        query: {
          taskCode: this.taskCode,
          ip_index: index,
          thisip: this.ipPortsInfo.ip[index]
        }
      })
    },
    // 从扫描结果跳转到具体的port详情页，即资产assets1
    goAssets1(index) {
      this.$router.push({
        path: '/assets1',
        query: {
          taskCode: this.taskCode,
          port_index: index,
          thisport: this.ipPortsInfo.ports[index]
        }
      })
    },
    // 扫描端口和ip具体信息
    getIpsAndPortsInfo() {
      this.$axios({
        method: 'get',
        url: '/getIpsAndPortsAll',
        params: {
          taskCode: this.taskCode
        }
      }).then(res => {
        this.ipPortsInfo = res.data.data
      })
    },
    goBack() {
      // console.log('go back')
      this.$router.push('welcome')
      window.location.reload()
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        tooltip: {},
        xAxis: {
          data: ['Ruijie', 'Hikvision' ,'Hardware']
        },
        yAxis: {},
        series: [{
          name: '硬件占比',
          type: 'bar',
          data: [50, 20, 30]
        }]
      })
    }
  },
  mounted() {
    this.drawLine()
  }
}
</script>

<style type="less" scoped>
/* span定义下的设计样式*/
.importantInfo {
  margin-top: 15px;
  min-height: 70px;
}
.bg-blue {
  background: #4778C7;
  margin-bottom: 5px;
  color: #A0B0CD;
}
.bg-blue >.h1 {
  color: #ffffff;
}
#myChart {
  color: #4778C7;
}
.bg-details {
  background-color: #ffffff;
  min-height: 220px;
  margin-bottom: 20px;
  line-height: 220px;
  text-align: center;
}
.bg-details1 {
  background-color: #ffffff;
  height: 220px;
  max-height: 220px;
  overflow-y: auto;
  margin-bottom: 20px;
}
.bg-details1 .table .tr {
  border-bottom: 1px solid #666!important;
}
#ipTable, #portsTable {
  color: #A0B0CD;
}
.el-table {
  margin-top: 0!important;
}
.bg-title {
  background-color: #F2F7FF;
  /*margin-bottom: 15px;*/
  height: 30px;
  text-align: left;
  line-height: 30px;
}
.bg-details1 .table .ip {
  float: left;
}
.grid-content {
  border-radius: 4px;
}
</style>
