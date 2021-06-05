<template>
  <div style="background-color: white; margin-top: 20px;">
    <div style="font-size: 20px;text-align: left;margin-left: 10px;padding-top: 20px">
      <el-tag type="success" style="font-size: 20px;">{{ '任务名称：' + this.baseInfo.taskName}}</el-tag>
    </div>
    <el-divider></el-divider>
    <h1 style="margin-left: 10px;text-align: left">1.综述</h1>
    <h3 style="margin-left: 10px;text-align: left">1.1任务信息</h3>
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
    <el-divider></el-divider>
    <h3 style="margin-left: 10px;text-align: left">1.2任务详情</h3>
    <table
      border="5"
      bordercolor="#E5EBF7"
      style="margin-left: 10px;text-align: left;
      border-spacing: 1px;width: 60%;">
      <tr style="width: 30%;">
        <td style="background-color: #E5EBF7">任务名称</td>
        <td>{{ this.baseInfo.taskName }}</td>
      </tr>
      <tr style="width: 30%;">
        <td style="background-color: #E5EBF7;width: 30%;">IP/Domain</td>
        <td>
          {{ this.baseInfo.ip !== '' && this.baseInfo.ip + ' / ' || '暂无数据' + ' / '}}
          {{ this.baseInfo.domain !== '' && this.baseInfo.domain || '暂无数据'}}</td>
      </tr>
      <!-- 不太美观的写法 -->
      <!--<tr>-->
      <!--  <td style="background-color: #E5EBF7">端口</td>-->
      <!--  <td>-->
      <!--    {{ this.baseInfo.ports }}</td>-->
      <!--</tr>-->
      <tr style="width: 30%;">
        <td style="background-color: #E5EBF7">端口</td>
        <td>{{ this.baseInfo.ports.split('#') + '' }}</td>
      </tr>
      <!--v-for="(item, index) in this.baseInfo.ports.split('#')" :key="item + index"-->
      <!--{{ (index === this.baseInfo.ports.split('#').length - 1) && item || item + ',' }}-->
      <tr style="width: 30%;">
        <td style="background-color: #E5EBF7">漏洞</td>
        <td>通用PoC</td>
      </tr>
    </table>
    <el-divider></el-divider>
    <h3 style="margin-left: 10px;text-align: left">1.3风险分布</h3>
    <el-card>
      <div id="myChart" style="width: 600px;height: 300px; margin-left: 100px"></div>
    </el-card>
    <el-divider></el-divider>
    <h3 style="margin-left: 10px;text-align: left">1.4资产分布</h3>
    <!--<el-table-->
    <!--  border-->
    <!--  style="width: 100%">-->
    <!--  <el-table-column v-for="item in 255" :key="item">{{'dwad' + item }}</el-table-column>-->
    <!--</el-table>-->
    <h4 style="margin-left: 10px;text-align: left">1.4.1IP资源分布</h4>
    <el-card>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>全部</el-breadcrumb-item>
        <el-breadcrumb-item>{{ this.baseInfo.ip }}</el-breadcrumb-item>
      </el-breadcrumb>
      <!--第一次尝试表格绘制IP，但是没法单独绑定事件-->
      <!--<table>-->
      <!--  <tr>-->
      <!--    <td @click="showInfo(item)"-->
      <!--        style="width: 50px;height: 35px;"-->
      <!--        v-for="item in 20" :key="item">-->
      <!--        {{ item }}-->
      <!--    </td>-->
      <!--  </tr>-->
      <!--  <tr>-->
      <!--    <td style="background-color: #E5EBF7;width: 50px;height: 35px;" v-for="item in 20" :key="item">{{ item + 20 }}</td>-->
      <!--  </tr>-->
      <!--  <tr>-->
      <!--    <td style="background-color: #E5EBF7;width: 50px;height: 35px;" v-for="item in 20" :key="item">{{ item + 40 }}</td>-->
      <!--  </tr>-->
      <!--</table>-->
      <div>
        <el-tag
          :type="showInfo(index + 1)"
          v-for="(item, index) in 15" :key="index"
          style="margin-right: 20px; cursor:pointer;width: 60px;margin-bottom: 10px">
              <span>{{item}}</span>
        </el-tag>
      </div>
      <div>
        <el-tag
          :type="showInfo(index + 16)"
          v-for="(item, index) in 15" :key="index + 15"
          style="margin-right: 20px; cursor:pointer; width: 60px;margin-bottom: 10px">
              <span>{{item + 15}}</span>
        </el-tag>
      </div>
      <div>
        <el-tag
          :type="showInfo(index + 31)"
          v-for="(item, index) in 15" :key="index + 30"
          style="margin-right: 20px; cursor:pointer; width: 60px;margin-bottom: 10px">
              <span>{{item + 30}}</span>
        </el-tag>
      </div>
      <div>
        <el-tag
          :type="showInfo(index + 46)"
          v-for="(item, index) in 15" :key="index + 45"
          style="margin-right: 20px; cursor:pointer; width: 60px;margin-bottom: 10px">
            <span>{{item + 45}}</span>
        </el-tag>
      </div>
      <div>
        <el-tag
          :type="showInfo(index + 61)"
          v-for="(item, index) in 15" :key="index + 60"
          style="margin-right: 20px; cursor:pointer; width: 60px;margin-bottom: 10px">
            <span>{{item + 60}}</span>
        </el-tag>
      </div>
      <div>
        <el-tag
          :type="showInfo(index + 76)"
          v-for="(item, index) in 15" :key="index + 75"
          style="margin-right: 20px; cursor:pointer; width: 60px;margin-bottom: 10px">
              <span>{{item + 75}}</span>
        </el-tag>
      </div>
      <div>
        <el-tag
          :type="showInfo(index + 91)"
          v-for="(item, index) in 15" :key="index + 90"
          style="margin-right: 20px; cursor:pointer; width: 60px;margin-bottom: 10px">
            <span>{{item + 90}}</span>
        </el-tag>
      </div>
      <div>
        <el-tag
          :type="showInfo(index + 106)"
          v-for="(item, index) in 15" :key="index + 105"
          style="margin-right: 20px; cursor:pointer; width: 60px;margin-bottom: 10px">
          <span>{{item + 105}}</span>
        </el-tag>
      </div>
      <div>
        <el-tag
          :type="showInfo(index + 121)"
          v-for="(item, index) in 15" :key="index + 120"
          style="margin-right: 20px; cursor:pointer; width: 60px;margin-bottom: 10px">
          <span>{{item + 120}}</span>
        </el-tag>
      </div>
      <div>
        <el-tag
          :type="showInfo(index + 136)"
          v-for="(item, index) in 15" :key="index + 135"
          style="margin-right: 20px; cursor:pointer; width: 60px;margin-bottom: 10px">
          <span>{{item + 135}}</span>
        </el-tag>
      </div>
      <div>
        <el-tag
          :type="showInfo(index + 151)"
          v-for="(item, index) in 15" :key="index + 150"
          style="margin-right: 20px; cursor:pointer; width: 60px;margin-bottom: 10px">
          <span>{{item + 150}}</span>
        </el-tag>
      </div>
      <div>
        <el-tag
          :type="showInfo(index + 166)"
          v-for="(item, index) in 15" :key="index + 165"
          style="margin-right: 20px; cursor:pointer; width: 60px;margin-bottom: 10px">
          <span>{{item + 165}}</span>
        </el-tag>
      </div>
      <div>
        <el-tag
          :type="showInfo(index + 181)"
          v-for="(item, index) in 15" :key="index + 180"
          style="margin-right: 20px; cursor:pointer; width: 60px;margin-bottom: 10px">
          <span>{{item + 180}}</span>
        </el-tag>
      </div>
      <div>
        <el-tag
          :type="showInfo(index + 196)"
          v-for="(item, index) in 15" :key="index + 195"
          style="margin-right: 20px; cursor:pointer; width: 60px;margin-bottom: 10px">
          <span>{{item + 195}}</span>
        </el-tag>
      </div>
      <div>
        <el-tag
          :type="showInfo(index + 211)"
          v-for="(item, index) in 15" :key="index + 210"
          style="margin-right: 20px; cursor:pointer; width: 60px;margin-bottom: 10px">
          <span>{{item + 210}}</span>
        </el-tag>
      </div>
      <div>
        <el-tag
          :type="showInfo(index + 226)"
          v-for="(item, index) in 15" :key="index + 225"
          style="margin-right: 20px; cursor:pointer; width: 60px;margin-bottom: 10px">
          <span>{{item + 225}}</span>
        </el-tag>
      </div>
      <div>
        <el-tag
          :type="showInfo(index + 241)"
          v-for="(item, index) in 15" :key="index + 240"
          style="margin-right: 20px; cursor:pointer; width: 60px;margin-bottom: 10px">
          <span>{{item + 240}}</span>
        </el-tag>
      </div>
      <!--<el-tag :type="showInfo(index)" v-for="(item, index) in 15" :key="index" style="margin-right: 20px; cursor:pointer;">{{item}}</el-tag>-->
    </el-card>
    <h1 style="margin-left: 10px;text-align: left">5.资产</h1>
    <el-table
      style="color: #4778C7"
      :data="ipsAndPortsInfo"
      border>
      <el-table-column property="ip" label="IP"></el-table-column>
      <!--<el-table-column property="hostName" label="主机">-</el-table-column>-->
      <el-table-column label="端口">
        <template slot-scope="scope">
            <div v-for="(item, index) in scope.row.portsInfo" :key="item + index">
              {{item.port }}
            </div>
        </template>
      </el-table-column>
      <el-table-column label="协议">
        <template slot-scope="scope">
            <div v-for="(item, index) in scope.row.portsInfo" :key="item + index">
              {{ item.name !== '' && item.name || '-'}}
            </div>
        </template>
      </el-table-column>
      <el-table-column label="组件">
        <template slot-scope="scope">
            <div v-for="(item, index) in scope.row.portsInfo" :key="item + index">
              {{item.product !== '' && item.product || '| 暂无产品'}}
              {{item.version !== '' && item.version || '| 暂无版本号'}}
              <!--{{ (index === scope.row.portsInfo.length-1) && item.version || item.version }}-->
            </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  data() {
    return {
      // 控制IP资源状态相关参数
      ipsArrByCopy: [],
      ipStatusArr: [],
      ipsArr: [],
      ipPortsInfo: {
        ip: [],
        ports: [],
        ipNum: 0,
        portsNum: 0,
        ipDetails: [],
        portDetails: []
      },
      ipsAndPortsInfo: [
        {
          hostName: '',
          ip: '',
          portsInfo: [
            {
              port: '',
              name: '',
              product: '',
              version: ''
            }
          ]
        }],
      taskCode: '',
      ip: [],
      baseInfo: {
        taskCode: '',
        taskName: '',
        taskKind: '',
        ip: '',
        domain: '',
        ports: ''
      }
    }
  },
  created() {
    this.taskCode = this.$route.query.taskCode
    this.ip = this.$route.query.ip
    this.getFullInfo()
    this.getIpsAndPortsInfo()
  },
  mounted() {
    this.drawRing()
  },
  methods: {
    // 自定义列背景色
    columnStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 2) {
        //第三第四列的背景色就改变了2和3都是列数的下标
        return "background:#E5EBF7;";
      }else{
        return "background:#ffffff;";
      }
    },
    // 画几个实例饼图
    drawRing() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'High:',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {value: 1048, name: 'Critical'},
              {value: 735, name: 'High'},
              {value: 580, name: 'Medium'},
              {value: 484, name: 'Low'},
              // {value: 300, name: '视频广告'}
            ]
          }
        ]
      })
    },
    // 控制IP资源
    showInfo(index) {

      // for (let j = 0; j < this.ipsArr.length; j++) {
      //   if (ipsArrByCopy[j].split('.').pop() === index + '') {
      //     this.ipStatusArr.push('success')
      //   }
      //   this.ipStatusArr.push('danger')
      // }
      if (this.ipStatusArr.indexOf(index + '') !== -1) {
        return 'success'
      }
      else return 'danger'
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
        this.ipsArr = this.ipPortsInfo.ip
        this.ipsArrByCopy = this.ipsArr
        this.ipsArrByCopy.forEach( item => {
          this.ipStatusArr.push(item.split('.').pop())
        })
        console.log(this.ipStatusArr)
      })
    },
    getFullInfo() {
      this.$axios({
        method: 'get',
        url: '/collectFullInfoByTaskCode',
        params: {
          taskCode: this.taskCode
        }
      }).then(res => {
        this.baseInfo = res.data.data.baseInfo
        this.ipsAndPortsInfo = res.data.data.ipsAndPortsInfo
      })
    }
  },
  computed: {
    tableData() {
      return [
        {
          ip: this.ipPortsInfo.ip
        }
      ]
    }
  },
}
</script>

<style scoped>
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
.grid-content {
  border-radius: 4px;
}
</style>
