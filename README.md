# progress-ball 进度球
`react`进度球组件
## 使用方法
### 基本使用
#### 不做任何配置
      ReactDOM.render(<ProgressBall />, document.querySelector(selector));
如上，只显示一个带红色边框的直径为`22px`的圆，如果需要改变大小，需要进行配置：
#### 设置进度球的大小
    let config = {
      size: '100px'
    };
    ReactDOM.render(<ProgressBall config={config}/>, document.querySelector(selector));
#### 设置进度值
    let config = {
      size: '100px',
      percent: 0.5
    };
    ReactDOM.render(<ProgressBall config={config}/>, document.querySelector(selector));
###详细配置
    let config = {
      size: '100px',      // 进度球的大小(默认为'20px')
      percent: 0.7,       // 进度值(默认值为0, 决定进度球的高, 比如值是"0.5"时, 进度球的高度为圆的半径, 即一个半圆)
      showText: true,     // 是否显示进度值(默认值为false)
      textHeight: '16px'  // 进度值容器的高, 默认值为'16px'
      textColor: '#fff'   // 进度值的文字颜色(默认值为'#fff', 当且仅当showText为true时生效)
    };
    ReactDOM.render(<ProgressBall config={config}/>, document.querySelector('#test'));
