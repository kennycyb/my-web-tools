import React, { useState, useEffect } from 'react';
import './ChineseCalendar.css';

const ChineseCalendar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentShichen, setCurrentShichen] = useState('');

  const shichenData = [
    {
      name: '子时',
      earthlyBranch: '子',
      modernTime: '23:00 - 01:00',
      alias: '夜半',
      description: '一天的开始，传说是"子时一到，阳气生"',
      startHour: 23,
      endHour: 1
    },
    {
      name: '丑时',
      earthlyBranch: '丑',
      modernTime: '01:00 - 03:00',
      alias: '鸡鸣',
      description: '牛在反刍，鸡快要啼叫',
      startHour: 1,
      endHour: 3
    },
    {
      name: '寅时',
      earthlyBranch: '寅',
      modernTime: '03:00 - 05:00',
      alias: '平旦',
      description: '老虎最活跃的时段，天色渐明',
      startHour: 3,
      endHour: 5
    },
    {
      name: '卯时',
      earthlyBranch: '卯',
      modernTime: '05:00 - 07:00',
      alias: '日出',
      description: '太阳升起，兔子活动（卯对应兔）',
      startHour: 5,
      endHour: 7
    },
    {
      name: '辰时',
      earthlyBranch: '辰',
      modernTime: '07:00 - 09:00',
      alias: '食时',
      description: '适合吃早餐，古称"朝食"',
      startHour: 7,
      endHour: 9
    },
    {
      name: '巳时',
      earthlyBranch: '巳',
      modernTime: '09:00 - 11:00',
      alias: '隅中',
      description: '蛇开始活动，阳气最盛',
      startHour: 9,
      endHour: 11
    },
    {
      name: '午时',
      earthlyBranch: '午',
      modernTime: '11:00 - 13:00',
      alias: '日中',
      description: '太阳当空，适合午休',
      startHour: 11,
      endHour: 13
    },
    {
      name: '未时',
      earthlyBranch: '未',
      modernTime: '13:00 - 15:00',
      alias: '日昳',
      description: '羊在吃草，日光偏西',
      startHour: 13,
      endHour: 15
    },
    {
      name: '申时',
      earthlyBranch: '申',
      modernTime: '15:00 - 17:00',
      alias: '响午',
      description: '猴子活跃，适合处理事务',
      startHour: 15,
      endHour: 17
    },
    {
      name: '酉时',
      earthlyBranch: '酉',
      modernTime: '17:00 - 19:00',
      alias: '日入',
      description: '鸡回巢，太阳落山',
      startHour: 17,
      endHour: 19
    },
    {
      name: '戌时',
      earthlyBranch: '戌',
      modernTime: '19:00 - 21:00',
      alias: '黄昏',
      description: '狗守夜，人家点灯',
      startHour: 19,
      endHour: 21
    },
    {
      name: '亥时',
      earthlyBranch: '亥',
      modernTime: '21:00 - 23:00',
      alias: '人定',
      description: '猪安睡，家家入眠',
      startHour: 21,
      endHour: 23
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hour = currentTime.getHours();
    let current = '';

    for (const shichen of shichenData) {
      if (shichen.startHour > shichen.endHour) {
        // Handle midnight crossing (like 子时: 23:00 - 01:00)
        if (hour >= shichen.startHour || hour < shichen.endHour) {
          current = shichen.name;
          break;
        }
      } else if (hour >= shichen.startHour && hour < shichen.endHour) {
        current = shichen.name;
        break;
      }
    }

    setCurrentShichen(current);
  }, [currentTime]);

  const getCurrentShichenData = () => {
    return shichenData.find(s => s.name === currentShichen);
  };

  const currentShichenData = getCurrentShichenData();

  return (
    <div className="chinese-calendar">
      <div className="tool-header">
        <h1>中国传统时辰</h1>
        <p>十二时辰 - 古代中国计时制度</p>
      </div>

      <div className="intro-text">
        <p>
          十二时辰是古代中国用来计时的一种制度，把一天分为十二个时段，每个时段大约相当于现在的两个小时，并且用十二地支来命名。
        </p>
      </div>

      <div className="current-time-section">
        <div className="current-time">
          <h2>当前时间</h2>
          <div className="time-display">
            <div className="modern-time">
              {currentTime.toLocaleString('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })}
            </div>
            {currentShichenData && (
              <div className="current-shichen">
                <span className="shichen-name">{currentShichenData.name}</span>
                <span className="shichen-alias">（{currentShichenData.alias}）</span>
              </div>
            )}
          </div>
          {currentShichenData && (
            <div className="current-description">
              {currentShichenData.description}
            </div>
          )}
        </div>
      </div>

      <div className="shichen-table-container">
        <h2>十二时辰对照表</h2>
        <div className="shichen-table">
          <div className="table-header">
            <div className="col-shichen">时辰</div>
            <div className="col-branch">地支</div>
            <div className="col-time">现代时间（约）</div>
            <div className="col-alias">别称</div>
            <div className="col-description">典故/习俗</div>
          </div>
          {shichenData.map((shichen) => (
            <div
              key={shichen.name}
              className={`table-row ${shichen.name === currentShichen ? 'current' : ''}`}
            >
              <div className="col-shichen">{shichen.name}</div>
              <div className="col-branch">{shichen.earthlyBranch}</div>
              <div className="col-time">{shichen.modernTime}</div>
              <div className="col-alias">{shichen.alias}</div>
              <div className="col-description">{shichen.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChineseCalendar;
