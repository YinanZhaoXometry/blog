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
            <span class="text-tag">
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
      :key="item._id"
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
        <div class="container">
          <nuxt-link :to="`/articles/${item._id}`">
            <h3 class="text-title">
              {{ item.title }}
              <span class="text-tag">
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

<style scoped>
/* mobile */
@media screen and (max-width: 767px) {
  .container {
   position: relative;
   top:50%;
   /* height: 50%; */
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateY(-65%);

  }

  .card-mobile {
    min-width: 400px;
    padding-top: 73%;
    position: relative;
  }

  .card-web {
    display: none;
  }
  .card-mobile .card-image {
    width: 100%;
    height: 58%;
    position: absolute;
    top: 0;
    /* height: 100%; */
  }

  .card-mobile .cover-image {
    display: block;
    width: 100%;
    height: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 0% 0%;
  }

  .card-mobile .card-text {
    clear: both;
    width: 100%;
    height: 42%;
    position: absolute;
    top: 58%;
    padding: 0 20px;
    /* height: 100%; */
  }
  .card-mobile .text-tag {
    position: relative;
    top: -2px;
  }
  .card-mobile .text-title {
    font-size: 1.1em;
    margin: 10px 0;
  }
  .card-mobile .text-description {
    font-size: 0.9em;
    margin: 10px 0;
  }
  .card-mobile .text-time, .card-mobile .text-category {
    font-size: 0.9em;
    color:#999;
  }
}

@media screen and (min-width: 768px) {
  .card-web {
    margin-bottom: 40px;
    height:200px;
    width: 100%;
  }

  /* .card>.el-card__body {
    display: flex;
  } */
  .card-web .card-text {
    flex: 1;
    padding: 20px 40px;
  }

  .card-mobile {
    display: none;
  }
  .card-web .card-image {
    width: 200px;
    height: 200px;
  }
  .card-web .cover-image {
    display: block;
    width: 100%;
    height: 100%;
    background-position: 50% 50%;
  }
  .card-web .text-category {
    color: #757575;
  }
  .card-web .text-category:hover {
    text-decoration: underline;
  }
  .card-web .text-title {
    color: black;
  }
  .card-web .text-description, .card-web .text-time {
    color: #757575;
  }
  .card-web .text-tag {
    position: relative;
    top: -4px;
  }
  .card-web .text-tag .el-tag {
    border: none;
  }

  .card-web .text-title {
    font-size: 1.3em;
  }
  .card-web .text-description {
    font-size: 1.1em;
  }
  .card-web .text-time, .card-mobile .text-category {
    font-size: 1.1em;
    color:#999;
  }
}


</style>
