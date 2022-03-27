export const commonYear  = 2022

export const autoFill = (month) => {
  return  month < 10 ? '0' + month : month
}

export const range = (size, startAt) => {
    var arr = []
    for(let i = 0; i < size; i++) {
        arr[i] = startAt + i
    }
    return arr
}

export const judgeActive = (active, date) => {
    return (active === date) ? "dropdown-item active" : "dropdown-item"
}

export const parseYearAndMonth = (str) => {
    const date = str ? new Date(str) : new Date
    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1
    }
}

export const flattenArr = (arr) => {
    return arr.reduce((map, item) => {
        map[item.id] = item
        return map
    }, {})
}