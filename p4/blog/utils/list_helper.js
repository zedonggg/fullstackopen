const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const sum = blogs.reduce((prev, cur) => prev + Number(cur.likes), 0)
    return sum
}

const favoriteBlog = (blogs) => {
    const blog = blogs.reduce((prev, cur) => prev === null || prev.likes < cur.likes ? cur : prev, null)
    return blog
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
