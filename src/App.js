import React from 'react';
import Home from "./components/Home/Home";
import Contact from './components/Contact/Contact'
import Menu from './components/Menu/Menu'

export default function App() {
    const [page, setPage] = React.useState("app");
    const selectedComponent = page ==="contact"? <Contact />: <Home />;

    function changePage(newPage) {
        setPage(newPage);
    }

    return(
        <div className="HomePage">
            <Menu changePage = {changePage}/>
            {selectedComponent}
        </div>
    )
}