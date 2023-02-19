

const Medication = require('./Medication');

const {PATIENT_STATES,DRUGS} = require('./constants');

/**
 * @description RuleEngine determines the future state of patients health depending on
 * available drugs. Please note - death rule has precedence above anything. 
 * considered assumption - all available drugs will be used for treatment 
 */
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
                            break;
                        }
                    }
                    result = 'X';
                }
                break;
            case 'Fever':
                {
                    if(availableDrugs.includes(DRUGS['P']) || availableDrugs.includes(DRUGS['As'])){
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
                    }else{
                        result = 'X';
                    }
                }
                break;
            case 'Tuberculosis':
                {
                    if(availableDrugs.includes(DRUGS['An'])){
                        result = 'H';
                    }else{
                        result = 'X';
                    }
                }
                break;
            default : break;
        };

        return result;
    }

}


module.exports = RuleEngine;