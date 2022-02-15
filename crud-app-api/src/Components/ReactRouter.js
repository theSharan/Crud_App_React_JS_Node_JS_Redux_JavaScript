import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../HomePage/Home';
import AboutUs from '../HomePage/AboutUs';
import { NavLink } from 'react-router-dom';
import InError from './InError';


function ReactRouter() {
  return (
    <>
    <Routes>
        <Route path='/home' element={<Home/>} />
        <Route path='/aboutus' element={<AboutUs/>} />
        <Route path="*" element={<InError />} />
    </Routes>
    </>
    )
}
export default ReactRouter;
