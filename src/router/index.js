import React from 'react'
import {Route,BrowserRouter,Redirect,Switch, withRouter, useRouteMatch} from 'react-router-dom'
import IndexCard from '../view/sign'
import LoginForm from "../components/index/LoginForm";
import RegisterForm from "../components/index/RegisterForm";
import Board from "../components/board";
import Index from "../view";
import '../static/style/sign.css';
import Test from "../view/test";
import UserIndex from "../view/user";
import CreateBoard from "../view/create";
import Store from '../store/index'
import NotFound from "../view/notfound";
import UserOwnedIndex from "../view/ownedIndex";

class Router extends React.Component{
    constructor(props) {
        super(props);
    }

    static async checkLogin(){
        const pathname = window.location.pathname
        if(pathname !== '/sign') {
            const res = await window.server.get('/api/user/islogined')
            if(res){
                Store.dispatch({ type: 'SET', value: res.user })
            }
        }
        console.log(Store.getState())
    }

    render() {
        Router.checkLogin()
        console.log('yes')
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/sign">
                        <IndexCard>
                            <Route exact path="/sign" component={LoginForm} />
                            <Route exact path="/sign/register" component={RegisterForm} />
                        </IndexCard>
                    </Route>
                    <Route exact path={'/index'}>
                        <UserOwnedIndex/>
                    </Route>
                    <Route path={'/index/:projectName/:api'}>
                        <Index>
                            <Board/>
                        </Index>
                    </Route>
                    <Route exact path='/test'>
                        <Test/>
                    </Route>
                    <Route exact path='/user'>
                        <UserIndex/>
                    </Route>
                    <Route exact path='/create'>
                        <CreateBoard/>
                    </Route>
                    <Redirect exact from={'/'} to={'/user'} />
                    <Route path={'/notfound'}>
                        <NotFound/>
                    </Route>
                    <Redirect to={'/notfound'} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Router
