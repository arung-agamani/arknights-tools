import React, { lazy } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useLocation, Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import './styles/skills.css'

const Operators = lazy(() => import('./pages/Operators'));
const OperatorDetail = lazy(() => import('./pages/OperatorDetail'));

const Content: React.FC = () => {
    const location = useLocation()
    return (
        <TransitionGroup>
            <CSSTransition
                timeout={1000}
                key={location.key}
                classNames="page"
                unmountOnExit
                mountOnEnter
                appear
            >
                <Switch location={location}>
                    <Route exact path="/">
                        <Main />
                    </Route>
                    <Route exact path="/operators">
                        <Operators />
                    </Route>
                    <Route exact path="/operator/:charId">
                        <OperatorDetail />
                    </Route>
                </Switch>
            </CSSTransition>
        </TransitionGroup>
        
    )
}

export default Content
