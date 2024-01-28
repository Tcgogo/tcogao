<!-- #ifdef MP-WEIXIN -->
<script setup lang="ts">
import { getBarHeight, throttle } from '@/utils/uni';
import { onPageScroll, onReady } from '@dcloudio/uni-app';
import { computed, ref } from 'vue';

interface IProps {
  /** 左边 icon，同 sc-icon 的 name */
  leftIcon?: string;
  /** title 字体颜色 */
  color?: string;
  /** title */
  title: string;
  /** mode */
  autoBackType: 'home' | 'back' | 'none';
  /** 是否显示icon */
  iconShow?: boolean;
}

const emits = defineEmits<{
  (e: 'click-left'): void;
}>();

const props = withDefaults(defineProps<IProps>(), {
  leftIcon: 'i-ion-ios-arrow-back',
  color: '#ffffff',
  autoBackType: 'back',
  iconShow: true,
});

const page = getCurrentPages();

const topBarHeight = ref(0);

const topBarTop = ref(0);

const topBarTopComp = computed(() => {
  return `${topBarTop.value - topBarHeight.value}px`;
});

function handleClickLeft() {
  if (props.autoBackType === 'back') {
    uni.navigateBack({
      delta: 1,
    });
  } else if (props.autoBackType === 'home') {
    uni.switchTab({
      url: '/pages/index/index',
      fail: () => {
        uni.navigateTo({
          url: '/pages/index/index',
        });
      },
    });
  } else {
    emits('click-left');
  }
}

const backgroundColorComp = ref('');

const colorBlack = ref('');

const colorComp = computed(() => {
  return colorBlack.value || props.color;
});

const [setNavigationBar] = throttle((hooks: UniApp.PageScrollToOptions) => {
  const Y = hooks.scrollTop || 0;
  const height = topBarTop.value;
  const opacity = Y < height ? Y * 0.01 : 1;

  colorBlack.value = opacity > 0.5 ? '#000000' : props.color;

  backgroundColorComp.value = Y > 0 ? `rgba(255,255,255,${opacity})` : '';

  if (page[0].route !== getCurrentPages()[0].route) return;

  uni.setNavigationBarColor({
    backgroundColor: colorBlack.value,
    frontColor: colorBlack.value,
  });
});

onPageScroll((hooks) => {
  setNavigationBar(hooks);
});

onReady(async () => {
  const { barHeight, paddingTop } = await getBarHeight();

  topBarHeight.value = barHeight;
  topBarTop.value = paddingTop;
});
</script>
<script lang="ts">
export default {
  options: { virtualHost: true, styleIsolation: 'shared' },
};
</script>
<!-- #endif -->
<template>
  <view class="sc-nav-bar w-screen fixed top-0 left-0 z-[9999999]">
    <uni-nav-bar
      :border="false"
      background-color="rgba(255,255,255,0)"
      :height="topBarHeight"
      :color="colorComp"
      :title="title"
      @click-left="handleClickLeft">
      <template #left>
        <sc-icon v-if="iconShow" size="15" :style="{ color: color }" :name="leftIcon"></sc-icon>
      </template>
    </uni-nav-bar>
  </view>
</template>

<style lang="scss" scoped>
.sc-nav-bar {
  padding-top: v-bind(topBarTopComp);
  background: v-bind(backgroundColorComp);
}
</style>
