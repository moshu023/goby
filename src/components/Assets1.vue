<template>
  <div>
    <!--返回键以及标题-->
    <el-page-header @back="goBack" content="资产">
    </el-page-header>
    <div style="background-color: white; margin-top: 20px;">
      <div style="font-size: 20px;text-align: left;margin-left: 10px;padding-top: 20px">
        <el-tag type="success" style="font-size: 20px;">{{ '端口：' + this.ipPortsInfo.ports[port_index]}}</el-tag>
      </div>
      <!--<el-table-->
      <!--  :show-header="false"-->
      <!--  :data="tableData"-->
      <!--  border-->
      <!--  :cell-style="columnStyle"-->
      <!--  style="width: 400px; margin-top: 20px;margin-left: 10px">-->
      <!--  <el-table-column>-->
      <!--    <template slot-scope="scope" width="180" style="width: 100%">-->
      <!--      <span>IP</span>-->
      <!--    </template>-->
      <!--  </el-table-column>-->
      <!--  <el-table-column width="180">-->
      <!--    <template slot-scope="scope">-->
      <!--      <span v-for="(item, index) in scope.row.portDetails[port_index].ips" :key="item + index">-->
      <!--        &lt;!&ndash;遍历端口并且以逗号隔开，注意最后一项不需要逗号&ndash;&gt;-->
      <!--        {{ (index === scope.row.portDetails[port_index].ips.length-1) && item || item + ',' }}-->
      <!--      </span>-->
      <!--    </template>-->
      <!--  </el-table-column>-->
      <!--</el-table>-->
      <el-table style="color: #4778C7" :data="ipsAndPortsInfo"
                border>
        <el-table-column property="ip" label="IP"></el-table-column>
        <!--<el-table-column property="hostName" label="主机"></el-table-column>-->
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
            </div>
          </template>
        </el-table-column>
        <!--<el-table-column label="版本">-->
        <!--  <template slot-scope="scope">-->
        <!--    <span v-for="(item, index) in scope.row.portsInfo" :key="item + index">-->
        <!--      {{ (index === scope.row.portsInfo.length-1) && item.version || item.version + ',' }}-->
        <!--    </span>-->
        <!--  </template>-->
        <!--</el-table-column>-->
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 作为筛选端口key
      thisport: '',
      taskCode: '',
      port_index: 0,
      ip: [],
      port: '',
      baseInfo: {
        taskCode: '',
        taskName: '',
        taskKind: 0,
        ip: '',
        domain: '',
        ports: ''
      },
      // 关于每个ip或端口对应的详细信息
      ipPortsInfo: {
        ip: [],
        ports: [],
        ipNum: 0,
        portsNum: 0,
        ipDetails: [
          {
            ip: '',
            ports: []
          }
        ],
        portDetails: [
          {
            port: '',
            ips: []
          }
        ]
      },
      // ipsAndPortsInfoByCopy: [
      //   {
      //     hostName: '',
      //     ip: '',
      //     portsInfo: [
      //       {
      //         port: '',
      //         name: '',
      //         product: '',
      //         version: ''
      //       }
      //     ]
      //   }],
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
      }]
    }
  },
  // computed: {
  //   tableData() {
  //     return [
  //       {
  //         ports: this.ipPortsInfo.ipDetails.ports,
  //         ips: this.ipPortsInfo.portDetails.ips,
  //         ipDetails: this.ipPortsInfo.ipDetails,
  //         portDetails: this.ipPortsInfo.portDetails
  //       }
  //     ]
  //   }
  // },
  created() {
    this.port_index = this.$route.query.port_index
    this.taskCode = this.$route.query.taskCode
    this.thisport = this.$route.query.thisport
    this.getIpsAndPortsInfo()
    this.getFullInfo()
    // this.getMoreInfo()
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
    goBack () {
      // console.log('go back')
      this.$router.push({
        path: '/scan',
        query: {
          taskCode: this.taskCode
        }
      })
    },
    // 根据当前端口得到详细资产信息
    // getMoreInfo() {
    //   for (let i = 0; i < this.ipsAndPortsInfo.length; i++) {
    //     for (let j = 0; j < this.ipsAndPortsInfo[i].portsInfo.length; j++) {
    //       if (this.port === this.ipsAndPortsInfo[i].portsInfo[j].port) {
    //         this.ipsAndPortsInfoByCopy.push(this.ipsAndPortsInfo[i])
    //         // this.ipsAndPortsInfoByCopy[i].portsInfo[j] = this.ipsAndPortsInfo[i].portsInfo[j]
    //         console.log(this.ipsAndPortsInfoByCopy[i].portsInfo[j])
    //       }
    //     }
    //   }
    //   this.ipsAndPortsInfo = this.ipsAndPortsInfoByCopy
    //   console.log(this.ipsAndPortsInfoByCopy)
    // },
    getFullInfo() {
      this.$axios({
        method: 'get',
        url: '/collectFullInfoByTaskCode',
        params: {
          taskCode: this.taskCode
        }
      }).then(res => {
        this.baseInfo = res.data.data.baseInfo
        // res.data.data.ipsAndPortsInfo.portsInfo.forEach(item => {
        //   if(item.port.indexOf(this.thisport) !== -1) {
        //     this.ipsAndPortsInfo.push()
        //   }
        // })
        res.data.data.ipsAndPortsInfo.forEach( item1 => {
          item1.portsInfo.forEach(item2 => {
            if((item2.port + '').indexOf(this.thisport) !== -1) {
              this.ipsAndPortsInfo.push(item1)
            }
          })
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
