import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import Dropdown from '@/components/dropdown';
import IconHorizontalDots from '@/components/icon/icon-horizontal-dots';
import { IRootState } from '@/store';
import { fetchMetrics, filters, GET_METRICS_KEY } from '@/client/endpoints';

export const Chart = () => {
  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
  const isDark = useSelector(
    (state: IRootState) =>
      state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode,
  );
  const [range, setRange] = useState('This Month');
  const [seriesData, setSeriesData] = useState<any>({
    series: [
      {
        name: 'Leads Summary',
        data: [],
      },
    ],
    options: {
      chart: {
        height: 360,
        type: 'bar',
        fontFamily: 'Nunito, sans-serif',
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 2,
        colors: ['transparent'],
      },
      colors: ['#5c1ac3', '#ffbb44'],
      dropShadow: {
        enabled: true,
        blur: 3,
        color: '#515365',
        opacity: 0.4,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 8,
          borderRadiusApplication: 'end',
        },
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        fontSize: '14px',
        itemMargin: {
          horizontal: 8,
          vertical: 8,
        },
      },
      grid: {
        borderColor: isDark ? '#191e3a' : '#e0e6ed',
        padding: {
          left: 20,
          right: 20,
        },
      },
      xaxis: {
        categories: [],
        axisBorder: {
          show: true,
          color: isDark ? '#3b3f5c' : '#e0e6ed',
        },
      },
      yaxis: {
        tickAmount: 6,
        opposite: isRtl ? true : false,
        labels: {
          offsetX: isRtl ? -10 : 0,
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: isDark ? 'dark' : 'light',
          type: 'vertical',
          shadeIntensity: 0.3,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 0.8,
          stops: [0, 100],
        },
      },
      tooltip: {
        marker: {
          show: true,
        },
      },
    },
  })

  const { data } = useQuery(
    [`${GET_METRICS_KEY}_LeadChart`, range],
    () => fetchMetrics({ type: 'LeadChart', range: range as any }),
    {
      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    if(data?.data){
      setSeriesData({
        series: [
          {
            name: 'Leads Summary',
            data: data?.data || [],
          },
        ],
        options: {
          chart: {
            height: 360,
            type: 'bar',
            fontFamily: 'Nunito, sans-serif',
            toolbar: {
              show: false,
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            width: 2,
            colors: ['transparent'],
          },
          colors: ['#5c1ac3', '#ffbb44'],
          dropShadow: {
            enabled: true,
            blur: 3,
            color: '#515365',
            opacity: 0.4,
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '55%',
              borderRadius: 8,
              borderRadiusApplication: 'end',
            },
          },
          legend: {
            position: 'bottom',
            horizontalAlign: 'center',
            fontSize: '14px',
            itemMargin: {
              horizontal: 8,
              vertical: 8,
            },
          },
          grid: {
            borderColor: isDark ? '#191e3a' : '#e0e6ed',
            padding: {
              left: 20,
              right: 20,
            },
          },
          xaxis: {
            categories: data?.categories || [],
            axisBorder: {
              show: true,
              color: isDark ? '#3b3f5c' : '#e0e6ed',
            },
          },
          yaxis: {
            tickAmount: 6,
            opposite: isRtl ? true : false,
            labels: {
              offsetX: isRtl ? -10 : 0,
            },
          },
          fill: {
            type: 'gradient',
            gradient: {
              shade: isDark ? 'dark' : 'light',
              type: 'vertical',
              shadeIntensity: 0.3,
              inverseColors: false,
              opacityFrom: 1,
              opacityTo: 0.8,
              stops: [0, 100],
            },
          },
          tooltip: {
            marker: {
              show: true,
            },
          },
        },
      })
    }
  }, [data])

  return (
    <div className="panel h-full p-0 lg:col-span-2">
      <div className="mb-5 flex items-start justify-between border-b border-white-light p-5  dark:border-[#1b2e4b] dark:text-white-light">
        <h5 className="text-lg font-semibold ">Lead Summary</h5>
        {filters?.length && (
          <div className="dropdown">
            <Dropdown
              offset={[0, 5]}
              placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
              btnClassName="hover:text-primary"
              button={
                <IconHorizontalDots className="text-black/70 hover:!text-primary dark:text-white/70" />
              }>
              <ul>
                {filters.map((e, i) => (
                  <li key={i}>
                    <button type="button" onClick={() => setRange(e)}>
                      {e}
                    </button>
                  </li>
                ))}
              </ul>
            </Dropdown>
          </div>
        )}
      </div>

      <ReactApexChart
        options={seriesData.options}
        series={seriesData.series}
        type="bar"
        height={360}
        width={'100%'}
      />
    </div>
  );
};
