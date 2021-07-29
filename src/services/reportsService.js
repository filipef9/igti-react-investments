import axios from "axios";
import _ from 'lodash';

const apiUrl = 'https://3001-bronze-locust-3w9yuf50.ws-us11.gitpod.io';

const reportsService = {
  findAll: async () => {
    const fetchInvestments = axios.get(`${apiUrl}/investments`);
    const fetchReports = axios.get(`${apiUrl}/reports`);

    const response = await Promise.allSettled([fetchInvestments, fetchReports]);
    const investments = response[0].value.data;
    const reports = response[1].value.data;

    const reportsGroupByInvestment = _(reports)
      .groupBy('investmentId')
      .value();

    return Object.keys(reportsGroupByInvestment).map((investmentId, index) => {
      const currentReport = _.sortBy(reportsGroupByInvestment[investmentId], ['month'], ['asc']);

      const fund = investments.find(investment => investment.id === investmentId);
      const rendimentoTotal = _.round((_.last(currentReport).value - _.first(currentReport).value), 2);
      const rendimentoPercentualTotal = _.round(((_.last(currentReport).value - _.first(currentReport).value) / _.first(currentReport).value * 100), 2);
      const incomes = currentReport.map(({ id, month, year, value }) => ({ id, month, year, value }));

      incomes[0].rendimento = 0.00;
      for (let i = 1; i < incomes.length; i++) {
        incomes[i].rendimento = ((incomes[i].value - incomes[i - 1].value) / incomes[i - 1].value) * 100;
      }

      return {
        id: fund.id,
        fundName: fund.description,
        rendimentoTotal,
        rendimentoPercentualTotal,
        incomes
      };
    });
  }
};

export default reportsService;


/*

  const investmentLabel = investments.find(investment => investment.id === investmentId);
  const currentReport = _.sortBy(reportsGroupByInvestment[investmentId], ['month'], ['asc']);
  const rendimentoTotal = _.round((_.last(currentReport).value - _.first(currentReport).value), 2);
  const porcentagem = _.round(((_.last(currentReport).value - _.first(currentReport).value) / _.first(currentReport).value * 100), 2);

  currentReport[0].rendimento = 0.00;
  for (let i = 1; i < currentReport.length; i++) {
    currentReport[i].rendimento = ((currentReport[i].value - currentReport[i - 1].value) / currentReport[i - 1].value) * 100;
  }

*/

/*const reports = [
  {
    'fundName': '',
    'incomes': [
      {
        'month': '',
        'year': '',
        'value': '',
        'percentual': ''
      }
    ],
  }
];*/