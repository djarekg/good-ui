import { formatter } from '@/core/utils/currency.js';
import { ProductType, type ProductTypeTotalByMonthModel } from '@gui/api';
import { LineChart } from '@mui/x-charts/LineChart';

const MONTH_ABBR = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const productTypeColorMap: Record<ProductType, string> = {
  [ProductType.DRESS]: '#8884d8',
  [ProductType.HAT]: '#82ca9d',
  [ProductType.HOODIE]: '#ffc658',
  [ProductType.JACKET]: '#ff7300',
  [ProductType.PANTS]: '#0088FE',
  [ProductType.SHIRT]: '#00C49F',
  [ProductType.SHOES]: '#FFBB28',
  [ProductType.SHORTS]: '#FF8042',
  [ProductType.SOCKS]: '#A28DD0',
  [ProductType.SWEATER]: '#FF6699',
  [ProductType.UNDERWEAR]: '#33CCFF',
};

type DashboardTotalByMonthProps = {
  data: ProductTypeTotalByMonthModel[];
};

const DashboardTotalByMonth = ({ data }: DashboardTotalByMonthProps) => {
  return (
    <LineChart
      xAxis={[
        {
          dataKey: 'month',
          valueFormatter: (value: number) => MONTH_ABBR[value] || '',
        },
      ]}
      yAxis={[
        {
          dataKey: 'total',
          valueFormatter: (value: number) => formatter.format(value),
        },
      ]}
      series={Object.keys(ProductType).map((key) => ({
        dataKey: 'total',
        label: key,
        showMark: true,
        color: productTypeColorMap[key as ProductType],
        stack: 'total',
        area: true,
        stackOffset: 'none',
      }))}
      // series={[
      //   {
      //     dataKey: 'total',
      //     label: 'name',
      //     showMark: true,
      //     color: '#0088FE',
      //     stack: 'total',
      //     area: true,
      //     stackOffset: 'none',
      //   },
      // ]}
      dataset={data}
      title="Total Sales by Month"
      hideLegend={true}
      experimentalFeatures={{ preferStrictDomainInLineCharts: true }}
    />
  );
};

export default DashboardTotalByMonth;
