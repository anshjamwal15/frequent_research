
export interface ICity {
    name: string;
}

export interface IState {
    name: string;
    cities: ICity[];
}

export interface ICountry {
    name: string;
    states: IState[];
}


