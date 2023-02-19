
const assert = require('chai').assert;
const fs = require('fs');
const chalk = require('chalk');

const RuleEngine = require('../src/RuleEngine');
const {isLeapYear,getKeyByValue,colorLog} = require('../src/utils');
const {DRUGS} = require('../src/constants');


var fileData = [];

let PatientRecordBook = require('../src/PatientRecordBook');
let Medication = require('../src/Medication');

PatientRecordBook = new PatientRecordBook();
MedicationInstance = new Medication();


describe('Test for reading file',()=>{

    it('reading inputParams.txt',(success)=>{
        fs.readFile('./inputParams.txt','utf-8',(err,data)=>{
            if(err){
                console.error (`Error in reading file - ${err}`);
                throw Error('Error in read operation');
            }
            fileData = data?.split("\n");
            fileData.shift();
            success();
        })
    });

    it('Validate read data',(success)=>{
        assert.equal(fileData[0].split(" ")[0],'D,D');
        assert.equal(fileData[0].split(" ")[1],"I");
        success();
    })

});

describe('Validate functions in PatientRecordBook class',()=>{
    
    it('initialised patient record book',(success)=>{
        const result = PatientRecordBook.fetchHealthRecord();
        assert.equal(result['F'],0);
        assert.equal(result['X'],0);
        assert.equal(result['D'],0);
        success();
    });

    it('verify patient state is valid or not',(success)=>{
        const result = PatientRecordBook.validatePatientState('YU');
        assert.equal(result,false);
        success();
    });

    it('fetch all records',(success)=>{
        const result = PatientRecordBook.fetchHealthRecord();
        assert.equal(Object.keys(result).length,5);
        success();
    })
});


describe('Validate functions in Medication class',()=>{
    
    it('map available drugs & fetch',(success)=>{
        MedicationInstance.mapAvailableDrugs(fileData[0].split(" ")[1]);
        const result = MedicationInstance.fetchAvailableDrugList()
        assert.isArray(result);
        assert.equal(result[0],"Insulin");
        success();
    });
    it('check miracle ',(success)=>{
        const result = Medication.isMiraclePossible();
        assert.isBoolean(result);
        success();
    });

});

describe('Validate rule Engine',()=>{

    it('Fever patient should be healthy after treatment with paracetamol',(success)=>{
        const result = RuleEngine.getFuturePatientState('F',[DRUGS['P']]);
        assert.equal(result,"H");
        success();
    });

    it('Fever patient should be healthy after treatment with Aspirin',(success)=>{
        const result = RuleEngine.getFuturePatientState('F',[DRUGS['As']]);
        assert.equal(result,"H");
        success();
    });

    it('Fever patient should be healthy after treatment with Aspirin',(success)=>{
        const result = RuleEngine.getFuturePatientState('F',[DRUGS['As']]);
        assert.equal(result,"H");
        success();
    });

    it('Patient would be dead if treated with Aspirin & Paracetamol',(success)=>{
        const result = RuleEngine.getFuturePatientState('F',[DRUGS['P'],DRUGS['As']]);
        assert.equal(result,"X");
        success();
    });

    it('Tubercluosis patient would be cured if treated with Antibiotic',(success)=>{
        const result = RuleEngine.getFuturePatientState('T',[DRUGS['An']]);
        assert.equal(result,"H");
        success();
    });

    it('Tubercluosis patient would be dead if no antibiotic',(success)=>{
        const result = RuleEngine.getFuturePatientState('T',[DRUGS['As']]);
        assert.equal(result,"X");
        success();
    });

    it('Insulin prevents diabetic patient from death',(success)=>{
        const result = RuleEngine.getFuturePatientState('D',[DRUGS['I'],DRUGS['As']]);
        assert.equal(result,"D");
        success();
    });

    it('If insulin is unavailable, it will cause death of diabetic patients',(success)=>{
        const result = RuleEngine.getFuturePatientState('D',[DRUGS['P'],DRUGS['As']]);
        assert.equal(result,"X");
        success();
    });

    it('Healthy patient when treated with Paracetamol will be healthy',(success)=>{
        const result = RuleEngine.getFuturePatientState('H',[DRUGS['P']]);
        assert.equal(result,"H");
        success();
    });

    it('Healthy patient when treated with Insulin & Antibiotic will have fever',(success)=>{
        const result = RuleEngine.getFuturePatientState('H',[DRUGS['I'],DRUGS['An']]);
        assert.equal(result,"F");
        success();
    });

    it('Dead patient will be dead as it is not a leap year',(success)=>{
        const result = RuleEngine.getFuturePatientState('X',[DRUGS['I'],DRUGS['An']]);
        assert.equal(result,"X");
        success();
    });

    it('Dead patient will be alive if it is weekend and a leap year',
        (success)=>{
        const result = RuleEngine.getFuturePatientState('X',[DRUGS['Flying Flying Spaghetti Monster']]);
        assert.equal(result,"X");
        success();
    });

});


describe('Check utils',()=>{
    const temp = "Chalk log mode is working";

    it('validate leap year util',(success)=>{
        const result = isLeapYear(1996);
        assert.equal(result,true);
        success();
    });

    it('validate leap year util',(success)=>{
        const result = isLeapYear(1997);
        assert.equal(result,false);
        success();
    });

    it('Fetch key of object from value',(success)=>{
        const result = getKeyByValue(DRUGS,'Insulin');
        assert.equal(result,'I');
        success();
    });

    it('Should print output in yellow if warning',(success)=>{
        const result = colorLog('Warning',temp);
        assert.equal(result,chalk.yellow(temp));
        success();
    });

    it('Should print output in defined mode',(success)=>{
        const result = colorLog('Warning',temp);
        assert.notEqual(result,chalk.red(temp));
        success();
    });

    it('Should print output in red if danger mode',(success)=>{
        const result = colorLog('Danger',temp);
        assert.equal(result,chalk.red(temp));
        success();
    });

    it('Should print output in green if health mode',(success)=>{
        const result = colorLog('Healthy',temp);
        assert.equal(result,chalk.green(temp));
        success();
    });

})






