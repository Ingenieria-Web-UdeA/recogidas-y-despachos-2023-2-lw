import { useState } from 'react';

const years = [2021, 2022, 2023];

const months = [
  {
    number: 0,
    text: 'Enero',
  },
  {
    number: 1,
    text: 'Febrero',
  },
  {
    number: 2,
    text: 'Marzo',
  },
  {
    number: 3,
    text: 'Abril',
  },
  {
    number: 4,
    text: 'Mayo',
  },
  {
    number: 5,
    text: 'Junio',
  },
  {
    number: 6,
    text: 'Julio',
  },
  {
    number: 7,
    text: 'Agosto',
  },
  {
    number: 8,
    text: 'Septiembre',
  },
  {
    number: 9,
    text: 'Octubre',
  },
  {
    number: 10,
    text: 'Noviembre',
  },
  {
    number: 11,
    text: 'Diciembre',
  },
];

const DateFilters = () => {
  const [dateFilters, setDateFilters] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });

  return (
    <div className='flex gap-3'>
      <label htmlFor='year'>
        <span>Año</span>
        <select
          name='year'
          value={dateFilters.year}
          onChange={(e) =>
            setDateFilters({
              ...dateFilters,
              year: parseInt(e.target.value),
            })
          }
        >
          <option disabled value=''>
            Seleccione un año
          </option>
          {years.map((year) => {
            return <option key={year}>{year}</option>;
          })}
        </select>
      </label>
      <label htmlFor='month'>
        <span>Mes</span>
        <select
          name='month'
          value={dateFilters.month}
          onChange={(e) =>
            setDateFilters({
              ...dateFilters,
              month: parseInt(e.target.value),
            })
          }
        >
          <option disabled value=''>
            Seleccione un mes
          </option>
          {months.map((month) => {
            return (
              <option key={month.text} value={month.number}>
                {month.text}
              </option>
            );
          })}
        </select>
      </label>
    </div>
  );
};

export { DateFilters };
