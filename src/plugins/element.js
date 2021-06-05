import Vue from 'vue'
// import from 'element-ui'
import {
  Tree,
  Button,
  Form,
  Divider,
  Input,
  FormItem,
  Row,
  Tooltip,
  Loading,
  Message,
  PageHeader,
  Aside,
  Select,
  Container,
  Header,
  Main,
  Menu,
  MenuItem,
  Submenu,
  Tag,
  Breadcrumb,
  Progress,
  Card,
  Col,
  Option,
  Switch,
  Pagination,
  BreadcrumbItem,
  Table,
  Dialog,
  Drawer,
  TableColumn
} from 'element-ui'

Vue.use(Tag)
Vue.use(Tree)
Vue.use(Divider)
Vue.use(Loading)
Vue.use(PageHeader)
Vue.use(Drawer)
Vue.use(Select)
Vue.use(Button)
Vue.use(Progress)
Vue.use(Dialog)
Vue.use(Pagination)
Vue.use(Tooltip)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Aside)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Switch)
Vue.use(BreadcrumbItem)
Vue.use(Breadcrumb)
Vue.use(Col)
Vue.use(Row)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Option)
Vue.use(Card)
Vue.use(MenuItem)
Vue.use(Submenu)
// Message为消息弹框组件，与上面不同，该组件导入需要挂载到Vue实体，使得每个Vue实例都能通过this调用
// 这里$message为自定义属性，可以随意更改
Vue.prototype.$message = Message
