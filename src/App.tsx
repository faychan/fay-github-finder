import React from 'react';
import { Dashboard, Error } from './pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export const App:React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Dashboard></Dashboard>}></Route>
                <Route path='*' element={<Error></Error>}></Route>
            </Routes>
        </BrowserRouter>
    );
}
