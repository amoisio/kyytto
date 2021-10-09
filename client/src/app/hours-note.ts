export class HoursNote {
    public date : Date = new Date();
    public details : { description: string, estimate ?: number }[] = [];
    
    public totalEstimate(): number {
        return this.details
            .map(d => d.estimate ?? 0)
            .reduce((prev, cur) => prev + cur);
    }
}

export class HoursNoteDto {
    public description ?: string;
    public date ?: Date;
    public estimate ?: number;

    public validate(): boolean {
        return !!this.description
            && this.description.length > 0
            && !!this.date;
    }
}