
const {PATIENT_STATES} = require('../constants'); 

/**
 * @description - A ledger to maintain record of patient health states at any point
 */
class PatientRecordBook {

    constructor(){
        this.recordPatientState = this.initialiseAllState();
    }

    /**
     * 
     * @description - initialse patient record book 
     */
    initialiseAllState(){
        let patientStateCount = new Map();

        Object.keys(PATIENT_STATES).map((ele)=>{
            patientStateCount[ele] = 0;
        });
        return patientStateCount;
    }

    /**
     * @param {*} state - patient state
     * @description - updates patient state count depending on his health status
     */
   updateHealthRecords(state){
    this.recordPatientState[state] = this.recordPatientState[state] + 1;
   }

   /**
    * @returns final patient states
    */
   fetchHealthRecord(){
       return this.recordPatientState;
   }

   /**
    * @description - validate patient state
    */
   validatePatientState(state){
    return PATIENT_STATES[state]?true:false;
   }

}
module.exports = PatientRecordBook;