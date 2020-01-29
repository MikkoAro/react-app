# React-demo  

## API  

There are over 450 TMS-stations in the Finnish read network. TMS-stations contain sensors that collect computational data from traffic. [Digitraffic.fi](https://www.digitraffic.fi/) offers open data about Finnish road-, railway- and marine traffic. API gives data in JSON-format, direct link to data is [here](https://tie.digitraffic.fi/api/v3/metadata/tms-stations).  

## Application  

Application fetches current traffic data from TMS-station located on the south side of Muurame (coordinates: 62.095101405389734, 25.628549623379794). My parents-in-law lives in Jämsä, due this, our red Toyota Corolla often heads into the south. With the TMS data I am trying to answer the eternal question "Who's drivin?". If TMS-station indicates that traffic is jamming – perhaps it's my turn to relax. If there's barely any traffic, I can volunteer to drive and enjoy the empty roads.  

Application show bar chart with following data:  

* The average speed from the last five minutes.  

* The average speed from the given 60 minutes time period.  

* The average speed percentage of the road free flow speed from the last five minutes.

  * Over 90: Traffic is fluent.

  * 75-90: Traffic is platooning.

  * 25-70: Traffic is slow.

  * 10-25: Traffic is queuing.

  * 0-10: Traffic is stationary

* Percentage of vehicles passed during the fixed 60 minutes time window from the maximum amount of vehicles per hour

## Link to application: [AWS](https://master.d35z111uzqmebq.amplifyapp.com/)  
