import React from 'react'
import {Route,BrowserRouter,Redirect,Switch, withRouter} from 'react-router-dom'
import IndexCard from '../view/sign'
import LoginForm from "../components/index/LoginForm";
import RegisterForm from "../components/index/RegisterForm";
import Board from "../components/board";
import Index from "../view";
import '../static/style/sign.css';


class Router extends React.Component{
    constructor(props) {
        super(props);

    }

    render() {
        return (
           <BrowserRouter>
                <Switch>
                    <Route path={'/index'}>
                        <Index>
                            <Route path={'/index/:projectName/:api'} component={Board}/>
                        </Index>
                    </Route>
                    <Route path="/sign">
                        <IndexCard>
                            <Route exact path="/sign" component={LoginForm} />
                            <Route path="/sign/register" component={RegisterForm} />
                        </IndexCard>
                    </Route>
                    <Redirect from={'/'} to={'/index'} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Router
