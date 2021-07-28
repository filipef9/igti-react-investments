import { useState, useEffect } from "react";

import axios from 'axios';
import _ from 'lodash';

const apiUrl = 'https://3001-bronze-locust-3w9yuf50.ws-us11.gitpod.io';

const InvestmentsPage = () => {

  const [investments, setInvestments] = useState([]);
  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const response = await axios.get(`${apiUrl}/investments`);
        setInvestments(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchInvestments();
  }, []);

  const [reportsGroupByInvestment, setReportsGroupByInvestment] = useState({});
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(`${apiUrl}/reports`);

        const groupedBy = _(response.data)
          .groupBy('investmentId')
          .value();

        setReportsGroupByInvestment(groupedBy);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchReports();
  }, []);

  return (
    <>
      <header>
        <h1>react-investments v1.0.1</h1>
      </header>
      <main>
        {Object.keys(reportsGroupByInvestment).map((investmentId, index) => {
          const investmentLabel = investments.find(investment => investment.id === investmentId).description;
          const currentReport = _.sortBy(reportsGroupByInvestment[investmentId], ['month'], ['asc']);
          const rendimentoTotal = _.round((_.last(currentReport).value - _.first(currentReport).value), 2);
          const porcentagem = _.round(((_.last(currentReport).value - _.first(currentReport).value) / _.first(currentReport).value * 100), 2);

          currentReport[0].rendimento = 0.00;
          for (let i = 1; i < currentReport.length; i++) {
            currentReport[i].rendimento = ((currentReport[i].value - currentReport[i - 1].value) / currentReport[i - 1].value) * 100;
          }

          return (
            <div key={investmentId}>
              <h2>{investmentLabel}</h2>
              <h3>Rendimento total: R$ {rendimentoTotal.toLocaleString('pt')} ({porcentagem}%)</h3>

              <table>
                <tbody>
                  {currentReport.map(report => {
                    const { id, month, year, value, rendimento } = report;
                    return (
                      <tr key={id}>
                        <td>{month}/{year}</td>
                        <td>R$ {_.round(value, 2).toFixed(2)}</td>
                        <td>{_.round(rendimento, 2).toFixed(2)}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        })}
      </main>
    </>
  )
}

export default InvestmentsPage;
