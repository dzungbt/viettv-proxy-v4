function getStartCommandParams(key) {
    const arr = process.argv;
    const regex = new RegExp(`^${key}=(.*)$`);
    
    for (let i = 0; i < arr.length; i++) {
      const match = arr[i].match(regex);
      if (match) {
        return match[1];
      }
    }
    
    return null;
}

module.exports = {
    getStartCommandParams
}