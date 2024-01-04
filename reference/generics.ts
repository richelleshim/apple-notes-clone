
const push2elements = <T>(arr: T[], fst: T, snd: T) => {
  arr.push(fst, snd)
}


const arrDates = [new Date("Dec 5, 2020"), new Date("Dec 25, 2020")];
push2elements(arrDates, new Date("Dec 31, 2020"), new Date("Jan 1, 2021"));
console.log(arrDates)