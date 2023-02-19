# hospital-simulation

## About problem 

App which can simulate the future patients’state, based on their current state, and a list of drugs they take.

## Pre requisites

Node JS needs to be installed. Node JS version should be >= v16.0



## App execution methods

Application can be run in the following ways :
1. **Input file** : File needs to be in the root folder. A sample file with defined format is attached.

                    npm start <fileName.txt>
                    npm start inputParams.txt
2. **CLI mode** : User can input patient states & available drugs through command line interface.
                    
                    npm start <patient state> <available drugs>
                    npm start D,D I

## Unit tests : 

All test cases are added within `tests/spec.js` file.
To fetch code coverage along with unit tests - `npm test:coverage`

 <img width="624" alt="Screenshot 2023-02-20 at 1 11 26 AM" src="https://user-images.githubusercontent.com/35234549/219971186-d2220063-ac82-4631-a6f7-5640521ca822.png">

To run unit tests only - `npm test`

## Classes - OOP approach : 

The input params either read through input file or arguments in command line are initially verified to confirm those are valid patient states. If not, an exception is thrown. 
Through file params we can run multiple test-cases at once. 

The final output which returns number of patients in each state is colored according to the severity.

[Fever, Tuberculosis, Diabetic] - In yellow color

[Dead] - In red color

[Healthy] - In green color

`PatientRecordBook`: It is like a record book to maintain the health state of all patients at any given point. It has the following functions 

- `initialiseAllState` : initialises patient record book on start
- `updateHealthRecords` : It is like a counter to maintain future health states of patients depending on their prescriptions
- `fetchHealthRecord` : This returns the record book containing list of all patients
- `validatePatientState` : This validates only valid patient state is passed. If any invalid patient state is passed on input, it throws error during initialisation phase

`Medication` : It is used to map available drugs. This class can be extended to handle additional properties for drugs like expiry date etc. It has following functions
- `mapAvailableDrugs` : It maps available drugs comparing with the drug list.
- `fetchAvailableDrugList` : returns all available drugs.
- `isMiraclePossible` : Function to check randomness, here validation check provided is for leap year and sunday. A dead man can be alive if this condition is met along with prescribed drug Flying Flying Spaghetti Monster is available. The randomness event can be made more complex by using math.random

`RuleEngine` : It contains all treatment rules for patients. Here, death rule has precedence over all. It consists of a static method `getFuturePatientState` which returns future patient state depending on available drug and his current state.



