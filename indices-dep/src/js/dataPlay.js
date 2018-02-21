
let data = {}


function setData(calcTimes) {
  for (let calcTime of calcTimes) {
    let day = calcTime.date;
    if (!data[day]) data[day] = []

    calcTime.calcTimeParsed = new Date(calcTime.calcTime);

    data[day].push(calcTime);
  }

  for (let day in data) {
    let sorted = data[day].sort((a, b) => {      
      return a.calcTimeParsed - b.calcTimeParsed;
    })

    data[day] = sorted;
  }
}

function getIdsBetween(day, date1, date2) {

  var times = data[day];

  let index1 = -1;
  let length = 0;
  for (let i = 0; i < times.length; i++)
  {
    let entry = times[i];
    let entryDate = entry.calcTimeParsed;
    if (date1 > entryDate) {
      continue;
    }
    if (index1 == -1)
      index1 = i;

    length++;
    
    if (entryDate > date2) {
      break;
    }
  }

  if (index1 === -1) return []
  return times.slice(index1, index1 + length - 1).map(x => x.indexId);
}

function getTotalIndices(date) {
  return data[date].length;
}

export default {
  setData: setData,
  getIdsBetween: getIdsBetween,
  getTotalIndices: getTotalIndices
}