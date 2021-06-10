import axios from 'axios';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import './App.css';

const apiUrl = 'https://3001-fuchsia-marmoset-9a7eyuy0.ws-us08.gitpod.io';

const App = () => {

  const [investments, setInvestments] = useState([]);
  const [reports, setReports] = useState([]);
  const [reportsGroupByInvestment, setReportsGroupByInvestment] = useState({});

  useEffect(() => {

    const fetchInvestments = async () => {
      try {
        const response = await axios.get(`${apiUrl}/investments`);
        setInvestments(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchReports = async () => {
      try {
        const response = await axios.get(`${apiUrl}/reports`);
        setReports(response.data);

        const groupedBy = _(reports)
          .groupBy('investmentId')
          .value();
        //console.log('groupedBy: ' + JSON.stringify(groupedBy));
        setReportsGroupByInvestment(groupedBy);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchInvestments();
    fetchReports();
  }, []);

  // groupBy reports by investmentId

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
  );
}

export default App;
