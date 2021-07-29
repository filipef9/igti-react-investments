const Report = ({ fundName, rendimentoTotal, rendimentoPercentualTotal, children }) => {
  const rendimentoTotalIsNegative = rendimentoTotal < 0;
  const percentualStyle = (rendimentoTotalIsNegative) ? 'text-red-700' : 'text-green-700';

  return (
    <div className="py-4">
      <div className="max-w-sm bg-white shadow rounded p-6">
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold leading-5 text-gray-800">{fundName}</p>
        </div>
        <p className="text-sm leading-normal text-gray-500 pt-2">
          Rendimento total: <span className={percentualStyle}>R$ {rendimentoTotal.toLocaleString('pt')} ({rendimentoPercentualTotal}%)</span>
        </p>

        {children}
      </div>
    </div>
  );
}

export default Report;
