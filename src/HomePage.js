import React from 'react';
import App from "./components/App/App";
import Contact from './components/Contact/Contact'
import Menu from './components/Menu/Menu'

export default function HomePage() {
    const [page, setPage] = React.useState("app");
    const selectedComponent = page ==="contact"? <Contact />: <App />;

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