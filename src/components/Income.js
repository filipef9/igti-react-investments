import _ from 'lodash';
import { months } from '../helpers/dateHelpers';

const Income = ({ income }) => {
  const { month, year, value, rendimentoPercentual } = income;

  const rendimentoPercentualIsNegative = rendimentoPercentual < 0;
  const percentualStyle = (rendimentoPercentualIsNegative) ? 'text-red-700' : 'text-green-700';

  return (
    <div className="flex mt-6 w-full">
      <div className="flex-1 text-sm font-medium leading-normal">{months[month]}/{year}</div>
      <div className="flex-1 text-sm font-medium leading-normal text-right">R$ {_.round(value, 2).toFixed(2)}</div>
      <div className={`flex-1 text-sm font-medium leading-normal text-right ${percentualStyle}`}>{_.round(rendimentoPercentual, 2).toFixed(2)}%</div>
    </div>
  )
}

export default Income
