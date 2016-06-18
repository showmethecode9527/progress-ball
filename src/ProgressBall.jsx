import React from 'react';

require('./ProgressBall.less');

/**
 * 进度球组件
 * @props  config  {
 *                     percent: 0.7,       // Float,   进度值的大小(可选, 0-1之间, 默认值为0)
 *                     showText: false,    // Boolean, 是否在进度球上显示百分比值(可选, 默认值为false)
 *                     size: '50px',       // String,  进度球的大小(可选, 默认值为'20px')
 *                     textHeight: '16px', // String,  进度球上显示的百分比值的高(可选, 默认值为'16px')
 *                     textColor: '#fff'   // String,  进度球上显示的百分比值的颜色(可选, 默认值为'#fff')
 *                 }
 * @author mathin
 * @date   2016-6-8
 */
class ProgressBall extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            // 进度球和边框的颜色(默认为'#d9534f'), 一共3种
            // 红色: #d9534f, 橙色: #f0ad4e, 绿色: #5cb85c
            color: '#d9534f',
            segmentHeight: 0,
            // 进度球的大小(默认为'20px')
            size: typeof props.config.size === 'undefined' ? '20px' : props.config.size,
            // 进度值(默认值为0, 决定进度球的高, 比如值是"0.5"时, 进度球的高度为圆的半径, 即一个半圆)
            percent: typeof props.config.percent === 'undefined' ? 0 : parseFloat(props.config.percent),
            // 是否显示进度值(默认值为false)
            showText: typeof props.config.showText === 'undefined' ? false : props.config.showText,
            // 文本容器的高
            textHeight: typeof props.config.textHeight === 'undefined' ? '16px' : props.config.textHeight,
            // 进度值的文字颜色(默认值为'#fff', 当且仅当showText为true时生效)
            textColor: typeof props.config.textColor === 'undefined' ? '#fff' : props.config.textColor
        }
    }
    /**
     * 计算弓形的高
     * 根据传入的小数值(即进度值)计算实际的弓形高
     * 因为弓形的高关于弓形的面积的函数不可解
     * 所以这里使用枚举法, 基本思路如下:
     *     1. 取有限个高度递增的弓形(这里分别是 1px, 2px, 3px, ...), 算出其面积;
     *     2. 算出各个弓形的面积所占圆的百分比;
     *     3. 比较传入的进度值, 看其和哪个百分比最接近, 取最接近的这个弓形所对应的高为进度球的高.
     * @todo   第1步可以优化
     *         (当用户传入的size值较大, 即进度球的尺寸较大时, 第1步的步长可以取大一些, 理论上, size越大, 步长应该越大)
     * @author mathink
     * @date   2016-06-08
     */
    calcSegmentHeight() {
        let _size = parseInt(this.state.size, 10);

        // 存储弓形不同的高对应的面积(弓形的高关于弓形的面积不可解)
        // 从高为1px开始递增
        let segmentAreas = [],
            r = _size / 2, // 圆的半径
            area = Math.PI * r * r; // 圆的面积
        // 劣弓面积的计算(含半圆)
        for (let h = 1; h <= r; h++) {
            segmentAreas.push(r * r * Math.acos((r - h) / r) - (r - h) * Math.sqrt(h * (2 * r - h)));
        }
        // 缓存劣弓面积, 方便后面计算优弓的面积
        let minorSegmentAreas = segmentAreas;
        // 优弓面积的计算
        // 这里根据优弓与劣弓的面积互补来计算
        for (let h = r + 1, i = 1; h <= _size; h++, i++) {
            segmentAreas.push(area - minorSegmentAreas[r - i]);
        }
        // 弓形的高所对应的面积所占圆形面积的比值(递增)
        // 该数组的第0个元素对应的弓形高为1px, 第1个元素对应的弓形的高为2px, ..., 
        // 最后一个元素对应的弓形的高为圆形的直径(即弓形面积达到最大) 
        let percents = segmentAreas.map(x => x / area);

        // 计算进度球(弓形)的高度(根据传进的百分比小数计算)
        let segmentHeight, // 进度球(弓形)的高度
            percent = this.state.percent; // 传入的百分比数字
        if (percent < 0 || percent > 1) {
            segmentHeight = 0;
        } else if (percent === 1) {
            segmentHeight = _size;
            this.setState({
                color: '#5cb85c' // 绿色
            });
        } else {
            // < 0.5的使用默认的红色
            if (percent >= 0.5) {
                this.setState({
                    color: '#f0ad4e' // 橙色
                });
            }
            // 计算弓形的高
            segmentHeight = (function (ary, num) {
                if (num <= ary[0]) {
                    return 0;
                }
                let index;
                for (let i = 1; i < ary.length; i++) {
                    if (num === ary[i] || i === ary.length - 1) {
                        index = i;
                        break;
                    }
                    if (num > ary[i + 1]) {
                        continue;
                    }
                    if (num - ary[i] >= ary[i + 1] - num) {
                        index = i + 1;
                    } else {
                        index = i;
                    }
                    break;
                }
                return index;
            })(percents, percent);
        }
        this.setState({
            segmentHeight: segmentHeight
        });
    }
    componentWillMount() {
        this.calcSegmentHeight();
    }
    render() {
        let _size = parseInt(this.state.size, 10);
        
        // 设置进度球容器的样式
        let wrapperStyle = {
            width: _size + 2 + 'px',
            height: _size + 2 + 'px',
            borderColor: this.state.color
        };

        // 设置进度球的样式
        let ballStyle = {
            width: this.state.size,
            height: this.state.size,
            backgroundColor: this.state.color,
            clip: 'rect(' + (_size - this.state.segmentHeight) + 'px ' + _size + 'px ' + _size + 'px 0)'
        };

        // 是否显示进度值
        if (this.state.showText) {
            let textStyle,
                percentText = Math.floor(this.state.percent * 100) + '%';
            if (this.state.segmentHeight >= (_size + parseInt(this.state.textHeight, 10)) / 2) {
                textStyle = {
                    color: '#fff'
                }
            } else {
                textStyle = {
                    color: '#000'
                }
            }
            return (
                <div className="progress-ball-wrapper" style={wrapperStyle}>
                    <div className="progress-ball" style={ballStyle}></div>
                    <div className="progress-text" style={textStyle}>{percentText}</div>
                </div>
            );
        } else {
            return (
                <div className="progress-ball-wrapper" style={wrapperStyle}>
                    <div className="progress-ball" style={ballStyle}></div>
                </div>
            );
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            percent: nextProps.config.percent
        });
        this.calcSegmentHeight();
    }
}

export default ProgressBall;