// 获取Tag中的内容
export const getTagValue = (code, tag) => {
  const tagReg = new RegExp(`<${tag}(?:"[^"]*"|'[^']*'|[^'">])*>((?:.|\n)+)</${tag}>`, 'gi')
  const tempVal = tagReg.exec(code)
  let tagVal = ''
  if (tempVal) {
    tagVal = tempVal[1]
  }
  return tagVal.trim()
}

// 生成随机唯一ID
export const createId = () => `${(Math.random() * 10000000).toString(16).substr(0, 4)}-${Date.now()}`
