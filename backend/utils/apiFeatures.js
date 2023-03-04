class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          // find with property eg: hello helloo helloooo will be found if name = hello
          name: {
            // regular expression - regex
            $regex: this.queryStr.keyword,
            // i - case insensitive
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
    //   Removing some fields for category
    const removeFields = ["keyword", "page", "limit"];
    // key = keyword or page or limit get deleted
    removeFields.forEach((key) => delete queryCopy[key]);

    // Filter For Price and Rating
    let queryStr = JSON.stringify(queryCopy);

    // /\b() - regex, gt, gte, lt, lte -> >, >=, <, <=
    // $${key} -> $gt, $gte, $lt, $lte
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    // this.query = Product.find() method
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
  //   eg. showing 10 items per page then next 10 items and so on
  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    // total products in db = 50
    // products per page = 10
    // total pages = 5
    // products skip at frist page = 0
    // products skip at second page = 10, starts from 11th product
    // products skip at third page = 20, starts from 21th product and so on...
    // eg. 10*(1-1) = 0, first page, 0 products skipped, 10*(2-1) = 10, 10 products skipped at second page and so on...
    const skipProducts = resultPerPage * (currentPage - 1);
    this.query = this.query.limit(resultPerPage).skip(skipProducts);
    return this;
  }
}

module.exports = ApiFeatures;
