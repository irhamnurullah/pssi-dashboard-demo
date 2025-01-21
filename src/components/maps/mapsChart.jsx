import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMap from 'highcharts/modules/map';
// import idAllTopoJson from '../../assets/data/id-all.topo.json';
import idAllTopoJson from '../../assets/data/id-all.geo.json';

const MapsChart = ({ dataMaps }) => {
  useEffect(() => {
    // (async () => {
    //   // const topology = await fetch(
    //   //     'https://code.highcharts.com/mapdata/countries/id/id-all.topo.json'
    //   // ).then(response => response.json());
    // if (dataMaps && dataMaps.length > 0) {
    // Highcharts.mapChart(Highcharts);
    // Instantiate the map
    Highcharts.mapChart('container', {
      chart: {
        map: idAllTopoJson,
      },

      title: {
        text: '',
      },

      subtitle: {
        // text: 'Source map: <a href="http://code.highcharts.com/mapdata/historical/countries/id-2011/id-all-2011.topo.json">Indonesia (2011)</a>'
      },

      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: 'bottom',
        },
      },

      /**
       * Uncomment legend to show the legend
       */
      // legend: {
      //   title: {
      //     text: 'Players',
      //     style: {
      //       color:
      //         // theme
      //         (Highcharts.defaultOptions &&
      //           Highcharts.defaultOptions.legend &&
      //           Highcharts.defaultOptions.legend.title &&
      //           Highcharts.defaultOptions.legend.title.style &&
      //           Highcharts.defaultOptions.legend.title.style.color) ||
      //         'black',
      //     },
      //   },
      //   align: 'left',
      //   verticalAlign: 'bottom',
      //   floating: true,
      //   layout: 'vertical',
      //   valueDecimals: 0,
      //   backgroundColor:
      //     // theme
      //     (Highcharts.defaultOptions && Highcharts.defaultOptions.legend && Highcharts.defaultOptions.legend.backgroundColor) ||
      //     'rgba(255, 255, 255, 0.85)',
      //   symbolRadius: 0,
      //   symbolHeight: 14,
      // },
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
        // minColor: "#E0F2FE",
        // maxColor: "#075985",
      },
      series: [
        {
          data: dataMaps,
          name: 'Total Players',
          states: {
            hover: {
              color: '#5570da',
            },
          },
          dataLabels: {
            enabled: true,
            useHTML: true,
            // format: '{point.name} {point.value}'
            formatter: function () {
              var formattedValue = Highcharts.numberFormat(this.point.value, 0, '.', ',');

              if (this.point.value > 10000) {
                return "<span style='color: #475569'>" + (this.point.name || '') + '<br>' + formattedValue + '</span>';
              } else {
                return '<span>' + (this.point.name || '') + '<br>' + formattedValue + '</span>';
              }
            },
            color: '#353b48',
          },
        },
      ],
    });
    // }
    // })();
  }, [dataMaps]);

  // console.log(dataMaps);

  return (
    <div>
      <div id="container" style={{ height: '500px', margin: '0 auto' }}></div>
    </div>
  );
};

export default MapsChart;
