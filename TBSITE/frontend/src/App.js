import React from 'react';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import Main from './pages/MainPage';
import Pacient from './pages/PacientPage';
import Professional from './pages/ProfessionalPage';
import Unity from './pages/UnityPage';
import Profile from './pages/Profile';
import editProfile from './pages/EditPage';
import { HashRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import EstatisticasPage from './pages/EstatisticasPage';
import EstatisticasMunicipioPage from './pages/EstatisticasMunicipioPage';
import EstatisticasDistritoPage from './pages/EstatisticasDistritoPage';
import dist_estat from './pages/EstatisticasDistritoPage/dist_estat';
import Estatisticas_norte from './pages/EstatisticasDistritoPage/estatisticas_norte';
import Estatisticas_sul from './pages/EstatisticasDistritoPage/estatisticas_sul';
import Estatisticas_leste from './pages/EstatisticasDistritoPage/estatisticas_leste';
import Estatisticas_oeste from './pages/EstatisticasDistritoPage/estatisticas_oeste';
import Estatisticas_rural from './pages/EstatisticasDistritoPage/estatisticas_rural';
import Profissional from './pages/ProfessionalPage';

function App() {
  return (
      <HashRouter>
        <Switch>
          <Route path="/home" exact={true} component={Main}></Route>
          <Route path="/" exact={true} component={Login}></Route>
          <Route path="/profile" exact={true} component={Profile}></Route>
          <Route path="/editProfile" exact={true} component={editProfile}></Route>
          <Route path="/professional" exact={true} component={Professional}></Route>
          <Route path="/pacient" exact={true} component={Pacient}></Route>
          <Route path="/unity" exact={true} component={Unity}></Route>
          <Route path="/estatisticas/:id" exact={true} component={EstatisticasPage}></Route>
          <Route path="/estatisticasMunicipio" exact={true} component={EstatisticasMunicipioPage}></Route>
          <Route path="/estatisticasDistrito" exact={true} component={EstatisticasDistritoPage}></Route>
          <Route path="/register" exact={true} component={Register}></Route>
          <Route path="/dist_estat" exact={true} component={dist_estat}></Route>
          <Route path="/estatisticas_norte" exact={true} component={Estatisticas_norte}></Route>
          <Route path="/estatisticas_sul" exact={true} component={Estatisticas_sul}></Route>
          <Route path="/estatisticas_leste" exact={true} component={Estatisticas_leste}></Route>
          <Route path="/estatisticas_oeste" exact={true} component={Estatisticas_oeste}></Route>
          <Route path="/estatisticas_rural" exact={true} component={Estatisticas_rural}></Route>
          <Route path="/profissional" exact={true} component={Profissional}></Route>


        </Switch>
      </HashRouter>
  );
}

export default App;
