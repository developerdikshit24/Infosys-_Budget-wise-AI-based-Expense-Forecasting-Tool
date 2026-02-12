import React from 'react'
import { Outlet } from 'react-router'
import PredictionLayout from '../components/PredictionLayout'

const RightLayout = () => {
    return (
        <>
            <Outlet />
            <PredictionLayout />
        </>
    )
}

export default RightLayout