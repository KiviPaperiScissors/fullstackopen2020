const _ = require('lodash')

const dummy = blogs => 1

const totalLikes = blogs => {
  let result = blogs.reduce((sum, blog) => sum + blog.likes, 0)

  return blogs.length === 0
    ? 0
    : result
}

const favoriteBlog = blogs => {
  let sortedArray = _.sortBy(blogs, (o => o.likes))
  // console.log(sortedArray)
  let result = _.omit(sortedArray[sortedArray.length-1], ['_id', 'url', '__v'])
  // console.log(result)
  return result
}

const mostBlogs = blogs => {
  let blogCount = _.countBy(blogs, 'author')
  // console.log(blogCount)
  let blogCountArray = []
  _.forEach(blogCount, (blogs, author) => {
    // console.log('Author: ', author)
    // console.log('Blogs: ', blogs)
    blogCountArray.push({author, blogs})
  })
  // console.log(blogCountArray)
  let sortedArray = _.sortBy(blogCountArray, (o => o.blogs))
  // console.log(sortedArray)
  return sortedArray[sortedArray.length-1]
}

const mostLikes = blogs => {
  let prunedArray = []
  _.forEach(blogs, (blog => {
    prunedArray.push(_.pick(blog, ['author', 'likes']))
  }))
  // console.log(prunedArray)
  let groupedArray = _.groupBy(prunedArray, 'author')
  // console.log(groupedArray)
  let resultArray = []
  _.forEach(groupedArray, (data, author) => {
    let likes = data.reduce((sum, value) => sum + value.likes , 0)
    // console.log(likes)
    resultArray.push({author, likes})
  })
  let sortedArray = _.sortBy(resultArray, (o => o.likes))
  // console.log(sortedArray)
  return sortedArray[sortedArray.length-1]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
