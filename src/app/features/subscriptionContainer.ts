
import { Subscription } from 'rxjs';



export class SubscriptionContainer {
subcriptions: any = []
    constructor() {
    }

    
    public set add(v : Subscription) {
        this.subcriptions.push(v);
    }
    

    removeSubscriptions() {
        this.subcriptions.forEach((element: Subscription) => {
            element.unsubscribe();
        });
    }
 
}