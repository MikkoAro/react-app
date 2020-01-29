import React, {useState, useEffect} from 'react';
import './App.css';
import Moment from 'react-moment';
import Chart from './components/Chart';
import lam from './images/LAM.PNG';

function App() {
  const url = "https://tie.digitraffic.fi/api/v1/data/tms-data/23922"
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState({})
  const [date, setDate] = useState('')
  const [data, setData] = useState([])

  useEffect(() => {
    setLoading(true)
    async function fetchData(url) {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        setOptions(parseData(json));
      } catch (error) {
        setError(true)
      }
    }
    fetchData(url);
  }, []);

  function parseData(data) {
    var date = data.tmsStations[0].measuredTime
    setDate(date)
    var parsedData = data.tmsStations[0].sensorValues
    setData(parsedData)
    return chartDetails(parsedData);
  }

  function chartDetails(data, destination) {
    if (destination === undefined) {
      const options = {
        labels: [],
        datasets: [{
          label: '',
          data: [],
          backgroundColor: [],
          borderColor: [],
          borderWidth: 1
        }]
      }
      setLoading(false)
      return options;
    }
    if (destination === "Jyväskylä") {
      const options = {
        labels: [
          ['Average speed (km/h)', '(5 min)'],
          ['Average speed (km/h)', '(60 min)'],
          ['Average speed (%)', '(5 min)', '(>90 traffic is fluent)'],
          ['Vehicle count (%) from maximum amount', '(60 min)']
        ],
        datasets: [{
          label: 'Jämsä - Jyväskylä',
          data: [data[12].sensorValue, data[2].sensorValue, data[14].sensorValue, data[7].sensorValue],
          backgroundColor: [
            'rgba(252, 214, 112, 1)',
            'rgba(252, 185, 65, 1)',
            'rgba(137, 196, 244, 1)',
            'rgba(75, 192, 192, 0.5)',
          ],
          borderColor: [
            'rgba(235, 149, 50, 1)',
            'rgba(235, 149, 50, 1)',
            'rgba(44, 130, 201, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1
        }]
      }
      setOptions(options)
      return options;
    }
    if (destination === "Jämsä") {
      const options = {
        labels: [
          ['Average speed (km/h)', '(5 min)'],
          ['Average speed (km/h)', '(60 min)'],
          ['Average speed (%)', '(5 min)', '(>90 traffic is fluent)'],
          ['Vehicle count (%) from maximum amount', '(60 min)']
        ],
        datasets: [{
          label: 'Jyväskylä - Jämsä',
          data: [data[13].sensorValue, data[3].sensorValue, data[15].sensorValue, data[9].sensorValue],
          backgroundColor: [
            'rgba(252, 214, 112, 1)',
            'rgba(252, 185, 65, 1)',
            'rgba(137, 196, 244, 1)',
            'rgba(75, 192, 192, 0.5)',
          ],
          borderColor: [
            'rgba(235, 149, 50, 1)',
            'rgba(235, 149, 50, 1)',
            'rgba(44, 130, 201, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1
        }]
      }
      setOptions(options)
      return options;
    }
  }

  function givenDestination(destination, props){
    chartDetails(data, destination)
  }

  if (error) return(<div className="error-message">Error occured while connecting to API</div>)
  if (loading) return(<div className="load-message">Loading...</div>)
  return (
    <div>
      <div className="chart" style={{ width: 1000, height: 600}}>
        <Moment date={date} />
        <Chart data={options}/>
      </div>
      <div className="cont" style={{ width: 1000, height: 600}}>
        <div className="button-container">
        <p>Destination:</p>
          <button onClick={(e) => givenDestination("Jyväskylä", e)}>Jyväskylä</button>
          <button onClick={(e) => givenDestination("Jämsä", e)}>Jämsä</button>
        </div>
        <div className="image-container">
          <img className="lam" src={lam} alt="TMS location" />
          <p>TMS-station location</p>
        </div>
      </div>
    </div>
  )
}

export default App;
