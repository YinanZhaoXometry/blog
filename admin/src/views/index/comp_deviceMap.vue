<template>
  <div class="amap-page-container">
    <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult" />
    <el-amap vid="amapDemo" :center="mapCenter" :zoom="zoom" class="amap-demo" :plugin="plugin">
      <el-amap-marker v-for="(marker, index) in markers" :key="index" :position="marker" />
    </el-amap>
  </div>
</template>

<script>
import VueAMap from 'vue-amap'
const amapManager = new VueAMap.AMapManager()
export default {
  data () {
    return {
      markers: [
        [121.59996, 31.197646],
        [121.40018, 31.197622],
        [121.69991, 31.207649]
      ],
      searchOption: {
        city: '上海',
        citylimit: true
      },
      mapCenter: [121.59996, 31.197646],
      amapManager,
      zoom: 5,
      plugin: [{
        pName: 'ToolBar',
        events: {
          init(instance) {
            console.log(instance)
          }
        }
      }]
    }
  },
  methods: {
    addMarker: function() {
      const lng = 121.5 + Math.round(Math.random() * 1000) / 10000
      const lat = 31.197646 + Math.round(Math.random() * 500) / 10000
      this.markers.push([lng, lat])
    },
    onSearchResult(pois) {
      let latSum = 0
      let lngSum = 0
      if (pois.length > 0) {
        pois.forEach(poi => {
          const { lng, lat } = poi
          lngSum += lng
          latSum += lat
          this.markers.push([poi.lng, poi.lat])
        })
        const center = {
          lng: lngSum / pois.length,
          lat: latSum / pois.length
        }
        this.mapCenter = [center.lng, center.lat]
      }
    }
  }
}
</script>

<style scoped>
.amap-page-container {
  position: relative;
}
.search-box {
  position: absolute;
  top: 25px;
  right: 20px;
}
.amap-demo {
  height: 500px;
}
</style>
