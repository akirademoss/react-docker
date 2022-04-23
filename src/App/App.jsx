import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import  HomePage  from '../HomePage/HomePage';
import  HomePrivate  from '../HomePrivate/HomePrivate';
import ProfilePage from '../ProfilePage/ProfilePage';
import ProfilePagePublic from '../ProfilePagePublic/ProfilePagePublic';
import EditProfile from '../EditProfile/EditProfile';


//import { HomePage } from '../HomePage';
import  LoginPage  from '../LoginPage/LoginPage';
import  RegisterPage  from '../RegisterPage/RegisterPage';
//import { RegisterPage } from '../RegisterPage';
import CreateAccount from '../pages/CreateAccount'

class App extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            this.props.clearAlerts();
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <Switch>
                               {/* <PrivateRoute exact path="/:username/home" component={HomePrivate} /> */}

                                <PrivateRoute exact path="/:username/home" component={HomePrivate} />
                                <Route path="/:username/profile" component={(props) => <ProfilePage username={props.match.params.username}/>} />
                                <PrivateRoute exact path="/:username/edit" component={EditProfile} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                                <Route path="/:username/user" component={(props) => <ProfilePagePublic username={props.match.params.username}/>} />
                                <Route path="/" component={HomePage} />

                                

                                <Redirect from="*" to="/" />
                            </Switch>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return { alert };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapStateToProps, actionCreators)(App);
export { connectedApp as App };
export default App;