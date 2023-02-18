
import {patientStates} from '../constants';

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

        Object.keys(patientStates).map((ele)=>{
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
}


export default PatientRecordBook;