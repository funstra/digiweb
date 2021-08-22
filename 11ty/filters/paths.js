const slugify = require('slugify')
exports.dropFolder = (page, name = '') => {
    const path = '/content'
    // console.log(page.filePathStem, ' ->   file path')
    // console.log(page.fileSlug, ' ->   file slug')
    const slugIndex = page.filePathStem.indexOf(page.fileSlug)
    if (page.filePathStem.indexOf(path) !== 0) {
        return page.filePathStem.slice(0, slugIndex) + '/' + slugify(name, { lowerpm: true })
    }
    // console.log(slugIndex, ' ->   index of slug')
    // console.log(name, ' ->   title')
    const p = page.filePathStem.slice(path.length, slugIndex-1) + '/' + slugify(name, { lowerpm: true })
    // console.log(p, ' ->   permalink')
    // console.log('\n\n')
    return p
}