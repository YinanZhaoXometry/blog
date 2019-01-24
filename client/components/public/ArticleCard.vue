<template>
  <article>
    <!-- web端视图 -->
    <el-card
      v-for="item in articleList"
      :key="item._id"
      shadow="always"
      class="card-web"
      :body-style="[{ padding: '0px'},{width: '100%'}, {display: 'flex'}]"
    >
      <div class="card-text">
        <nuxt-link :to="`/categories/${item.category.enName}`" class="text-category">
          <span>{{ item.category.cnName }}</span>
        </nuxt-link>
        <nuxt-link :to="`/articles/${item._id}`">
          <h3 class="text-title">
            {{ item.title }}
            <span class="card-text-tag">
              <el-tag :type="item.isOriginal ? 'success' : 'info'" size="small">
                {{ item.isOriginal ? '原创' : '转载' }}
              </el-tag>
            </span>
          </h3>
        </nuxt-link>
        <nuxt-link :to="`/articles/${item._id}`">
          <p class="text-description">{{ item.description }}</p>
        </nuxt-link>
        <span class="text-time" v-text="getDate(item)" />
      </div>
      <div class="card-image">
        <nuxt-link
          :to="`/articles/${item._id}`"
          class="cover-image"
          :style="`background-image:url(${imagePathPrefix + item.coverImage.webName})`"
        />
      </div>
    </el-card>
    <!-- 移动端视图 -->
    <el-card
      v-for="item in articleList"
      :key="item._id+'mobile'"
      shadow="always"
      class="card-mobile"
      :body-style="[{ padding: '0px'},{width: '100%'}, {display: 'flex'}]"
    >
      <div class="card-image">
        <nuxt-link
          :to="`/articles/${item._id}`"
          class="cover-image"
          :style="`background-image:url(${imagePathPrefix + item.coverImage.mobileName})`"
        />
      </div>
      <div class="card-text">
        <div class="card-text-container">
          <nuxt-link :to="`/articles/${item._id}`">
            <h3 class="text-title">
              {{ item.title }}
              <span class="card-text-tag">
                <el-tag :type="item.isOriginal ? 'success' : 'info'" size="small">
                  {{ item.isOriginal ? '原创' : '转载' }}
                </el-tag>
              </span>
            </h3>
          </nuxt-link>
          <nuxt-link :to="`/articles/${item._id}`">
            <p class="text-description">
              {{ item.description }}
            </p>
          </nuxt-link>
          <span class="text-time" v-text="getDate(item)" />
          <nuxt-link :to="`/categories/${item.category.enName}`" class="text-category">
            <span>&nbsp;&nbsp;分类：{{ item.category.cnName }}</span>
          </nuxt-link>
        </div>
      </div>
    </el-card>
  </article>
</template>

<script>
export default {
  props: {
    articleList: {
      type: Array,
      required: true
    },
    imagePathPrefix: {
      type: String,
      required: true
    }
  },

  methods: {
    getDate (item) {
      let currentYear = new Date().getFullYear()
      let date
      return date =
        item.createTime.year === currentYear
        ? item.createTime.simpleDate
        : item.createTime.fullDate
    },
  }
}
</script>

<style lang="less">

@import "../../assets/less/public.less";

</style>
