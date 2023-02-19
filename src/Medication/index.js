

const {DRUGS} = require('../constants');
const {isLeapYear} = require('../utils');

/**
 * @description - Class to map available drugs. If we need to add additional properties 
 * to drugs like expiry date, sideEffect etc can be extended
 */
class Medication {

    constructor(){
        this.drugList = [];
    }

    /**
     * @param {*} availableDrugs - input drug stream
     * @returns list of drugs with full name
     */
    mapAvailableDrugs(availableDrugs){
        

        if(!availableDrugs) return;
        const availableDrugsList = availableDrugs?.split(",");

        Object.keys(DRUGS).map((medicine)=>{
            if(availableDrugsList?.includes(medicine)){
                this.drugList.push(DRUGS[medicine]);
            }
        })
        
    }

    /**
     * @returns list of available drugs
     */
    fetchAvailableDrugList(){
        return this.drugList;
    }

    /**
     * @description check dead can be brought alive by validating given day & year, 
     * if its a weekend then yes
     */
    static isMiraclePossible(){
        const today = new Date();
        const weekendSequenceNo = 0; // Sunday
        const daySequence = today.getDay();

        if(weekendSequenceNo === daySequence && isLeapYear(today.getFullYear())){
            //its Sunday & a leap year
            return true;
        }else{
            return false;
        }
        
    }   

}



module.exports = Medication;