import React, {useRef} from 'react';
import {CSSTransition, SwitchTransition, TransitionGroup} from "react-transition-group";
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import {InfoRoutes} from "./index";
const Routs = () => {

    const location = useLocation();
    const nodeRef = useRef(null);

    return (
        <TransitionGroup>
            <SwitchTransition mode={'out-in'}>
                <CSSTransition
                    key={location.key}
                    classNames="fade"
                    timeout={300}
                    nodeRef={nodeRef}
                >
                    <div ref={nodeRef}>
                        <Routes location={location}>
                            {InfoRoutes.map((route, index) => (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={route.element}
                                />
                            ))}
                            <Route path="*" element={<Navigate to="/" replace/>}/>
                        </Routes>
                    </div>
                </CSSTransition>
            </SwitchTransition>
        </TransitionGroup>
    );
};

export default Routs;