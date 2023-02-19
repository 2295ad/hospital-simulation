

const fs = require('fs');
const RuleEngine = require('./src/RuleEngine');
const {colorLog} = require('./src/utils');


let PatientRecordBook = require('./src/PatientRecordBook');
let Medication = require('./src/Medication');

PatientRecordBook = new PatientRecordBook();

const commandLineInputParams = process.argv;

if(commandLineInputParams[2].endsWith('.txt')){
    fs.readFile(commandLineInputParams[2],'utf-8',(err,data)=>{
        if(err){
            console.error('Error reading file');
        }

        //split by new line
        const inputList = data.split("/n");
        inputList.map((ele)=>{

            const data = ele.split(" ");
            const [patientStateStream,drugListStream] = data;
            const {patientStateList,availableDrugList} = modifyInputParams(patientStateStream,drugListStream);
            predictFutureStates(patientStateList,availableDrugList);

        });
    });
}else{

    const patientStateStream = commandLineInputParams[2];
    const drugListStream = commandLineInputParams[3];

    const {patientStateList,availableDrugList} = modifyInputParams(patientStateStream,drugListStream);
    predictFutureStates(patientStateList,availableDrugList);
    
}


/**
 * @description checks valid patient state & returns a list 
 * @returns  list of patient state and drugs
 */
function modifyInputParams(patientStateStream,drugListStream){
    try{
        Medication = new Medication(drugListStream);
        const availableDrugList = Medication.fetchAvailableDrugList();
        let patientStateList = patientStateStream?.split(",");
        
        const invalidStateExists = patientStateList.some((state)=>!PatientRecordBook.validatePatientState(state));
        if(invalidStateExists){
            throw Error('Invalid patient state');
        }

        return {patientStateList,availableDrugList};
    }catch(err){
        console.error(`Error in modifying params - ${err}`);
        process.exit(1);
    }
};


/**
 * @param {*} patientStateList - available patient state list
 * @param {*} availableDrugsList - available drug list
 * @returns - predicts future patient state
 */

function predictFutureStates(patientStateList,availableDrugsList){
    try{
     
        patientStateList.map((state)=>{
            const futurePatientState = RuleEngine.getFuturePatientState(state, availableDrugsList);
            PatientRecordBook.updateHealthRecords(futurePatientState);
        })

        const result = PatientRecordBook.fetchHealthRecord();
        printLog(result);

        process.exit(1);
    }catch(err){
        console.error(`Error in predicting state - ${err}`)
    }
 }


 /**
  * 
  * @description prints log based on criticality of patient health
  */
    function printLog(result){
        let finalLog = '';
        Object.keys(result).map((ele)=>{
            const temp = `${ele}:${result[ele]}`;

            if(['F','D','T'].includes(ele)) {
                finalLog += `${colorLog('Warning', temp)},`;
            }else if('X'===ele){
                finalLog += `${colorLog('Danger', temp)}`;
            }else{
                finalLog += `${colorLog('Healthy', temp)},`;
            }
        });
      
        console.log(finalLog);
      
    }

