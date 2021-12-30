export class WeatherData {
    constructor(
        public name: number,
        public zipcode: string,
        public weather: Array<Object>,
        public temp: string,
        public min: number,
        public max: number,
        public main: string,
    ){}
}
