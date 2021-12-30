export class ForecastData {
    constructor(
        public dt: number,
        public dt_txt: Date,
        public weather: Array<Object>,
        public min: number,
        public max: number,
        public main: string
    ){}
}
