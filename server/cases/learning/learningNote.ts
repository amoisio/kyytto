export class LearningNote {
    constructor(
        public id : string,
        public topic : string) {
        this.details = [];
    }
    public details !: LearningDetail[];

    public addDetail(description: string) {
        const detail = new LearningDetail();
        detail.learn_id = this.id;
        detail.description = description;
        this.details.push(detail);
    }
}

export class LearningDetail {
    public learn_id !: string;
    public description !: string;
}