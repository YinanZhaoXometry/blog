<template>
  <article>
    <el-card
      v-for="item in articleList"
      :key="item._id"
      shadow="always"
      class="card-article"
      :body-style="[{ padding: '0px'},{width: '100%' },{display: 'flex'}]"
    >
      <div class="card-text">
        <span class="text-tag">
          <el-tag :type="item.isOriginal ? 'success' : 'info'" size="small">
            {{ item.isOriginal ? '原创' : '转载' }}
          </el-tag>
          <el-tag v-if="!item.isPublic" type="warning" size="small">
            {{ '私有' }}
          </el-tag>
          <el-tag v-if="!item.isPublished" type="warning" size="small">
            {{ '草稿' }}
          </el-tag>
        </span>
        <nuxt-link :to="`/categories/${item.category.enName}`" class="text-category">
          <span>{{ item.category.cnName }}</span>
        </nuxt-link>
        <nuxt-link :to="`/articles/${item._id}`">
          <h3 class="text-title">{{ item.title }}</h3>
        </nuxt-link>
        <nuxt-link :to="`/articles/${item._id}`">
          <p class="text-description">{{ item.description }}</p>
        </nuxt-link>
        <span class="text-time" v-text="getDate(item)" />
      </div>
      <div class="card-image">
        <nuxt-link :to="`/articles/${item._id}`" :style="`background-image:url(${imagePathPrefix + item.coverImage.webName})`" class="cover-image" />
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

<style scoped>
.card-article {
  margin-bottom: 40px;
  height:200px;
  width: 100%;
}

.card-text {
  flex: 1;
  padding: 30px 40px;
}

.card-cover {
  flex: 1;
}

.cover-image {
  display: block;
  width: 200px;
  height: 200px;
  background-position: 50% 50%;
}

.text-category {
  color: #757575;
}
.text-category:hover {
  text-decoration: underline;
}
.text-title {
  color: black;

}
.text-description, .text-time {
  color: #757575;
}
.text-tag {
  position: absolute;
  margin-top: -30px;
  margin-left: -40px;
}
.text-tag .el-tag {
  border: none;
}

</style>
