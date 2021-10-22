export class HourNote {
    public id !: string;
    public date !: Date;
    public details !: HourDetail[];
}

export class HourDetail {
    public hour_id !: string;
    public description !: string;
    public estimate ?: number;
}
