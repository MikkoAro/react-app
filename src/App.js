import React, {useState, useEffect} from 'react';
import './App.css';
import Moment from 'react-moment';
import Chart from './components/Chart'

function App() {
  const url = "https://tie.digitraffic.fi/api/v1/data/tms-data/23922"
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState({})
  const [percentage, setpercentage] = useState(1);
  const [date, setDate] = useState('')
  
  useEffect(() => {
    setLoading(true)
      async function fetchData(url){
        try {
          const response = await fetch(url);
          const json = await response.json();
          setOptions(parseData(json));
          setLoading(false)
        }
        catch(error) {
          setError(true)
        }
      } 
    fetchData(url);
  }, []);

   function parseData(data){
    var date = data.tmsStations[0].measuredTime
    setDate(date)
    var parsedData = data.tmsStations[0].sensorValues
    return chartDetails(parsedData);
  }

  function chartDetails(data) {
    //setpercentage(80);
    const options = {
      labels: [data[12].name, data[13].name, data[14].name, data[15].name],
      datasets:[{
        label: 'Jyväskylä - Jämsä',
        data: [data[12].sensorValue, data[13].sensorValue, data[14].sensorValue, data[15].sensorValue, 9],
        backgroundColor: [
          'rgba(255, 70, 100, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
      }]
    }

    return options;
  }

  if (error) return(<div style={{color: 'red'}}>Error occured while connecting to API</div>)
  if (loading) return(<div style={{color:'blue'}}>Loading...</div>)
  return (
    <div className="Chart">
      <div>
        <Moment date={date} />
        <Chart data={options}/>
      </div>
    </div>
  )
}

export default App;
