<template>
  <div>
    <!--返回键以及标题-->
    <el-page-header @back="goBack" content="资产">
    </el-page-header>
    <div style="background-color: white; margin-top: 20px;">
      <div style="font-size: 20px;text-align: left;margin-left: 10px;padding-top: 20px">
        <el-tag type="success" style="font-size: 20px;">{{'IP：' + this.ipPortsInfo.ip[ip_index]}}</el-tag>
      </div>
      <!--<el-table-->
      <!--  :show-header="false"-->
      <!--  :data="tableData"-->
      <!--  border-->
      <!--  :cell-style="columnStyle"-->
      <!--  style="width: 400px; margin-top: 20px;margin-left: 10px">-->
      <!--  <el-table-column>-->
      <!--    <template slot-scope="scope" width="180">-->
      <!--      <span>端口</span>-->
      <!--    </template>-->
      <!--  </el-table-column>-->
      <!--  <el-table-column width="180">-->
      <!--    <template slot-scope="scope">-->
      <!--      <span v-for="(item, index) in scope.row.ipDetails[ip_index].ports" :key="item + index">-->
      <!--        &lt;!&ndash;遍历端口并且以逗号隔开，注意最后一项不需要逗号&ndash;&gt;-->
      <!--        {{ (index === scope.row.ipDetails[ip_index].ports.length-1) && item || item + ',' }}-->
      <!--      </span>-->
      <!--    </template>-->
      <!--  </el-table-column>-->
      <!--</el-table>-->
      <table class="tb" bordercolor="#E5EBF7" border="5">
        <tr>
          <td style="background-color: #E5EBF7;width: 10%;">端口</td>
          <td style="width: 90%;">{{ this.masscanInfo }}</td>
        </tr>
        <tr>
          <td style="background-color: #E5EBF7;width: 10%;">IPV4</td>
          <td style="width: 90%;">{{ this.nmapInfo.addresses.ipv4 === '' && '-' || this.nmapInfo.addresses.ipv4}}</td>
        </tr>
        <tr>
          <td style="background-color: #E5EBF7;width: 10%;">MAC</td>
          <td style="width: 90%;">{{ this.nmapInfo.addresses.mac === '' && '-' || this.nmapInfo.addresses.mac}}</td>
        </tr>
        <tr>
          <td style="background-color: #E5EBF7;width: 10%;">主机名</td>
          <td style="width: 90%;">{{ this.nmapInfo.hostnames.name !== '' && this.nmapInfo.hostnames.name || '暂无数据'}}</td>
        </tr>
        <tr>
          <td style="background-color: #E5EBF7; width: 10%;">主机类型</td>
          <td style="width: 90%">{{ this.nmapInfo.hostnames.type === '' && this.nmapInfo.hostnames.type || '暂无数据'}}</td>
        </tr>
        <tr>
          <td style="background-color: #E5EBF7;width: 10%;">操作系统</td>
          <td style="width: 90%">
            <div v-for="item in this.nmapInfo.osmatch">{{ item.name + ', ' + item.accuracy + ', ' + item.line}}</div>
          </td>
        </tr>
        <tr>
          <td style="background-color: #E5EBF7;width: 10%;">端口信息</td>
          <td style="width: 90%;">
            <div v-for="item1 in this.nmapInfo.portused">
              {{'端口号：' + item1.portid + ', ' + '协议：' + item1.proto + ', ' + '状态：' + item1.state}}
            </div>
          </td>
        </tr>
        <tr style="width: 30%;">
          <td style="background-color: #E5EBF7">状态信息</td>
          <td>{{this.nmapInfo.status.state + ', ' + this.nmapInfo.status.reason}}</td>
          <!--<td>{{this.nmapInfo.status.state && this.nmapInfo.status.state || '暂无数据'}}</td>-->
        </tr>
        <tr>
          <td style="background-color: #E5EBF7;width: 10%;">板卡信息</td>
          <td style="width: 90%;">{{Object.entries(this.nmapInfo.vendor) + ''}}</td>
        </tr>
        <tr>
          <td style="background-color: #E5EBF7;width: 10%;">端口服务信息</td>
          <td style="width: 90%;">
            <div v-for="(val, key, index) in this.nmapInfo.tcp">
              <el-tag style="margin-bottom: 10px;margin-top: 10px;margin-right: 10px;">{{key}}</el-tag>
              <span>协议：</span>
              <el-tag style="margin-bottom: 10px;margin-right: 10px;">{{val.name}}</el-tag>
              <span>运行应用: </span>
              <el-tag v-if="val.product !== ''" style="margin-bottom: 10px;margin-right: 10px;">{{val.product}}</el-tag>
              <span>版本信息：</span>
              <el-tag v-if="val.version !== ''" style="margin-bottom: 10px;margin-right: 10px;">{{val.version}}</el-tag>
              <span>状态：</span>
              <el-tag style="margin-bottom: 10px;margin-right: 10px;">{{val.state}}</el-tag>
              <span>额外信息：</span>
              <el-tag v-if="val.extrainfo !== ''" style="margin-bottom: 10px;margin-right: 10px;">{{val.extrainfo}}</el-tag>
              <span>cpe编号：</span>
              <el-tag v-if="val.cpe !== ''" style="margin-bottom: 10px;margin-right: 10px;">{{val.cpe}}</el-tag>
              <br>
            </div>
          </td>
        </tr>
        <tr>
          <td style="background-color: #E5EBF7;width: 10%;">网站信息</td>
          <!--<td>{{this.nmapInfo.whatwebInfo !== '' && this.nmapInfo.whatwebInfo || '暂无数据'}}</td>-->
          <td style="width: 90%;">
            <span style="font-size: 20px;color:blue;font-weight: 700;padding-top: 20px">whatwebInfo>>></span>
            <el-divider style="margin: 8px 0;"></el-divider>
            <div v-for="(item, index) in this.whatwebInfo" style="font-size: 16px;font-family: 'Microsoft YaHei';">
              <el-tag type="success">{{ '相关网站' + (index + 1) }}</el-tag>
              <pre class="pre" style="font-family: 'Microsoft YaHei';color:#A9CDED;">{{ item.tittle }}</pre>
              <el-tag>详细信息</el-tag>
              <pre class="pre" style="font-family: 'Microsoft YaHei';color:#A9CDED;">{{ item.info }}</pre>
              <!--{{ this.nmapInfo.whoisInfo !== '' && }}-->
              <!--{{ item.tittle + item.info}}-->
              <el-divider ></el-divider>
            </div>
            <span style="font-size: 20px;color:blue;font-weight: 700;margin-bottom: 10px;">whoisInfo>>></span>
            <el-divider style="margin: 8px 0;"></el-divider>
            <el-tag>域名信息</el-tag>
            <div style="font-family: 'Microsoft YaHei';">
              <pre class="pre" style="font-family: 'Microsoft YaHei';color:#A9CDED;">{{ this.whoisInfo !== '' && this.whoisInfo || '暂无数据'}}</pre>
            </div>
          </td>
        </tr>
        <tr>
          <td style="background-color: #E5EBF7;width: 10%;">网站截图</td>
          <td style="width: 90%;">
            <div v-for="(item, index1) in this.picInfo">
              {{ "IP: " + item.ip }}
              {{ "端口：" + item.port }}
              <div>图片：</div>
              <img v-if="index === index1" v-for="(item, index) in picture" alt="" :src="item">
            </div>
          </td>
        </tr>
        <tr>
          <td style="background-color: #E5EBF7;width: 10%;">防火墙信息</td>
          <!--<td>{{this.nmapInfo.whatwebInfo !== '' && this.nmapInfo.whatwebInfo || '暂无数据'}}</td>-->
          <td style="width: 90%;">
            <div style="font-family: 'Microsoft YaHei';">
              <pre class="pre" style="font-family: 'Microsoft YaHei';color:#A9CDED;">{{ this.wafInfo !== '' && this.wafInfo || '暂无数据'}}</pre>
            </div>
          </td>
        </tr>
        <tr>
          <td style="background-color: #E5EBF7;width: 10%;">证书信息</td>
          <td style="width: 90%;">
            <div style="margin-bottom: 10px">
              <span>
                <el-tag type="warning">序列号：</el-tag>
              </span>
              <span v-if="zgrab2Info.result && zgrab2Info.result.handshake_log && zgrab2Info.result.handshake_log.server_certificates">{{zgrab2Info.result.handshake_log.server_certificates.certificate.parsed.serial_number}}</span>
            </div>
            <div style="margin-bottom: 10px">
              <span>
                <el-tag type="warning">版本号：</el-tag>
              </span>
              <span v-if="zgrab2Info.result && zgrab2Info.result.handshake_log && zgrab2Info.result.handshake_log.server_certificates">{{ zgrab2Info.result.handshake_log.server_certificates.certificate.parsed.version }}</span>
            </div>
            <div style="margin-bottom: 10px">
              <span>
                <el-tag type="warning">issuer_dn：</el-tag>
              </span>
              <span v-if="zgrab2Info.result && zgrab2Info.result.handshake_log && zgrab2Info.result.handshake_log.server_certificates">{{zgrab2Info.result.handshake_log.server_certificates.certificate.parsed.issuer_dn }}</span>
            </div>
            <div style="margin-bottom: 10px">
              <span>
                <el-tag type="warning">证书有效起始日期：</el-tag>
              </span>
              <span v-if="zgrab2Info.result && zgrab2Info.result.handshake_log && zgrab2Info.result.handshake_log.server_certificates">{{ zgrab2Info.result.handshake_log.server_certificates.certificate.parsed.validity.start }}</span>
            </div>
            <div style="margin-bottom: 10px">
              <span>
                <el-tag type="warning">证书有效终止日期：</el-tag>
              </span>
              <span v-if="zgrab2Info.result && zgrab2Info.result.handshake_log && zgrab2Info.result.handshake_log.server_certificates">{{ zgrab2Info.result.handshake_log.server_certificates.certificate.parsed.validity.end }}</span>
            </div>
            <!--<div style="margin-bottom: 10px">-->
            <!--  <span>-->
            <!--    <el-tag type="warning">common_name：</el-tag>-->
            <!--  </span>-->
            <!--  <span v-if="zgrab2Info.result && zgrab2Info.result.handshake_log && zgrab2Info.result.handshake_log.server_certificates" v-for="item in zgrab2Info.result.handshake_log.server_certificates.certificate.parsed.subject.server_certificates">{{ item }}</span>-->
            <!--</div>-->
            <!--<div style="margin-bottom: 10px">-->
            <!--  <span>-->
            <!--    <el-tag type="warning">country：</el-tag>-->
            <!--  </span>-->
            <!--  <span v-if="zgrab2Info.result && zgrab2Info.result.handshake_log && zgrab2Info.result.handshake_log.server_certificates" v-for="item in zgrab2Info.result.handshake_log.server_certificates.certificate.parsed.subject.country">{{ item }}</span>-->
            <!--</div>-->
            <div style="margin-bottom: 10px">
              <span>
                <el-tag type="warning">subject_dn：</el-tag>
              </span>
              <span v-if="zgrab2Info.result && zgrab2Info.result.handshake_log && zgrab2Info.result.handshake_log.server_certificates">{{ zgrab2Info.result.handshake_log.server_certificates.certificate.parsed.subject_dn }}</span>
            </div>
            <div style="margin-bottom: 10px">
              <span>
                <el-tag type="warning">报错信息：</el-tag>
              </span>
              <span>{{ zgrab2Info.error && zgrab2Info.error || '暂无报错'}}</span>
            </div>
            <div style="margin-bottom: 10px">
              <span>
                <el-tag type="warning">状态：</el-tag>
              </span>
              <span>{{ zgrab2Info.status }}</span>
            </div>
            <div style="margin-bottom: 10px">
              <span>
                <el-tag type="warning">时间戳：</el-tag>
              </span>
              <span>{{ zgrab2Info.timestamp }}</span>
            </div>
          </td>
        </tr>
      </table>
      <!-- 单独处理script信息 -->
      <table class="tb" bordercolor="#E5EBF7" border="5">
        <tr style="width: 100%;height: 40px;margin-bottom: 10px" v-for="(val, key, index) in this.nmapInfo.tcp">
          <td style="background-color: #E5EBF7;">{{thisip + '\t'}}
            <el-tag type="success" style="margin-right: 10px;">{{key + '：'}}{{val.name}}</el-tag>
            <el-tag v-if="val.product !== ''" type="success" style="margin-right: 10px;">{{val.product}}</el-tag>
            <el-tag type="success" style="margin-right: 10px;">script信息>>></el-tag>
          </td>
          <td>
            <div v-for="(val, key, index) in nmapInfo.tcp">
                <pre
                  style="margin-left: 0;font-family: 'Microsoft YaHei';color:#A9CDED;"
                  v-for="(val1, key1, index1) in val.script">
                  {{val1}}
                </pre>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 图片链接
      picture: [],
      // 当前资产对应的ip
      thisip: '',
      taskCode: '',
      ip_index: 0,
      ip: [],
      port: '',
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
      //  根据IP得到信息
      masscanInfo: '',
      nmapInfo: {
        hostnames: [],
        addresses: {
          ipv4: '',
          mac: ''
        },
        vendor: {},
        status: {},
        uptime: {},
        tcp: {},
        hostscript: [],
        portused: [
          {
            state: '',
            proto: '',
            portid: ''
          }
        ],
        osmatch: [],
      },
      zgrab2Info: {
        status: '',
        protocol: '',
        result: {},
        timestamp: ''
      },
      picInfo: [
        {
          ip: '',
          port: '',
          pic: ''
        }
      ],
      // 新添加的端口
      whatwebInfo: [
        {
          tittle: '',
          info: ''
        }
      ],
      whoisInfo: '',
      wafInfo: ''
    }
  },
  computed: {
    tableData() {
      return [
        {
          ports: this.ipPortsInfo.ipDetails.ports,
          ips: this.ipPortsInfo.portDetails.ips,
          ipDetails: this.ipPortsInfo.ipDetails,
          portDetails: this.ipPortsInfo.ipDetails
        }
      ]
    }
  },
  created() {
    this.ip_index = this.$route.query.ip_index
    this.thisip = this.$route.query.thisip
    this.taskCode = this.$route.query.taskCode
    this.getIpsAndPortsInfo()
    this.getByIP()
  },
  methods: {
    // base64编码转化图片
    base64ImgtoFile(dataurl, filename = 'file') {
      let arr = dataurl.split(',')
      let mime = arr[0].match(/:(.*?);/)[1]
      let suffix = mime.split('/')[1]
      let bstr = atob(arr[1])
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], `${filename}.${suffix}`, {
        type: mime
      })
    },
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
          taskCode: this.taskCode,
          ip: this.thisip
        }
      }).then(res => {
        this.ipPortsInfo = res.data.data
        this.thisip = this.ipPortsInfo.ip[this.ip_index]
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
    getByIP() {
      this.$axios({
        method: 'get',
        url: '/getDetailInfoByTaskCodeAndTP',
        params: {
          taskCode: this.taskCode,
          ip: this.thisip
        }
      }).then(res => {
        this.masscanInfo = res.data.data.masscanInfo
        this.nmapInfo = res.data.data.nmapInfo
        this.zgrab2Info = res.data.data.zgrab2Info
        this.picInfo = res.data.data.picInfo
        // 将base64转码为文件信息并单独保存在数组中
        res.data.data.picInfo.forEach( item => {
          if (item.pic) {
            this.picture.push( 'data:image/png;base64,' + item.pic)
          }
        })
        for (let i = 0; i < this.picture.length; i++) {
          this.base64ImgtoFile(this.picture[i])
        }
        this.whatwebInfo = res.data.data.whatwebInfo
        this.whoisInfo = res.data.data.whoisInfo
        this.wafInfo = res.data.data.wafInfo
      })
    }
  }
}
</script>

<style scoped>
.tb {
  margin-left: 10px;
  text-align: left;
  margin-top: 10px;
  width: 1330px;
  max-width: 1330px;
  table-layout: fixed;
  word-wrap:break-word;
  font-size: 16px;
  /*font-family: 'Microsoft YaHei'*/
}
.pre {
  white-space: pre-wrap; /*css-3*/
  white-space: -moz-pre-wrap; /*Mozilla,since1999*/
  white-space: -o-pre-wrap; /*Opera7*/
  word-wrap: break-word; /*InternetExplorer5.5+*/
}
</style>
