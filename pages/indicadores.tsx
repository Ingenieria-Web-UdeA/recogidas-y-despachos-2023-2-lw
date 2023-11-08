import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useGetIndicators } from '@/hooks/useGetIndicators';
import { useGetLots } from '@/hooks/useGetLots';
import { CollectionsIndicator } from '@/types';
import {
  Chart,
  Series,
  ArgumentAxis,
  CommonSeriesSettings,
  Export,
  Legend,
  Margin,
  Title,
  Subtitle,
  Tooltip,
  Grid,
} from 'devextreme-react/chart';
import _ from 'lodash';
import { useMemo } from 'react';

const IndicadoresWrapper = () => {
  return (
    <ProtectedRoute roleName='ADMIN'>
      <IndicadoresPage />
    </ProtectedRoute>
  );
};

const getPlotData = (indicators: CollectionsIndicator[] | undefined) => {
  const monthYearIndicators = indicators?.map((el) => {
    return {
      ...el,
      monthYear: `${el.year}-${el.month}`,
    };
  });

  const groupedData = _.groupBy(monthYearIndicators, 'monthYear');

  const plotData = Object.keys(groupedData).map((my) => {
    const monthData: { [key: string]: string | number } = {
      monthYear: my,
    };

    const lots = groupedData[my];

    lots.forEach((lot) => {
      monthData[lot.lote] = lot.total;
    });

    return monthData;
  });

  return plotData;
};

const IndicadoresPage = () => {
  const { lots } = useGetLots();
  const { indicators, isLoading } = useGetIndicators();

  const plotData = useMemo(() => {
    return getPlotData(indicators);
  }, [indicators]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const seriesData = lots?.map((lot) => {
    return {
      value: lot.name,
      name: lot.name,
    };
  });

  return (
    <div className='p-10 flex flex-col gap-3 items-center'>
      <section className='flex w-full justify-center'>
        <Chart palette='Harmony Light' dataSource={plotData} width={'80%'}>
          <CommonSeriesSettings argumentField='monthYear' type='stackedbar' />
          {seriesData?.map((item) => (
            <Series key={item.value} valueField={item.value} name={item.name} />
          ))}
          <Margin bottom={20} />
          <ArgumentAxis
            valueMarginsEnabled={false}
            discreteAxisDivisionMode='crossLabels'
          >
            <Grid visible={true} />
          </ArgumentAxis>
          <Legend
            verticalAlignment='bottom'
            horizontalAlignment='center'
            itemTextPosition='bottom'
          />
          <Export enabled={true} />
          <Title text='Racimos recogidos'>
            <Subtitle text='(total de racimos por mes por lote)' />
          </Title>
          <Tooltip enabled={true} customizeTooltip={customizeTooltip} />
        </Chart>
      </section>
    </div>
  );
};

interface PointInfoProps {
  seriesName: string;
  value: number;
}

const customizeTooltip = (pointInfo: PointInfoProps) => {
  return {
    html: `
    <div class='flex flex-col items-center'>
      <span class='text-lg font-bold text-indigo-900'>${pointInfo.seriesName}</span>
      <span class='text-md tracking-wider font-semibold'>${pointInfo.value} racimos</span>
    </div>`,
  };
};

export default IndicadoresWrapper;
