import React, { useState, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

import axios from '../../utils/axios';
import { formatText } from '../../utils/formatter';
import { OPSkill, OPSkillRaw, SkillLevelUpCondition } from '../../interfaces/Operator';
// import '../../styles/skills.css'

interface Props {
    skills: OPSkillRaw[];
}
const Skills: React.FC<Props> = ({skills}) => {
    const [level, setLevel] = useState(0);
    const skillArr: OPSkill[] = skills.map(skill => {
        let lvlData = skill.levelUpCostCond[0]
        return {
            ...skill,
            levelUpCostCond: (JSON.parse(lvlData)) as SkillLevelUpCondition[]
        }
    })
    return (
        <Wrapper>
            <p className="text-4xl my-4 bg-ak-panel px-2 py-2">Skills</p>
            {skillArr.map(skill => {
                return (<SkillDetail skill={skill} level={level} setLevel={setLevel} />)
            })}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    .skill-detail-enter {
    opacity: 0;
    }

    .skill-detail-enter-active {
    opacity: 1;
    transition: opacity 500ms ease-in;
    }

    .skill-detail-exit {
    opacity: 1;
    }

    .skill-detail-exit-active {
    opacity: 0;
    transition: opacity 500ms ease-out;
    }
`

const regexDesc = new RegExp(/<@([a-z]*).([a-z]*)>([A-Za-z .';%0-9()+-]*){?-?([A-Za-z_@. ]*)([:0-9.%]*)}?([A-Za-z .';%0-9()]*)<\/>/, 'g');

interface SkillLevelBlackboard {
    key: string;
    value: number;
}

function transformFormat(descriptionText: string, blackboard: SkillLevelBlackboard[]) {
    const descMatch = [...descriptionText.matchAll(regexDesc)]
    let outText = descriptionText
    if (descMatch) {
        console.log("========BEGIN REGEX RESULT============")
        console.log(descMatch)
        for (let i = 0; i < descMatch.length; i++) {
            const blackboardKey = blackboard.find(x => descMatch[i][4].toLowerCase().match(x.key.toLowerCase()))
            console.log(`${blackboardKey?.key} : ${blackboardKey?.value}`)
            const formatted = formatText(descMatch[i][1], descMatch[i][2], descMatch[i][4], blackboardKey?.value, descMatch[i][3], descMatch[i][5], descMatch[i][6])
            // console.log(formatted)
            outText = outText.replace(descMatch[i][0], `${formatted}`)
            // console.log(outText)
        }
    }
    return outText
}

const SkillDetail: React.FC<{ skill: OPSkill, level: number, setLevel?: Function }> = ({skill, setLevel, level}) => {
    const [detail, setDetail] = useState<any>(null)
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        (async() => {
            const { data : skillDetail } = await axios.get(`/ak/skill/${skill.skillId}/all`)
            setDetail(skillDetail.data);
            setIsFetching(false);
            
        })()
    }, [])

    if (isFetching) return null;
    return (
    <CSSTransition
        in={!isFetching}
        timeout={300}
        classNames="skill-detail"
    >
        <div key={skill.id} className="flex">
            <img className="self-center" src={`https://ark-files-bucket.s3.ap-southeast-1.amazonaws.com/img/skills/skill_icon_${detail.iconId ? detail.iconId : skill.skillId}.png`} alt=""/>
            <div className="px-4 py-2 w-100 flex flex-col flex-grow">
                <div>
                    <p className="text-xl bold">{detail.levels[level].name}</p>
                    <p className="text-sm text-gray-300 text-justify" dangerouslySetInnerHTML={{ __html: transformFormat(detail.levels[level].description, detail.levels[level].blackboard)}} ></p>
                    <p className="text-sm">SP Cost: {detail.levels[level].spData.spCost}</p>
                    <p className="text-sm">Init. SP: {detail.levels[level].spData.initSp}</p>
                </div>
                <div className="flex flex-row border-yellow-800 border-2 border-r-0 w-100">
                    {detail.levels.map((_: any, lvl: number) => {
                        return <div className={`p-1 ${lvl === level ? 'bg-yellow-800' : ''} hover:bg-gray-500 hover:cursor-pointer flex-grow text-center border-yellow-800 border-r-2`}
                            onClick={() => setLevel && setLevel(lvl)}
                            style={{flexBasis: 0}}
                        >
                            <span>{lvl <= 6 ? lvl + 1 : `M${lvl - 6}`}</span>
                        </div>
                    })}
                </div>
            </div>
        </div>
    </CSSTransition>
        
    )
}



export default Skills
