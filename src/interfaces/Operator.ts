export interface OPSkillRaw {
    charId: string;
    id: number;
    overridePrefabKey?: string;
    overrideTokenKey?: string;
    skillId: string;
    unlockCond: string;
    levelUpCostCond: string[];
}

export interface OPSkill {
    charId: string;
    id: number;
    overridePrefabKey?: string;
    overrideTokenKey?: string;
    skillId: string;
    unlockCond: string;
    levelUpCostCond: Array<SkillLevelUpCondition>;
}

export interface SkillUnlockCondt {
    phase: number;
    level: number;
}

export interface SkillLevelUpCondition {
    unlockCond: SkillUnlockCondt;
    lvlUpTime: number;
    levelUpCost: SkillLevelUpCost[]
}

export interface SkillLevelUpCost {
    id: string;
    count: number;
    type: string;
}

export default OPSkill;