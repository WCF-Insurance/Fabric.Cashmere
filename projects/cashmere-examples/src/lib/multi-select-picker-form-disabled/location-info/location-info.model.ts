export interface LocationInfo {
    premises: Premises;
    building: Building;
    address: string;
}

export interface Premises {
    title: string;
    subtitle: string;
}

export interface Building {
    title: string;
    subtitle: string;
}
