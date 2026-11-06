# 桌面版磨砂窗口

一个只改样式的插件：桌面窗口本来就带 macOS 原生材质，这个插件让它透出来。

## 变化

- 主界面变成窗口材质上的半透明玻璃（模糊由 macOS 合成，不是 CSS 逐帧模糊）。
- 聊天、自动化任务、插件页共用同一层 tint，深浅一致。
- 页面型界面去掉那条比正文更深的吸顶标题遮罩。

## 配置

`lib/client.js` 样式表里的两个透明度旋钮：

```css
--dsh-frosted-glass-pane: color-mix(in srgb, #fdfdff 56%, transparent);  /* 浅色 */
--dsh-frosted-glass-pane: color-mix(in srgb, #151517 44%, transparent);  /* 深色 */
```

侧栏单独一档（`--dsw-specific-sidebar-fill`），因为 macOS 会把侧栏底色再和 50% 透明混一次。

## 兼容性

- macOS 桌面版，`dsh >= 0.2.0-rc.1`。
- 系统「降低透明度」和全屏模式下退回实色。
- 浏览器标签页和 Windows 上没有任何效果。
