module.exports = () => {
    return {
        layout: 'base',
        permalink: "/{{page | dropFolder(title)}}/",
        tags: ['mainnav']
    }
}