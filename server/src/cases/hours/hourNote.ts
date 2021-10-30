export class HourNote {
    constructor(
        public id : string,
        public date : Date) {
        this.details = [];
    }
    public details : HourDetail[];

    public addDetail(description: string, estimate ?: number) {
        const detail = new HourDetail();
        detail.hour_id = this.id;
        detail.description = description;
        detail.estimate = estimate;
        this.details.push(detail);
    }
}

export class HourDetail {
    public hour_id !: string;
    public description !: string;
    public estimate ?: number;
}
