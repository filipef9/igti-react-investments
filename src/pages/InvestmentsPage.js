import { useState, useEffect } from "react";
import _ from 'lodash'
import apiReports from "../services/reportsService";

const InvestmentsPage = () => {

  const [reports, setReports] = useState([]);
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await apiReports.findAll();
        setReports(response);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchReports();
  }, []);

  return (
    <div>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            react-investments v1.0.1
          </h1>
        </div>
      </header>

      <main>
        {
          reports.map(({ id, fundName, rendimentoTotal, rendimentoPercentualTotal, incomes }) => {
            return (
              <div key={id}>
                <h2>{fundName}</h2>
                <h3>Rendimento total: R$ {rendimentoTotal.toLocaleString('pt')} ({rendimentoPercentualTotal}%)</h3>

                <table>
                  <tbody>
                    {incomes.map(({ id, month, year, value, rendimentoPercentual }) => {
                      return (
                        <tr key={id}>
                          <td>{month}/{year}</td>
                          <td>R$ {_.round(value, 2).toFixed(2)}</td>
                          <td>{_.round(rendimentoPercentual, 2).toFixed(2)}%</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            );
          })
        }
      </main>
    </div>
  )
}

export default InvestmentsPage;
