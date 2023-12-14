import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function App() {

  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [iti, setIti] = useState();
  const [ind, setInd] = useState(-1);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setIti(null);
    setShow(true);
  }

  navigator.geolocation.getCurrentPosition(printPos);

  function printPos(position) {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
  }

  function handleSubmit() {
    let req = {};
    req['places'] = [];
    req['time'] = document.getElementById('timeLeft').value;
    let check = document.getElementsByClassName('checks');
    let i;
    for (i = 0; i < check.length; i++) {
      console.log(check[i].checked);
      if (check[i].checked == true) {
        req['places'].push(check[i].value);
      }
    }
    console.log(req);
    axios.post('https://nipuntopno.pythonanywhere.com/api/plan-trip', req).then(resp => {
      setIti(resp.data);
    })
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(printPos);
    const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000); // Set timeout to 10 seconds


    function printPos(position) {
      fetch(`https://nipuntopno.pythonanywhere.com/api/fetch-places?latitude=${position.coords.latitude}9&longitude=${position.coords.longitude}`, controller.signal)
        .then((response) => response.json())
        .then((json) => setData(json));
    }
  }, [])

  const handle = (i) => {
    if (i == ind) {
      setInd(-1);
    } else {
      setInd(i);
    }
  }

  console.log(data);

  return (
    <>
      <div className="App tw-text-center tw-w-[100%] tw-min-h-[100vh] tw-bg-city-light tw-bg-center tw-bg-cover tw-bg-no-repeat
    tw-p-8">
        <div>
          <button onClick={handleShow}>Create itinerary</button>
        </div>
        <div className='projects'>
          <div>
            {data.map((obj, i) => {

              return <div className="punit tw-mx-0 tw-my-8" >
                <button onClick={() => handle(i)} className="accordion tw-rounded-lg">{obj['place']}</button>
                <div style={i == ind ? { height: '-webkit-fit-content' } : { height: "0px" }} className="panel tw-py-0 tw-px-[18px] tw-bg-white tw-overflow-hidden tw-text-center md:tw-flex md:tw-text-left">
                  <div className="pimg tw-max-w-[400px] tw-my-5 tw-mx-auto">
                    <img className="tw-w-[100%]" src={obj['img_url']} />
                  </div>
                  <div className="tw-p-[2%] md:tw-max-w-[60%] tw-mx-auto">
                    <p>{obj['description']}</p>
                    <p>Opening time: {obj['open']}</p>
                    <p>Closing time: {obj['close']}</p>
                    <p>Distance from you: {obj['distance']}</p>
                    <p>Time needed to explore: {obj['time']}</p>
                    <p>Estimated expenditure: {obj['expenditure']}</p>
                  </div>
                </div>
              </div>
            })}
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            {
              data.map(obj => {
                return (<><input type="checkbox" className='checks' value={obj['place']} name={obj['place']} />
                  <label className='tw-ml-1' for={obj['place']}>{obj['place']}</label><br /></>
                );
              })
            }
            <label className='tw-mr-2' for="timeLeft">Time Available for travel:</label>
            <input required="true" type="text" id="timeLeft" name="timeLeft" placeholder='time in hours' />
          </form>
          {iti && JSON.stringify(iti)}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Create itinerary
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
