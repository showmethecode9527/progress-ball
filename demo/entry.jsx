import ReactDOM from 'react-dom';
import ProgressBall from '../src/ProgressBall.jsx';
let config = {
    size: '100px',      // 进度球的大小(默认为'20px')
    percent: 0.7,       // 进度值(默认值为0, 决定进度球的高, 比如值是"0.5"时, 进度球的高度为圆的半径, 即一个半圆)
    showText: true,     // 是否显示进度值(默认值为false)
    textHeight: '16px'  // 进度值容器的高, 默认值为'16px'
    // textColor: '#fff'   // 进度值的文字颜色(默认值为'#fff', 当且仅当showText为true时生效)
};
ReactDOM.render(<ProgressBall config={config} />, document.querySelector('#test'));