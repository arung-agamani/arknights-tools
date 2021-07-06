import React, { useEffect, useState, memo } from 'react'
import { Link } from 'react-router-dom';
import axios from '../utils/axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import styled from 'styled-components';
import { BeatLoader } from 'react-spinners';
import Fuse from 'fuse.js';
import { areEqual, FixedSizeList as ListWindow } from 'react-window';

interface OperatorListItem {
    name: string;
    char_id: string;
}

const fuseOption: Fuse.IFuseOptions<OperatorListItem> = {
    keys: ['name'],
    findAllMatches: true,
}

const fuse = new Fuse<OperatorListItem>([], fuseOption);

/* Function for getting the scrollbar width */
function getScrollBarWidth () {
    var inner = document.createElement('p');
    inner.style.width = "100%";
    inner.style.height = "200px";
  
    var outer = document.createElement('div');
    outer.style.position = "absolute";
    outer.style.top = "0px";
    outer.style.left = "0px";
    outer.style.visibility = "hidden";
    outer.style.width = "200px";
    outer.style.height = "150px";
    outer.style.overflow = "hidden";
    outer.appendChild (inner);
  
    document.body.appendChild (outer);
    var w1 = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    var w2 = inner.offsetWidth;
    if (w1 === w2) w2 = outer.clientWidth;
  
    document.body.removeChild (outer);
  
    return (w1 - w2);
  };

const Operators = () => {
    const [operatorList, setOperatorList] = useState<Array<OperatorListItem>>([]);
    const [filteredOpList, setFilteredOpList] = useState<Fuse.FuseResult<OperatorListItem>[]>([]);
    const [loading, setLoading] = useState(true)
    const [query, setQuery] = useState('');

    const queryChange = (query: string) => {
        if (query !== '') {
            const res = fuse.search(query);
            setFilteredOpList(res);
        }
        setQuery(query);
    }

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
                    fuse.setCollection(data);
                    setLoading(false);
                } else {
                    const { data } = await axios.get('/ak/operators')
                    setOperatorList(data.data);
                    fuse.setCollection(data.data);
                    sessionStorage.setItem('operatorList', JSON.stringify(data.data))
                    setLoading(false);
                }
            } catch (error) {
                console.log('Error on fetching data');
            }
        })()
    }, [])
    if (loading) return (
        <Wrapper className="flex flex-col justify-center items-center w-full">
            <h1 className="text-6xl my-4">Operators List</h1>
            <div className="h-screen"></div>
        </Wrapper>
    );
    return (
        <Wrapper className="flex flex-col justify-center items-center w-full">
            <h1 className="text-6xl my-4 text-center">Operators List</h1>
            <div className="w-1/2 text-center">
                <input type="text" name="opquery" id="opquery"
                    className="w-full py-2 pl-4 border-2 border-yellow-800 box-border"
                    placeholder="Write your query here: (e.g. 'warfarin')"
                    onChange={(e) => queryChange(e.target.value)}
                    style={{ backgroundColor: '#242221' }}
                />
                <div>
                    <ListWindow
                        className="no-scrollbars"
                        height={500}
                        width={`calc(100% + ${getScrollBarWidth()}px + 3px)`}
                        itemSize={100}
                        itemCount={query === '' ? operatorList.filter(x => x.char_id.startsWith('char')).length : filteredOpList.length}
                        itemData={query === '' ? operatorList.filter(x => x.char_id.startsWith('char')) : filteredOpList.map(x => x.item)}
                        itemKey={(index, data) => {
                            const item = data[index]
                            return item.char_id;
                        }}
                    >
                        {memo(({ index, data, style }) => {
                            const op = data[index];
                            return (
                                <Link style={style} to={`/operator/${op.char_id}`}>
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
                        }, areEqual)}
                        {/* {query === '' && operatorList.length && operatorList.filter(x => x.char_id.startsWith('char')).sort((a,b) => {
                            if (a.name < b.name) return -1
                            if (a.name > b.name) return 1
                            return 0
                        }).map(op => {
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
                        {(query !== '' && filteredOpList.length) ? filteredOpList.map(x => x.item).map(op => {
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
                        }) : null} */}
                    </ListWindow>
                    
                </div>
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
        transition: background-color 100ms;
    }
    .bg-ak-panel:hover {
        background-color: #47413b;
    }

    .no-scrollbars{
    scrollbar-width: thin;
    scrollbar-color: transparent transparent;
  
        &::-webkit-scrollbar {
        width: 1px;
        }
    
        &::-webkit-scrollbar-track {
        background: transparent;
        }
    
        &::-webkit-scrollbar-thumb {
        background-color: transparent;
        }
    }

    .no-scrollbars::-webkit-scrollbar { 
        display: none;  /* Safari and Chrome */
    }
`;

export default Operators
