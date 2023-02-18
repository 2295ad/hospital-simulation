

import {drugs} from '../constants'; 

class Medication {

    constructor(availableDrugs){
        this.drugList = this.mapAvailableDrugs(availableDrugs)
    }

    /**
     * @param {*} availableDrugs - input drug stream
     * @returns list of drugs with full name
     */
    mapAvailableDrugs(availableDrugs){
        let drugList = [];
        const availableDrugsList = availableDrugs.split(",");

        Object.keys(drugs).map((medicine)=>{
            if(availableDrugsList.includes(medicine)){
                drugList.push(drugs[medicine]);
            }
        })
        return drugList;
    }

}



export default Medication;