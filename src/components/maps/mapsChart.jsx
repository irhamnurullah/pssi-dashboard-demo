import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMap from 'highcharts/modules/map';
// import idAllTopoJson from '../../assets/data/id-all.topo.json';
import idAllTopoJson from '../../assets/data/id-all.geo.json';

const MapsChart = ({ dataMaps }) => {
  useEffect(() => {
    Highcharts.mapChart('container', {
      chart: {
        map: idAllTopoJson,
      },

      title: {
        text: '',
      },

      subtitle: {
        
      },

      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: 'bottom',
        },
      },

      legend: false,
      colorAxis: {
        dataClasses: [
          {
            to: 2500,
            from: 0,
          },
          {
            from: 2500,
            to: 7500,
          },
          {
            from: 7500,
            to: 15000,
          },
          {
            from: 15000,
            to: 25000,
          },
          {
            from: 25000,
            to: 45000,
          },
          {
            from: 45000,
            to: 60000,
          },
          {
            from: 60000,
          },
        ],
        minColor: '#DBEAFE',
        maxColor: '#1D4ED8',
      },
      series: [
        {
          data: dataMaps,
          name:'',
          className:'z-30',
          states: {
            hover: {
              color: '#5570da',
            },
          },
          dataLabels: {

            enabled: true,
            allowOverlap: true, 
            formatter: function () {
              var formattedValue = Highcharts.numberFormat(this.point.value, 0, '.', ',');

              if (this.point.value > 10000) {
                return "<span style='color: #475569; z-index:10'>" + (this.point.name || '') + '<br>' + formattedValue + '</span>';
              } else {
                return "<span style='z-index:10'>" + (this.point.name || '') + '<br>' + formattedValue + '</span>';
              }
            },
            color: '#353b48',
            style: {
                fontSize: '10px', // Adjust for better visibility
                textOutline: 'none' // Remove text outline for better readability
            }
          },
        },
      ],
    });
  }, [dataMaps]);

  return (
    <div>
      <div id="container" style={{ height: '500px', margin: '0 auto' }}></div>
    </div>
  );
};

export default MapsChart;
