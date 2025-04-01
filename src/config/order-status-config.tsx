

type ORDER_STATUS_CONFIG = {
    label:string;
    value:string;
    progessValue:number;
}
export const ORDER_STATUS_CONFIG:ORDER_STATUS_CONFIG[] = [
    {
        label:'Placed',
        value:'placed',
        progessValue:0
    },
    {
        label:'Waiting for restaurant confirmation',
        value:'paid',
        progessValue:25
    },
    {
        label:'In prrocess',
        value:'inProcess',
        progessValue:50
    },
    {
        label:'Out for delivery',
        value:'outForDelivery',
        progessValue:75
    },
    {
        label:'Delivered',
        value:'delivered',
        progessValue:100
    }
]