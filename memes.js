module.exports = {
  urls: [
    'http://version1.api.memegenerator.net/Generators_Search?q=clinton&pageIndex=0&pageSize=12',
    'http://version1.api.memegenerator.net/Generators_Search?q=bush&pageIndex=0&pageSize=12'
  ],
  extractImageUrls: function (data) {
    return data.result.map(function (meme) { return meme.imageUrl })
  },
  mapToFilenames: function mapToFilenames (imageUrls) {
    return imageUrls.map(function (imageUrl) {
      return [imageUrl, newImageFileName(imageUrl)]
    })
  }
}

var counter = 0
function newImageFileName (imageUrl) {
  var time = new Date().getTime().toString()
  return './public/' + time + '-' + counter++ + '.jpg'
}
