import React, { useState } from 'react'
import { Card } from "antd";
import { Link, useRouteMatch, withRouter } from "react-router-dom";

function IndexCard(props) {
    const cate = window.location.pathname.includes('register') ? '注册' : '登陆';
    let match = useRouteMatch();

    function turnTo() {

        if(cate === '注册') props.history.push(`/sign`)
        else props.history.push(`/sign/register`)
    }
    return (
        <div className={ 'fxal fxct height100' } style={{
            'backgroundColor': '#f1f1f1'
        }}>
            <div className={'index__logo'}>Auto Swagger</div>
            <div
                className={ 'index' }
            >
                <div className={ 'index__header fxal fxct' }>
                    <h2 className={ `index__header__tab ${ cate === '注册' ? null : 'index__header__tab--active' }` } onClick={turnTo}>登陆</h2>
                    <span>·</span>
                    <h2 className={ `index__header__tab ${ cate === '注册' ? 'index__header__tab--active' : null }` } onClick={turnTo}>注册</h2>
                </div>
                { props.children }
            </div>
        </div>
    )
}


export default withRouter(IndexCard)
