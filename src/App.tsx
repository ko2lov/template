import React, { useEffect } from 'react';
import {Theme , presetGpnDefault} from "@consta/uikit/Theme"
import {ChoiceGroup} from "@consta/uikit/ChoiceGroup"
import {useState} from "react"

import './styles/styles.css'
import LabelCurrency from './components/LabelCurrency';
import { ReactECharts } from './Echarts/ReactECharts';




const items = ["$","€","¥"]

function App() {


  const [value,setValue] = useState<string | null>(items[0]);
  const [avegage,setAverage] = useState<string | null>(null);
  let current : string = "";

  type OptionType = {
    color: string;
    xAxis: {
      type: string;
      data: any;
      boundaryGap: boolean;
      formatter: (params: { name: string; }[]) => string;
    };
    tooltip: {
      trigger: string;
    };
    yAxis: {
      type: string;
      scale: boolean;
    };
    series: {
      name: string;
      tooltip: {
        valueFormatter: (value: string) => string;
      };
      data: any;
      type: string;
    }[];
  };

    switch (value) {
        case "$":
            current = "Курс доллара"
            break;
        case "€":
            current = "Курс евро"
            break;
        case "¥":
            current = "Курс юаня"
            break;
        default:
            break;
    }
    interface IDataItem {
        property1: string;
        [key: string]: any;
    }

  
  const [option, setOption] = useState<OptionType | null>(null);

  useEffect(() => {
    fetch('https://65df3c20ff5e305f32a1d428.mockapi.io/api/v1/mockData', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      let filteredData = data.filter((item: IDataItem) => item.indicator === current);
      let option = {
        color: '#EDAF59',
        xAxis: {
          type: 'category',
          data: data.filter((item: IDataItem) => item.indicator === current).map((item: { month: any; }) => item.month),
          boundaryGap: false,
          formatter: function (params: { name: string; }[]) {
            return '<b>' + params[0].name + '</b>'
        }
        
        },
        tooltip: {
          trigger: 'axis',
        },
        yAxis: {
          type: 'value',
          scale: true
        },
        series: [
          {
            name: current,
            tooltip: {
              valueFormatter: (value: string)  => value + ' ₽' 
            },
            data: data.filter((item: IDataItem) => item.indicator === current).map((item: { value: any; }) => item.value),
            type: 'line'
          }
        ]
      };
      setOption(option);
      let sum = filteredData.reduce((a: any, b: { value: any; }) => a + b.value, 0);
      let avg = sum / filteredData.length;
      setAverage(avg.toFixed(1))
    })
    .catch((error) => {
      console.error('Ошибка:', error);
    });
  }, [current]);
     

  return  <Theme className='App' preset={presetGpnDefault}>
        <div className='top'>
        <LabelCurrency value = {value}/>
        
       <ChoiceGroup
            name="ChoiceCurrency"
            value={value}
            onChange={({ value }) => setValue(value)}
            items={items}
            getItemLabel={(item) => item} 
        />
        
        </div>
        <div className='middle'>
            {option && <ReactECharts option={option}/>}
            <div className='avg'>
              <p className='avg__title'>
                среденее за переиод
              </p>
              <h1 className='avg__item'>
                    {avegage}<span className="avg__item-decor">₽</span>
              </h1>
            </div>
            
        </div>
    </Theme>

}

export default App;
