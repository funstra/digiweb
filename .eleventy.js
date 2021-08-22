const { dropFolder } = require('./11ty/filters/paths')
module.exports = (config) => {
    config.setDataDeepMerge(true);
    config.addFilter('dropFolder', dropFolder)
    config.addWatchTarget('11ty/src/static')
    config.addPassthroughCopy('11ty/src/static')
    return {
        dir: {
            input: '11ty/src',
            output: '11ty/public',
            htmlTemplateEngine: "njk",
            markdownTemplateEngine: "njk"
        }
    }
}