import './App.css';
import { Chart } from '@sisense/sdk-ui';
import { measureFactory } from '@sisense/sdk-data';
import * as DM from './models/sample-retail';

function App() {
  return (
    <>
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
            {
              column: measureFactory.sum(
                DM.Fact_Sale_orders.OrderQty,
                'Total Order Quantity'
              ),
              showOnRightAxis: true,
            },
          ],
        }}
        styleOptions={{
          width: 1000,
          height: 400,
          yAxis: { title: { enabled: true, text: 'Revenue' } },
          y2Axis: { title: { enabled: true, text: 'Quantity' } },
        }}
      />
      <Chart
        dataSet={DM.DataSource}
        chartType={'column'}
        dataOptions={{
          category: [DM.DimProducts.CategoryName],
          value: [measureFactory.sum(DM.Fact_Sale_orders.OrderRevenue)],
        }}
        styleOptions={{
          width: 1000,
          height: 400,
        }}
      />
    </>
  );
}

export default App;
