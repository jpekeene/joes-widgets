export interface Widget {
    id: string;
    name: string;
    stockLevel: number;
    type: WidgetType;
    manufacturer: Manufacturer;
}
export interface WidgetType {
    id: string;
    name: string;
    widgets?: Widget[];
    widgetsAggregate?: {
        count?: number;
    };
}
export interface Manufacturer {
    id: string;
    name: string;
    widgets?: Widget[];
    widgetsAggregate?: {
        count?: number;
    };
}
