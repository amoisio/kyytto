export class LearningNote {
    public id !: string;
    public topic !: string;
    public details !: LearningDetail[];
}

export class LearningDetail {
    public learn_id !: string;
    public description !: string;
}