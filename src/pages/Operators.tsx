import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from '../utils/axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import styled from 'styled-components';
import { BeatLoader } from 'react-spinners';

const Operators = () => {
    const [operatorList, setOperatorList] = useState<Array<any>>([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        (async() => {
            try {
                const cache = sessionStorage.getItem('operatorList')
                if (cache) {
                    const data = JSON.parse(cache);
                    setOperatorList(data);
                    setLoading(false);
                } else {
                    const { data } = await axios.get('/ak/operators')
                    setOperatorList(data.data);
                    sessionStorage.setItem('operatorList', JSON.stringify(data.data))
                    setLoading(false);
                }
            } catch (error) {
                console.log('Error on fetching data');
            }
        })()
    }, [])
    if (loading) return (
        <Wrapper className="container flex flex-col justify-center items-center">
            <h1 className="text-6xl my-4">Operators List</h1>
            <div className="h-screen"></div>
        </Wrapper>
    );
    return (
        <Wrapper className="container flex flex-col justify-center items-center">
            <h1 className="text-6xl my-4 text-center">Operators List</h1>
            <div className="w-1/2 text-center">
                {operatorList.length && operatorList.filter(x => x.char_id.startsWith('char')).map(op => {
                    return (
                        <Link to={`/operator/${op.char_id}`}>
                            <div className="flex bg-ak-panel hover:bg-gray-400 hover:cursor-pointer border-2 border-b-0 border-yellow-900">
                                <div className="flex-grow px-3 text-3xl self-center">{op.name}</div>
                                
                                    <LazyLoadImage
                                        placeholder={<BeatLoader color="#FFFFFF"/>}
                                        className="border-l-2 border-yellow-900 self-center"
                                        height={100}
                                        width={100}
                                        effect="opacity"
                                        src={`https://ark-files-bucket.s3.ap-southeast-1.amazonaws.com/img/avatars/${op.char_id}.png`}
                                    />
                            </div>
                        </Link>
                    )
                })}
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background-color: #242221;
    * {
        box-sizing: content-box;
    }
    .bg-ak-panel {
        background-color: #36322f;
    }
    .bg-ak-panel:hover {
        background-color: #47413b;
    }
`;

export default Operators
