import { months } from '../helpers/dateHelpers';
import _ from 'lodash';

const Income = ({ income }) => {
  const { month, year, value, rendimentoPercentual } = income;
  return (
    <div className="flex items-start justify-between mt-6 w-full">
      <p className="text-sm font-medium leading-normal">{months[month]}/{year}</p>
      <p className="text-sm font-medium leading-normal text-right">R$ {_.round(value, 2).toFixed(2)}</p>
      <p className="text-sm font-medium leading-normal text-right">{_.round(rendimentoPercentual, 2).toFixed(2)}%</p>
    </div>
  )
}

export default Income
