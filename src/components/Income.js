import _ from 'lodash';
import { months } from '../helpers/dateHelpers';

const Income = ({ income }) => {
  const { month, year, value, rendimentoPercentual } = income;

  const rendimentoPercentualIsNegative = rendimentoPercentual < 0;
  const percentualStyle = (rendimentoPercentualIsNegative) ? 'text-red-700' : 'text-green-700';

  return (
    <div className="flex items-start justify-between mt-6 w-full">
      <p className="text-sm font-medium leading-normal">{months[month]}/{year}</p>
      <p className="text-sm font-medium leading-normal text-right">R$ {_.round(value, 2).toFixed(2)}</p>
      <p className={`text-sm font-medium leading-normal text-right ${percentualStyle}`}>{_.round(rendimentoPercentual, 2).toFixed(2)}%</p>
    </div>
  )
}

export default Income
