export default ({ Vue, options, router, siteData }) => {
  const pageList = []
  const childrens = {}
  const sidebar = {}

  for (const page of siteData.pages) {
    pageList.push(page.regularPath)
  }
  pageList.sort()

  for (const page of pageList) {
    if (page === '/') continue;
    const splitPath = page.split('/').filter(Boolean)
    if (splitPath.length > 2) {
      if (page.endsWith('/')) {
        childrens[splitPath[0]][splitPath[1]].push("")
      } else {
        childrens[splitPath[0]][splitPath[1]].push(page)
      }
    } else if (splitPath.length === 2) {
      if (page.endsWith('/')) {
        childrens[splitPath[0]][splitPath[1]] = [page]
      } else {
        childrens[splitPath[0]]["default"].push(page)
      }
    } else if (splitPath.length === 1 && page.endsWith('/')) {
      childrens[splitPath[0]] = {default: []}
      sidebar[`/${splitPath[0]}/`] = []
    }
  }

  Object.keys(childrens).map(key => {
    if (childrens[key]["default"].length > 0) {
      sidebar[`/${key}/`].push({
        title: key,
        collapseble: true,
        children: childrens[key]["default"]
      })
    } else {
      Object.keys(childrens[key]).map(k => {
        if (k === "default") {
          if (childrens[key][k].length > 0) {
            sidebar[`/${key}/`].push({
              title: key,
              collapseble: true,
              children: childrens[key][k]
            })
          }
        } else {
          sidebar[`/${key}/`].push({
            title: k,
            collapseble: true,
            children: childrens[key][k]
          })
        }
      })
    }
  })

  console.log(siteData.themeConfig.sidebar)
  console.log(sidebar)
  siteData.themeConfig.sidebar = sidebar
}