import React,{useState,useEffect} from 'react';
import Navbar from '../Index/Navbar';
import { NavLink,useNavigate } from 'react-router-dom';
import "./Dashboard.css";
import Nav from 'react-bootstrap/Nav';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { PacmanLoader } from 'react-spinners';

function TestWindow({ questions }) {

  console.log("questions",questions);
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Test Questions</h2>

      {questions.map((question, index) => (
        <div key={index}>
          <h3>{question.question}</h3>
          <ul>
            {question.options.map((option, optionIndex) => (
              <li key={optionIndex}>{option}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function Dashboard() {
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle starting the test
  useEffect(() => {
    navigate('/dashboard');
  }, [navigate]);
  const startTest = (test) => {
    setIsLoading(true)
    const questionsPromises = [];
    let url ="";
    if(test==='PnC'){
      url='https://aptitude-api.vercel.app/PermutationAndCombination';
    }
    if(test==='PnL'){
      url='https://aptitude-api.vercel.app/ProfitAndLoss';
    }
    if(test==='PnCisterns'){
      url='https://aptitude-api.vercel.app/Random';
    }
    if(test==="STD"){
      url='https://aptitude-api.vercel.app/SpeedTimeDistance';
    }
    if(test==="SI"){
      url='https://aptitude-api.vercel.app/SimpleInterest';

    }
    if(test==="MnA"){
      url='https://aptitude-api.vercel.app/MixtureAndAlligation';

    }

    // Fetch questions 15 times
    for (let i = 0; i < 15; i++) {
      questionsPromises.push(axios.get(url));
    }

    // Once all promises are resolved, accumulate questions into an array
    Promise.all(questionsPromises)
      .then(responses => {
        const questionsArray = responses.map(response => response.data);
        console.log(questionsArray);
        setIsLoading(false);

        // Navigate to the test route with questions data as props
        navigate('/test', { state: { questions: questionsArray } });
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
        setIsLoading(false);
      });
  };

  return (
    <>
     <Navbar />
      {isLoading && (
        <div className="spinner-overlay">
          <div className="spinner-container">
            <PacmanLoader color="#007bff" size={25} />
          </div>
        </div>
      )}
      <Container fluid className='mt-2'>
        <img src="https://i.ibb.co/zxS8R0D/apti.png" style={{height:'32rem',width:'100%'}}></img>
      </Container>

      
      
      <Container fluid className="mt-3 mb-3">
        <h2>Aptitude Tests</h2>
        <Row style={{ display: 'flex', justifyContent: 'space-around'}}>
          <Col md={4} lg={4}>
            <Card style={{ border: '1px solid #dee2e6', borderRadius: '10px', width: '300px', height:'400px', boxShadow:'0px 0px 10px 0px rgba(0,0,0,0.4)'}}>
              <Card.Img variant="top" src="https://e-gmat.com/blogs/wp-content/uploads/2018/04/PNC_FrontPage500x240_V1.png" style={{ border: '1px solid #dee2e6', borderRadius: '10px', width: '300px', height:'200px' }}/>
              <Card.Body>
                <Card.Title><b><i>Permutation and Combination</i></b></Card.Title>
                <Card.Text>
                  This test is to check your understanding of permutations and combinations in the context of a coding problem.
                </Card.Text>
                
                <Button variant="primary" className="btn"onClick={() => startTest('PnC')}>Start Test</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} lg={4}>
            <Card style={{ border: '1px solid #dee2e6', borderRadius: '10px',width: '300px', height:'400px', boxShadow:'0px 0px 10px 0px rgba(0,0,0,0.4)'}}>
              <Card.Img variant="top" src="https://media.licdn.com/dms/image/C5612AQGEe1yNLfgHsw/article-cover_image-shrink_720_1280/0/1621631465746?e=2147483647&v=beta&t=8IlRSGnhfit-97Q88Ob9P3c9aPMAHoR7Y_IO6RJos6U" style={{ border: '1px solid #dee2e6', borderRadius: '10px', width: '300px', height:'200px' }}/>
              <Card.Body>
                <Card.Title><b><i>Profit and Loss</i></b></Card.Title>
                <Card.Text>
                  This test  will assess your ability to understand financial concepts, including profit and loss statements\.
                </Card.Text>
                <Button variant="primary"className="btn"onClick={() => startTest('PnL')}>Start Test</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} lg={4}>
            <Card style={{ border: '1px solid #dee2e6', borderRadius: '10px',width: '300px', height:'400px' ,boxShadow:'0px 0px 10px 0px rgba(0,0,0,0.4)'}}>
              <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8BeUSLAHm2ycxQz5NTN57VUUVEducWHS5yQ&usqp=CAU" style={{ border: '1px solid #dee2e6', borderRadius: '10px', width: '300px', height:'200px' }}/>
              <Card.Body>
                <Card.Title><b><i>Pipes and Cisterns</i></b></Card.Title>
                <Card.Text>
                  This test will  test you knowledge regarding Pipes and Cisterns
                </Card.Text>
                <Button variant="primary" className="btn"onClick={() => startTest('PnCisterns')}>Start Test</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
       
      </Container>
      <Container fluid  className='mt-3 mb-3'  style={{marginTop:'40px'}}>
      <Row style={{ display: 'flex', justifyContent: 'space-around'}} >
          <Col md={4} lg={4}>
            <Card style={{ border: '1px solid #dee2e6', borderRadius: '10px', width: '300px', height:'400px',boxShadow:'0px 0px 10px 0px rgba(0,0,0,0.4)' }}>
              <Card.Img variant="top" src="https://media.geeksforgeeks.org/wp-content/uploads/20230727174240/Speed-Time-Distance-Formula-2-(1).png" style={{ border: '1px solid #dee2e6', borderRadius: '10px', width: '300px', height:'200px' }}/>
              <Card.Body>
                <Card.Title><b><i>Speed Time Distance</i></b></Card.Title>
                <Card.Text>
                  This test will assses you abilities to solve Speed Time Distance problems.
                </Card.Text>
                
                <Button variant="primary" className="btn"onClick={() => startTest('STD')}>Start Test</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} lg={4}>
            <Card style={{ border: '1px solid #dee2e6', borderRadius: '10px',width: '300px', height:'400px',boxShadow:'0px 0px 10px 0px rgba(0,0,0,0.4)' }}>
              <Card.Img variant="top" src="https://www.splashlearn.com/math-vocabulary/wp-content/uploads/2023/08/simple-interest-feature-image.png" style={{ border: '1px solid #dee2e6', borderRadius: '10px', width: '300px', height:'200px' }}/>
              <Card.Body>
                <Card.Title><b><i>Simple Interest</i></b></Card.Title>
                <Card.Text>
                  This test will assess you knowledge  of Simple Interest calculations.
                </Card.Text>
                <Button variant="primary"className="btn"onClick={() => startTest('SI')}>Start Test</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} lg={4}>
            <Card style={{ border: '1px solid #dee2e6', borderRadius: '10px',width: '300px', height:'400px',boxShadow:'0px 0px 10px 0px rgba(0,0,0,0.4)' }}>
              <Card.Img variant="top" src="https://examsbook.co.in/img/post/large/ix9VMixture-and-Alligation-Problems-with-Solutions.webp" style={{ border: '1px solid #dee2e6', borderRadius: '10px', width: '300px', height:'200px' }}/>
              <Card.Body>
                <Card.Title><b><i>Mixture and Alligation</i></b></Card.Title>
                <Card.Text>
                  This test  is a mixture of Mixtures, Allocation and Measurements.
                </Card.Text>
                <Button variant="primary" className="btn"onClick={() => startTest('MnA')}>Start Test</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
