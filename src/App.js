import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from './components/Card';
import arrow from './assets/arrow.png';
import Popup from './components/Popup';
import ExpenseCard from './components/ExpenseCard';

function App() {

  const [data, setData] = useState([]);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [iti, setIti] = useState(null);
  const [ind, setInd] = useState(-1);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [description, setDesc] = useState("");
  const [amount, setAmount] = useState(null);
  const [category, setCat] = useState('Hotel');
  const [totalExp, setTotalExp] = useState(0);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  function handleSubmit() {
    handleShow1();
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
    // axios.post('https://d2c5f7c5-ce16-4d89-b9d1-da6d5c935925.mock.pstmn.io/iti', req).then(resp => {
      setIti(resp.data);
    })
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(printPos);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000); // Set timeout to 10 seconds

    function handleData(json) {
      let final = data;
      console.log(final);
      let names = [];
      final.forEach(obj => names.push(obj['place']))
      json.forEach(obj => {
        if (names.indexOf(json['place']) == -1) {
          final.push(obj);
        }
      })
      console.log(final);
      setData(final);
    }

    function printPos(position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
      fetch(`https://nipuntopno.pythonanywhere.com/api/fetch-places?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`, controller.signal)
      // fetch(`https://d436677d-31d1-4bf2-862e-8a32f0760796.mock.pstmn.io/data`, controller.signal)
        .then((response) => response.json())
        .then((json) => setData(json));
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

  function addExpense(event) {
    console.log(category);
    console.log(description);
    console.log(amount);
    if(category==null || amount==0 || description=='') return;
    let exp = {"desc": description, "cat": category, "amount": amount};
    let temp = expenses;
    temp.push(exp);
    setExpenses(temp);
    setDesc('');
    setAmount(0);
    let sum = 0;
    temp.forEach(obj => {
      sum = +sum + +obj['amount'];
    })
    setTotalExp(sum);
  }

  function handleDesc(event) {
    setDesc(event.target.value);
  }
  function handleCat(event) {
    setCat(event.target.value);
  }
  function handleAmount(event) {
    setAmount(event.target.value);
  }

  function deleteExp(ind){
    if(expenses.length == 1){
      setExpenses([]);
      setTotalExp(0);
      return;
    }
    console.log(`delete ${ind}`);
    let temp = expenses;
    let final = [];
    let sum = 0;
    expenses.forEach((obj,i) => {
      if(i!=ind){
        final.push(obj);
        sum = +sum + +obj['amount'];
      }
    });
    setExpenses(final);
    setTotalExp(sum);
  }

  function reloadSum(){
    let sum = 0;
    expenses.forEach(obj => {
      sum = +sum + +obj['amount'];
    });
    setTotalExp(sum);
  }

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
                  <div style={i == ind ? { height: '-webkit-fit-content' } : { height: "0px" }} className="tw-rounded-md panel tw-py-0 tw-px-[18px] tw-bg-white tw-overflow-hidden tw-text-center md:tw-flex md:tw-text-left">
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
            <Button variant="success" onClick={handleShow2}>Expenses</Button>
          </div></>)}

      </div>

      <Popup />

      <Modal show={show1} onHide={handleClose1}>
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
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className='tw-m-3'>
              <label className='tw-mr-2' for="Description">Description:</label>
              <input className='tw-border-black tw-rounded-2' onChange={handleDesc} value={description} name="Description" type="text" />
            </div>
            <div className='tw-m-3'>
              <label className='tw-mr-2' for="category">Choose a category:</label>
              <select className='tw-border-black tw-rounded-2' onChange={handleCat} value={category} name="category" id="category">
                <option value="Hotel">Hotel</option>
                <option value="Food">Food</option>
              </select>
            </div>
            <div className='tw-m-3'>
              <label className='tw-mr-2' for="Amount">Amount:</label>
              <input className='tw-outline-2' onChange={handleAmount} value={amount} name="Amount" type="number" />
            </div>
          </form>
          <Button variant='success' onClick={addExpense}>Add Expense</Button>
          <h4>Expenses:</h4>
          <div>
            {expenses.map((obj,i) => {
              return <ExpenseCard description={obj['desc']} category={obj['cat']} amount={obj['amount']} deleteFunc={deleteExp} ind={i} />;
            })}
          </div>
            <div>
              Total expenditure: {totalExp}
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
