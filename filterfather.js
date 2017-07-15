var _ = require('lodash')
var list = ['/', '/a/', '/b/', '/a/1/', '/a/2/', '/a/v/', '/a/v/23/', '/c/2/', '/d/1/1/1/1/1/']
var list2 = ['/a/', '/b/', '/a/1/', '/a/2/', '/a/v/', '/a/v/23/', '/c/2/', '/d/1/1/1/1/1/']

var sortList = _.sortBy(list, function(o) {
    return o.split('/').length
})

console.log('aa--->', sortList);
var deleteIndex = []
for (var i = 0; i < sortList.length; i++) {
    for (var j = i + 1; j < sortList.length; j++) {
        if (sortList[j].includes(sortList[i])) {
            deleteIndex.push(sortList[j])
        }
    }
}
console.log('delete index--->', _.uniq(deleteIndex));
console.log('real value--->', _.difference(sortList, _.uniq(deleteIndex)))