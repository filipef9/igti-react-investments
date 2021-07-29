import { useState, useEffect } from "react";
import apiReports from "../services/reportsService";
import Report from "../components/Report";
import Income from "../components/Income";

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
    <>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            react-investments v1.0.1
          </h1>
        </div>
      </header>

      <main className="container mx-auto p-4">
        {
          reports.map(({ id, fundName, rendimentoTotal, rendimentoPercentualTotal, incomes }) => {
            return (
              <Report
                key={id}
                fundName={fundName}
                rendimentoTotal={rendimentoTotal}
                rendimentoPercentualTotal={rendimentoPercentualTotal}
              >
                {incomes.map(income => (<Income key={income.id} income={income} />))}
              </Report>
            );
          })
        }
      </main>
    </>
  )
}

export default InvestmentsPage;
