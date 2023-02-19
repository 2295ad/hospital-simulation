

const Medication = require('./Medication');

const {PATIENT_STATES,DRUGS} = require('./constants');


class RuleEngine{

    /**
     * 
     * @param {*} patientStateCode [D,H,F,X]
     * @param {*} availableDrugs 
     * @description dead rule is given precedence over any other rule
     * @returns future patient state
     */
    static getFuturePatientState(patientStateCode,availableDrugs){
    
        const currentPatientState = PATIENT_STATES[patientStateCode];
        let result = "";

        //check drug list contains (paracetamol & Aspirin)
        // & patient is not dead
        const lethalDrug = [DRUGS['P'],DRUGS['As']].every(item=>availableDrugs.includes(item));
        if(lethalDrug && currentPatientState !== PATIENT_STATES['X']){
            return 'X';
        }


        switch(currentPatientState){
            case 'Dead':
                {
                    if(availableDrugs.includes(DRUGS['Flying Flying Spaghetti Monster'])){
                        const result = Medication.isMiraclePossible();
                        if(result){
                            result = 'H';
                        }
                    }
                    result = 'X';
                }
                break;
            case 'Fever':
                {
                    if(availableDrugs.includes(DRUGS['P'])){
                        result = 'H'
                    }else{
                        result = 'F'
                    }
                }
                break;
            case 'Healthy':
                {
                    const mixedDrug = [DRUGS['I'],DRUGS['An']].every(item=>availableDrugs.includes(item));
                    if(mixedDrug){
                        result = 'F';
                    }else{
                        result = 'H';
                    }
                }
                break;
            case 'Diabetes':
                {
                    if(availableDrugs.includes(DRUGS['I'])){
                        result = 'D';
                    }
                    result = 'X';
                }
                break;
            case 'Tuberculosis':
                {
                    if(availableDrugs.includes(DRUGS['An'])){
                        result = 'H';
                    }
                    result = 'X';
                }
                break;
            default : break;
        };

        return result;
    }

}


module.exports = RuleEngine;