class AppFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i"
          }
        }
      : {};
    console.log(keyword);

    
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryStrCopy = { ...this.queryStr };
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryStrCopy[key]);
    console.log(queryStrCopy);
    
    let queryStr = JSON.stringify(queryStrCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`)

    this.query = this.query.find(JSON.parse(queryStr));
    console.log(queryStr)

    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1
    const skipPage = resultPerPage * (currentPage -1)

    this.query = this.query.limit(resultPerPage).skip(skipPage)

    return this


  }
}

export default AppFeatures;
