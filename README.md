# progress-ball 进度球
初学react和webpack的练手小组件
## 使用方法
    let config = {
      size: '100px',      // 进度球的大小(默认为'20px')
      percent: 0.7,       // 进度值(默认值为0, 决定进度球的高, 比如值是"0.5"时, 进度球的高度为圆的半径, 即一个半圆)
      showText: true,     // 是否显示进度值(默认值为false)
      textHeight: '16px'  // 进度值容器的高, 默认值为'16px'
    };
    ReactDOM.render(<ProgressBall config={config} />, document.querySelector(selector));
