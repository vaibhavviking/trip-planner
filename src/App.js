import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from './components/Card';
import arrow from './assets/arrow.png';

function App() {

  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [iti, setIti] = useState(null);
  const [ind, setInd] = useState(-1);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleSubmit() {
    handleShow();
    setIti('Loading......');
    let req = {};
    req['places'] = [];
    req['latitude'] = lat;
    req['longitude'] = long;
    let check = document.getElementsByClassName('checks');
    let i;
    for (i = 0; i < check.length; i++) {
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
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
      fetch(`https://nipuntopno.pythonanywhere.com/api/fetch-places?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`, controller.signal)
        .then((response) => response.json())
        .then((json) => { if (data.length == 0) setData(json) });
      console.log('fetching');
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
        {data.length == 0 ? (<>Loading.....</>) : (<>
          <div className='projects'>
            <div>
              {data.map((obj, i) => {

                return <div className="punit tw-mx-0 tw-my-8" >
                  <div className="tw-flex">
                    <button onClick={() => handle(i)} className="accordion tw-rounded-lg">{obj['place']}</button>
                    <input className='tw-scale-150 tw-mx-5 checks' value={obj['place']} type="checkbox" />
                  </div>
                  <div style={i == ind ? { height: '-webkit-fit-content' } : { height: "0px" }} className="panel tw-py-0 tw-px-[18px] tw-bg-white tw-overflow-hidden tw-text-center md:tw-flex md:tw-text-left">
                    <div className="pimg tw-max-w-[400px] tw-my-5 tw-mx-auto">
                      <img className="tw-w-[100%]" src={obj['img_url']} />
                    </div>
                    <div className="tw-p-[2%] md:tw-max-w-[60%] tw-mx-auto">
                      <p>{obj['description']}</p>
                      <p>Opening time: {obj['opens']}</p>
                      <p>Closing time: {obj['closes']}</p>
                      <p>Distance from you: {obj['distance']}</p>
                      <p>Time needed to explore: {obj['time_spent']}</p>
                      <p>Estimated expenditure: {obj['expenditure']}</p>
                    </div>
                  </div>
                </div>
              })}
            </div>
          </div><div>
          <Button variant="success" onClick={handleSubmit}>Create itinerary</Button>
        </div></>)}

      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {iti == null ? (<form>
            {
              data.map(obj => {
                return (<><input type="checkbox" className='checks' value={obj['place']} name={obj['place']} />
                  <label className='tw-ml-1' for={obj['place']}>{obj['place']}</label><br /></>
                );
              })
            }
          </form>) : ((iti == 'Loading......') ? (iti) : iti.map((obj, i) => {
            return <><Card to={obj['to']} fare={obj['fare_to_explore']} timeToExplore={obj['time_to_explore']} />{i == iti.length - 1 ? <></> : <div><img className='tw-m-auto' style={{ width: "5%" }} src={arrow} /></div>}</>
          }))
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
