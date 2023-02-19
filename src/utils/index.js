

const chalk = require('chalk');

const isLeapYear = (year)=>{
    return  (year%400 === 0) || ((year%4===0)&&(year%100!==0));
}

const getKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value);
  };

const colorLog = (logType, str)=>{

   switch (logType){
       case 'Warning': return chalk.yellow(str);
       case 'Healthy': return chalk.green(str);
       case 'Danger': return chalk.red(str);
       default:break;
   }
}

module.exports = {
    isLeapYear,
    getKeyByValue,
    colorLog
}