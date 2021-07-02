/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { BeatLoader } from 'react-spinners';
import styled from 'styled-components';

import  axios from '../utils/axios';
import Skills from '../components/Operator/Skills';
import { OPSkillRaw } from '../interfaces/Operator';

interface OperatorDetailParams {
    charId: string;
}

interface Handbook {
    charId: string;
    voiceActor: string;
    illustrator: string;
    stories: Array<{storyTitle: string, storyText: string}>
}

const operatorDataInitialState = {
    name: '',
    desc: '',
    tags: [],
    in_recruit: false,
    faction: '',
    rarity: 0,
    profession: '',
    position: '',
    char_id: '',
    skills: [],
}

const handbookInitialState: Handbook = {
    charId: '',
    voiceActor: '',
    illustrator: '',
    stories: []
}

function transformProfession(profession: string) {
    switch(profession) {
        case 'PIONEER':
            return 'Vanguard';
        case 'SPECIAL':
            return 'Specialist';
        case 'SNIPER':
            return 'Sniper';
        case 'SUPPORT':
            return 'Supporter';
        case 'TANK':
            return 'Defender';
        case 'WARRIOR':
            return 'Guard';
        case 'MEDIC':
            return 'Medic';
        case 'CASTER':
            return 'Caster';
        default:
            return 'Undefined'
    }
}

const FieldData: React.FC<{field: string, value: string}> = ({ field, value}) => {
    return (<div className="flex mb-1 text-xl">
        <p className="w-1/4 bg-ak-panel py-2 pl-2">{field}</p>
        <p className="w-3/4 bg-ak-panel2 py-2 px-2">{value}</p>
    </div>)
}

const OperatorDetail = () => {
    const { charId } = useParams<OperatorDetailParams>();
    const [operatorData, setOperatorData] = useState(operatorDataInitialState)
    const [handbook, setHandbook] = useState(handbookInitialState);
    const [isFetching, setIsFetching] = useState(true)

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        (async() => {
            try {
                const { data: info } = await axios.get(`/ak/operator/${charId}/all`)
                setOperatorData(info.data)
                const { data: handbookData } = await axios.get(`/ak/operator/${charId}/handbook`)
                setHandbook(handbookData.data);
                setIsFetching(false);
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])

    
    if (isFetching) return (
        <Wrapper className="h-screen w-full py-8 px-8">
            <div className="flex justify-center">
                <BeatLoader color="#FFFFFF"/>
            </div>
        </Wrapper>
    );
    return(
        <Wrapper className="w-full py-8 px-8" >
            <Link to="/operators">
                <h1 className="bg-ak-panel rounded-lg hover:cursor-pointer hover:bg-gray-400 text-center py-2 text-2xl">Back to Operator List</h1>
            </Link>
            <h1 className="text-6xl my-4">{operatorData.name}</h1>
            <div className="flex">
                <div className="w-1/2 flex flex-col">
                    <div className="text-center block mx-2">
                        <div style={{
                            backgroundImage: `url('https://ark-files-bucket.s3.ap-southeast-1.amazonaws.com/img/ui/chara/bg2.png')`,
                            backgroundPosition: 'top left',
                            overflow: 'hidden',
                        }}>
                            <div className="bg-ak-panel shadow-lg" style={{
                                display: 'block',
                                position: 'relative',
                                top: '10px',
                                left: '10px',
                                width: '100px',
                                height: '100px',
                            }}>
                                <img height={100} width={100} src={`https://ark-files-bucket.s3.ap-southeast-1.amazonaws.com/img/classes/class_${transformProfession(operatorData.profession).toLowerCase()}.png`} alt=""/>
                            </div>

                                <img style={{ transform: 'scale(1.25, 1.25)', maxHeight: '80vh', display: 'block', margin: '0 auto'}} src={`https://ark-files-bucket.s3.ap-southeast-1.amazonaws.com/img/characters/${charId}_1.png`} alt="" />
                        </div>
                    </div>
                    <Skills skills={operatorData.skills as OPSkillRaw[]}/>
                    
                </div>
                <div className="w-1/2 mx-2">
                    <div className="flex flex-row">
                        <div className="w-full">
                            <FieldData field="Name" value={operatorData.name} />
                            <FieldData field="Class" value={transformProfession(operatorData.profession)} />
                            <FieldData field="Position" value={operatorData.position === 'MELEE' ? 'Melee' : 'Ranged'} />
                            <FieldData field="Traits" value={operatorData.desc} />
                            <FieldData field="Recruitable" value={operatorData.in_recruit ? 'Yes' : 'No'} />
                            <FieldData field="Rarity" value={`${operatorData.rarity + 1}*`} />
                            <FieldData field="Tags" value={operatorData.tags.join(', ')} />
                            <FieldData field="CV" value={handbook.voiceActor} />
                            <FieldData field="Artist" value={handbook.illustrator} />
                        </div>
                    </div>
                    <div >
                        <p className="text-4xl my-4 bg-ak-panel px-2 py-2">Story</p>
                        {handbook.stories.length && handbook.stories.map(story => {
                            return <div className="flex flex-col bg-ak-panel shadow-xl mb-4 px-4 py-2">
                                <span className="text-xl mb-2">{story.storyTitle}</span>
                                <p className="text-lg">{story.storyText.split('\n').map((item, i) => <p key={i}>{item}</p>)}</p>
                            </div>
                        })}
                    </div>
                    
                </div>
            </div>
            
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
    .bg-ak-panel2 {
        background-color: #110f0e;
    }
`;

export default OperatorDetail
