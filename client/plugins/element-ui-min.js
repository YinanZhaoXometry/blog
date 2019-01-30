import Vue from 'vue'
import { Tag, Button, Icon, Card, Row, Col, Input, Select, Option, Checkbox, Message, DropdownMenu, Dropdown, DropdownItem, Popover } from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN'

export default () => {
  Vue.use({ locale })
  Vue.use(Tag)
  Vue.use(Button)
  Vue.use(Icon)
  Vue.use(Card)
  Vue.use(Row)
  Vue.use(Col)
  Vue.use(Input)
  Vue.use(Select)
  Vue.use(Option)
  Vue.use(Checkbox)
  Vue.use(DropdownMenu)
  Vue.use(Dropdown)
  Vue.use(DropdownItem)
  Vue.use(Popover)
  Vue.prototype.$message = Message
}
