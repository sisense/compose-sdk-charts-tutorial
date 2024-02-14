import './App.css';
import { Chart } from '@sisense/sdk-ui';
import { filterFactory, measureFactory } from '@sisense/sdk-data';
import * as DM from './models/sample-retail';
import { useMemo, useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

const productCategories = [
  'Bikes',
  'Body Armor',
  'Build Kits',
  'Cables & Housing',
  'Frames',
  'Helmets',
  'Wheels & Wheelsets',
];

function App() {
  const [categories, setCategories] = useState<string[]>([]);
  const chartFilters = useMemo(
    () =>
      categories
        ? [filterFactory.members(DM.DimProducts.CategoryName, categories)]
        : [],
    [categories]
  );

  const handleCategoryChange = (
    _event: React.MouseEvent<HTMLElement>,
    newCategories: string[]
  ) => {
    setCategories(newCategories);
  };

  return (
    <>
      <ToggleButtonGroup value={categories} onChange={handleCategoryChange}>
        {productCategories.map((productCategory) => (
          <ToggleButton key={productCategory} value={productCategory}>
            {productCategory}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
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
