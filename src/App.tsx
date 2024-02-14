import './App.css';
import { Chart, MemberFilterTile } from '@sisense/sdk-ui';
import { Filter, measureFactory } from '@sisense/sdk-data';
import * as DM from './models/sample-retail';
import { useMemo, useState } from 'react';

function App() {
  const [categoryFilter, setCategoryFilter] = useState<Filter | null>(null);
  const chartFilters = useMemo(
    () => (categoryFilter ? [categoryFilter] : []),
    [categoryFilter]
  );

  return (
    <>
      <MemberFilterTile
        title={'Category'}
        dataSource={DM.DataSource}
        attribute={DM.DimProducts.CategoryName}
        filter={categoryFilter}
        onChange={setCategoryFilter}
      />
      <Chart
        dataSet={DM.DataSource}
        chartType={'column'}
        dataOptions={{
          category: [DM.DimProducts.CategoryName],
          value: [
            measureFactory.sum(
              DM.Fact_Sale_orders.OrderRevenue,
              'Total Revenue'
            ),
          ],
        }}
        highlights={chartFilters}
        styleOptions={{
          width: 1000,
          height: 400,
        }}
      />
      <Chart
        dataSet={DM.DataSource}
        chartType={'column'}
        dataOptions={{
          category: [DM.DimProducts.CategoryName],
          value: [measureFactory.sum(DM.Fact_Sale_orders.OrderRevenue)],
          breakBy: [DM.DimProducts.Color],
          seriesToColorMap: {
            Black: '#1b1b1b',
            Blue: '#0000cd',
            Gold: '#fcc200',
            Red: '#ce2029',
            Silver: '#acacac',
            Yellow: '#eee600',
          },
        }}
        filters={chartFilters}
        styleOptions={{
          width: 1000,
          height: 400,
        }}
      />
    </>
  );
}

export default App;
