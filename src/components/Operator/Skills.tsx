import React, { useState, useEffect } from 'react'
import axios from '../../utils/axios';
import { formatText } from '../../utils/formatter';
import { OPSkill, OPSkillRaw, SkillLevelUpCondition } from '../../interfaces/Operator';

interface Props {
    skills: OPSkillRaw[];
}
const Skills: React.FC<Props> = ({skills}) => {
    const skillArr: OPSkill[] = skills.map(skill => {
        let lvlData = skill.levelUpCostCond[0]
        return {
            ...skill,
            levelUpCostCond: (JSON.parse(lvlData)) as SkillLevelUpCondition[]
        }
    })
    console.log(skillArr)
    return (
        <div>
            <p className="text-4xl my-4 bg-ak-panel px-2 py-2">Skills</p>
            {skillArr.map(skill => {
                return (<SkillDetail skill={skill} />)
            })}
        </div>
    )
}

const regexDesc = new RegExp(/<@([a-z]*).([a-z]*)>\+*{?([A-Za-z_:0-9%]*)}?<\/>/, 'g');

function transformFormat(descriptionText: string) {
    const descMatch = [...descriptionText.matchAll(regexDesc)]
    let outText = descriptionText
    if (descMatch) {
        // console.log(descMatch)
        for (let i = 0; i < descMatch.length; i++) {
            const formatted = formatText(descMatch[i][1], descMatch[i][2], descMatch[i][3])
            // console.log(formatted)
            outText = outText.replace(descMatch[i][0], formatted)
            // console.log(outText)
        }
    }
    return outText
}

const SkillDetail: React.FC<{ skill: OPSkill }> = ({skill}) => {
    const [detail, setDetail] = useState<any>(null)
    const [level, setLevel] = useState(0);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        (async() => {
            const { data : skillDetail } = await axios.get(`/ak/skill/${skill.skillId}/all`)
            setDetail(skillDetail.data);
            setIsFetching(false);
        })()
    }, [])

    if (isFetching) return null;
    return (<div key={skill.id} className="flex">
        <img className="self-center" src={`https://ark-files-bucket.s3.ap-southeast-1.amazonaws.com/img/skills/skill_icon_${skill.skillId}.png`} alt=""/>
        <div className="px-4 py-2">
            <p className="text-xl bold">{detail.skill_levels[level].name}</p>
            <p className="text-sm text-gray-300 text-justify" dangerouslySetInnerHTML={{ __html: transformFormat(detail.skill_levels[level].description)}} ></p>
            <p className="text-sm">SP Cost: {detail.skill_levels[level].spCost}</p>
            <p className="text-sm">Init. SP: {detail.skill_levels[level].initSp}</p>
            <div className="flex flex-row border-yellow-800 border-2" style={{flexBasis: 0}}>
                {detail.skill_levels.map((_: any, lvl: number) => {
                    return <div className={`p-1 ${lvl === level ? 'bg-yellow-800' : ''} hover:bg-gray-500 hover:cursor-pointer flex-grow text-center border-yellow-800 border-r-2`}
                        onClick={() => setLevel(lvl)}
                    >
                        <span>{lvl + 1}</span>
                    </div>
                })}
            </div>
        </div>
    </div>)
}

export default Skills
