import './App.css';
import { Chart, DataPoint, HighchartsOptions } from '@sisense/sdk-ui';
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
  const [breakBy, setBreakBy] = useState('color');
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

  const handleBreakChange = (
    _event: React.MouseEvent<HTMLElement>,
    newBreak: string
  ) => {
    setBreakBy(newBreak);
  };

  const breakStringToColumn = (breakString: string) => {
    if (breakString === 'manager') {
      return DM.DimEmployees.TeamManger;
    } else if (breakString === 'region') {
      return DM.DimCountries.Region;
    } else {
      return DM.DimProducts.Color;
    }
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
        onBeforeRender={(options: HighchartsOptions) => {
          if (options.tooltip) {
            options.tooltip.formatter = function () {
              const value = (
                this.y && this.y !== 0 ? this.y / 1000 : 0
              ).toFixed(1);
              return `${this.x}: <b>${value}K</b>`;
            };
          }
          return options;
        }}
        onDataPointClick={(point: DataPoint) => {
          const category = point.categoryValue as string;
          setCategories((categories) =>
            categories.includes(category)
              ? categories.filter((item) => item !== (category as string))
              : [...categories, category as string]
          );
        }}
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
          breakBy: [breakStringToColumn(breakBy)],
          seriesToColorMap: {
            Black: '#1b1b1b',
            Blue: '#0000cd',
            Gold: '#fcc200',
            Red: '#ce2029',
            Silver: '#acacac',
            Yellow: '#eee600',
            USA: '#00008b',
            Europe: '#dc143c',
          },
        }}
        filters={chartFilters}
        onBeforeRender={(options: HighchartsOptions) => {
          if (options.tooltip) {
            options.tooltip.formatter = function () {
              const value = (
                this.y && this.y !== 0 ? this.y / 1000 : 0
              ).toFixed(1);
              return `${this.x} - ${this.series.name}: <b>${value}K</b>`;
            };
          }
          return options;
        }}
        styleOptions={{
          width: 1000,
          height: 400,
        }}
      />
      <ToggleButtonGroup value={breakBy} onChange={handleBreakChange} exclusive>
        <ToggleButton key={'color'} value={'color'}>
          Color
        </ToggleButton>
        <ToggleButton key={'region'} value={'region'}>
          Region
        </ToggleButton>
        <ToggleButton key={'manager'} value={'manager'}>
          Team Manager
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
}

export default App;
