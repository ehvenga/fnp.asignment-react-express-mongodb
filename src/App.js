import './App.scss';
import { Switch, Route } from 'react-router-dom'
import Layout from './containers/Layout';
import routes from './routes';

const App = () => {
  return (
    <Layout>
      <Switch>
        {
          routes.map((route, idx) => {
            return(
              <Route key={idx} {...route} />
            )
          })
        }
      </Switch>
    </Layout>
  )
}

export default App;
