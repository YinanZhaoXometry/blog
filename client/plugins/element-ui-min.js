import Vue from 'vue'
import { Tag, Button, Icon, Card, Row, Col, Input, Select, Option, Checkbox } from 'element-ui'
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
}
