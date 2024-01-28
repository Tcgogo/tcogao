<template>
  <!-- <NavBar color="#ffffff" title="阳阳好家政" :icon-show="false"></NavBar> -->
  <view class="home">
    <view class="bg-gradient-to-b from-blue-400 w-full h-2xl flex justify-center">
      <view class="w-90vw pt-3">
        <wd-swiper
          :height="130"
          :indicator="false"
          :list="swiperList"
          autoplay
          :current="0"></wd-swiper>
      </view>
    </view>

    <view class="flex px4.5">
      <text class="font-bold text-36 mr2">我们的优质服务</text>
      <view
        class="bg-gradient-to-r from-orange-5 to-orange-6 flex rounded-3 px1 py0.5 items-center text-24">
        <view class="bg-white w34 h34 0 rounded-full flex justify-center items-center mr1">
          <view class="i-bxs:hot text-orange-5 text-26"></view>
        </view>
        <text class="pb0.5 text-white">热门服务</text>
      </view>
    </view>

    <TnScrollList>
      <view class="w200vw home-service">
        <wd-grid :column="10">
          <wd-grid-item
            icon-size="36px"
            :icon="item.url"
            use-text-slot
            v-for="item of serviceList"
            :key="item.name">
            <template #text>
              <text class="pt1.5 text-26">{{ item.name }}</text>
            </template>
          </wd-grid-item>
        </wd-grid>
      </view>
    </TnScrollList>

    <view class="my2">
      <wd-divider>请问您需要什么服务?</wd-divider>
    </view>

    <view class="px3">
      <wd-grid :column="2" border>
        <wd-grid-item use-slot>
          <template #default>
            <view class="flex p-2">
              <view class="flex flex-1 flex-col text-left justify-between py2">
                <text class="text-32 font-bold">我想找家政员</text>
                <text class="text-gray-4">我是客户</text>
              </view>
              <img class="w120" mode="widthFix" src="/static/home/jiazheng1.png" alt="" />
            </view>
          </template>
        </wd-grid-item>
        <wd-grid-item use-slot>
          <template #default>
            <view class="flex p-2">
              <view class="flex flex-1 flex-col text-left justify-between py2">
                <text class="text-32 font-bold">我想投简历</text>
                <text class="text-gray-4">我是家政员</text>
              </view>
              <img class="w120" mode="widthFix" src="/static/home/jiazheng1.png" alt="" />
            </view>
          </template>
        </wd-grid-item>
      </wd-grid>
    </view>

    <view class="w-full h25 bg-gray-2"></view>

    <view class="px1 py3 home-bottom">
      <view class="font-bold text-36 mx2">优秀家政员</view>
      <wd-grid :gutter="8" :column="3">
        <view v-for="(_, index) of Array(9).fill(1)" :key="index">
          <wd-grid-item use-slot custom-class="grid-item">
            <template #default>
              <view class="border border-gray-3 border-solid rounded">
                <img class="w-full" mode="widthFix" src="/static/home/jiazheng1.png" alt="" />
                <wd-tag custom-class="absolute top-205 left-55" type="success" mark use-icon-slot>
                  <text>推荐</text>
                  <template #icon>
                    <view class="i-carbon:thumbs-up-filled"></view>
                  </template>
                </wd-tag>

                <view class="mt3 flex flex-col">
                  <text class="text-28 font-bold">张俊豪</text>
                  <view>
                    <text>13年经验</text>
                    <text class="px1">|</text>
                    <text>广东人</text>
                  </view>
                  <text class="text-gray-4">保姆,家政员</text>
                </view>
              </view>
            </template>
          </wd-grid-item>
        </view>
      </wd-grid>
    </view>
  </view>
</template>
<script setup lang="ts">
import { getBarHeight } from '@/utils/uni';
import NavBar from '../../components/nav-bar.vue';

const swiperList = ref([
  'http://media.jiazhengye.cn/template/t1_banner_06.png',
  'http://media.jiazhengye.cn/template/t1_banner_06.png',
]);

const serviceList = ref([
  {
    url: '/static/home/baomu_icon.png',
    name: '保姆',
  },
  {
    url: '/static/home/baomu_icon.png',
    name: '育儿嫂',
  },
  {
    url: '/static/home/baomu_icon.png',
    name: '月嫂',
  },
  {
    url: '/static/home/baomu_icon.png',
    name: '老年护理',
  },
  {
    url: '/static/home/baomu_icon.png',
    name: '小时工',
  },
  {
    url: '/static/home/baomu_icon.png',
    name: '白班阿姨',
  },
  {
    url: '/static/home/baomu_icon.png',
    name: '病人护理',
  },
  {
    url: '/static/home/baomu_icon.png',
    name: '别墅家务',
  },
  {
    url: '/static/home/baomu_icon.png',
    name: '育婴师',
  },
  {
    url: '/static/home/baomu_icon.png',
    name: '保洁',
  },
  {
    url: '/static/home/baomu_icon.png',
    name: '早教',
  },
  {
    url: '/static/home/baomu_icon.png',
    name: '管家',
  },
  {
    url: '/static/home/baomu_icon.png',
    name: '厨师',
  },
  {
    url: '/static/home/baomu_icon.png',
    name: '家政员',
  },
  {
    url: '/static/home/baomu_icon.png',
    name: '产后护理',
  },
  {
    url: '/static/home/baomu_icon.png',
    name: '指导师',
  },
]);

const peopleList = ref(Array(10).fill(1));

// const { barHeight, paddingTop } = await getBarHeight();
</script>
<style lang="scss" scoped>
.home-service {
  :deep(.wd-grid-item__content) {
    padding-bottom: 0 !important;
  }
}

.home-bottom {
  :deep(.wd-grid-item__content) {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
}
</style>
