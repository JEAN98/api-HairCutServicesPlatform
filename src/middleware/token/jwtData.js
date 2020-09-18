class JWTData {
    constructor(id, email, name,accountType) {
      this.id = id;
      this.email = email;
      this.name = name;
      this.accountType = accountType;
    }
}

module.exports = {
   JWTData
};