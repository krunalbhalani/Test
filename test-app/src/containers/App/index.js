import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import FormDetail from '../FormDetail'

const App = () => (
    <Router>
        <Route exact path="/" component={FormDetail} />
    </Router>
);

export default App;
