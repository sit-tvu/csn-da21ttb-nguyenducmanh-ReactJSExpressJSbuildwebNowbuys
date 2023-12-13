
import { Routes, Route, BrowserRouter } from "react-router-dom";
import routers from "./router/router.js";

function App() {
  return (
    <div className="App dark">
      <BrowserRouter>
        <Routes>
            {
                routers.map((router, i) => {
                    return (
                        <Route
                            key={i}
                            path={router.path}
                            element={
                                <router.layout>
                                    <router.component></router.component>
                                </router.layout>
                            }
                            exact
                        ></Route>
                    )
                })
            }
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
