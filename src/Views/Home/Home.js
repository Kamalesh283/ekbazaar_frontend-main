import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const nav = useNavigate()
    return (
        <>
            <div>Home</div>
            <button onClick={() =>nav('/test')}>Click</button>
        </>
    )
}

export default Home