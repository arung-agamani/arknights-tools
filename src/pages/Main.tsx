import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components';

const Main = () => {
    return (
        <Wrapper>
            <img src="https://files.howlingmoon.dev/warf/closure-banner.jpg" alt="" />
            <h1 className="text-6xl text-center mt-8">Arknights Data Explorer</h1>
            <p className="text-sm text-center mb-4 mt-4 text-gray-400">Based from Dimbreath's ArknightsData repository</p>
            <div className="container mx-auto">
                <h2 className="text-xl my-4">Available Menus</h2>
                <div className="flex">
                    <Link to="/operators">
                        <div className="px-4 py-4 bg-ak-panel">
                            <p className="text-4xl">Operator List</p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="py-48"></div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background-color: #242221;
    .bg-ak-panel {
        background-color: #36322f;
    }
    .bg-ak-panel:hover {
        background-color: #47413b;
    }
`;

export default Main
