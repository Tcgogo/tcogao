/**
 * @return {{ barHeight: number, menuButtonInfo:  WechatMiniprogram.Rect }}
 * @return barHeight: 导航栏高度
 * @return menuButtonInfo: 获取菜单按钮（右上角胶囊按钮）的布局位置信息
 */
export const getBarHeight = (): Promise<{
  barHeight: number;
  paddingTop: number;
  menuButtonInfo: UniApp.GetMenuButtonBoundingClientRectRes;
  systemInfo: UniApp.GetSystemInfoResult;
}> =>
  new Promise(async (resolve, reject) => {
    // #ifdef MP-WEIXIN
    try {
      // 获取系统信息
      const systemInfo = await uni.getSystemInfoSync();
      // 胶囊按钮位置信息
      const menuButtonInfo = await uni.getMenuButtonBoundingClientRect();
      const barHeight =
        ((menuButtonInfo.top - (systemInfo.statusBarHeight || 0)) * 2 +
          menuButtonInfo.height +
          (systemInfo.statusBarHeight || 0)) /
        2;

      const paddingTop = menuButtonInfo.top + barHeight;

      resolve({
        barHeight,
        paddingTop,
        menuButtonInfo,
        systemInfo,
      });
    } catch (error) {
      reject(error);
    }
    // #endif
    // #ifndef MP-WEIXIN
    reject();
    // #endif
  });

/**
 *
 * @param fn 执行函数
 * @param delay 延迟时间
 * @returns
 */
export const throttle = <R, A extends any[]>(
  fn: (...args: A) => R,
  delay = 50,
): [(...args: A) => R | undefined, () => void] => {
  let wait = false;
  let timeout: NodeJS.Timeout | null;
  let cancelled = false;

  return [
    (...args: A) => {
      if (cancelled) return undefined;
      if (wait) return undefined;

      const val = fn(...args);

      wait = true;

      timeout = setTimeout(() => {
        wait = false;
      }, delay);

      return val;
    },
    () => {
      cancelled = true;
      if (timeout) {
        clearTimeout(timeout);
      }
    },
  ];
};
