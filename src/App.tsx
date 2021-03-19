import Left from './components/Left/left';
import Right from './components/Right/right';
import { Row, Col } from 'antd'
import './App.scss'
// import 'antd/dist/antd.css'




function App() {

  return (
    <div className="App">
      <Row>
        <Col span={6}>
          <Left />
        </Col>

        <Col span={18}>
          <Right />
        </Col>
      </Row>


    </div>
  );
}

export default App;
