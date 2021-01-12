import React, {Suspense, lazy} from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Layout} from "antd";
import MainPage from "./Components/pages/MainPage";
import {PageQueriesProvider} from "./store/pageQueries";
const BeerPage = lazy(()=> import('./Components/pages/BeerPage'))

const App = () => {
    return (
        <div className="App">
            <Layout style={{minHeight: '100vh'}}>
                <Router>
                    <Suspense fallback={<div>...Loading</div>}>
                        <Switch>
                            <PageQueriesProvider>
                                <Route exact path="/" component={MainPage}/>
                                <Route path="/beer/:id" component={BeerPage}/>
                            </PageQueriesProvider>
                        </Switch>
                    </Suspense>
                </Router>
            </Layout>
        </div>
    );
}

export default App;
