
const fs = require('fs');
const path = require('path');

class BlocklistManager {
  constructor() {
    this.blockedUsers = new Set();
    this.blocklistPath = path.join(__dirname, '../../data/blocklist.json');
    this.loadBlocklist();
  }

  loadBlocklist() {
    try {
      if (fs.existsSync(this.blocklistPath)) {
        const data = JSON.parse(fs.readFileSync(this.blocklistPath));
        this.blockedUsers = new Set(data.users);
      } else {
        this.saveBlocklist();
      }
    } catch (error) {
      console.error('Error loading blocklist:', error);
      this.blockedUsers = new Set();
    }
  }

  saveBlocklist() {
    const dir = path.dirname(this.blocklistPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(this.blocklistPath, JSON.stringify({ users: Array.from(this.blockedUsers) }));
  }

  blockUser(userId) {
    this.blockedUsers.add(userId);
    this.saveBlocklist();
  }

  unblockUser(userId) {
    this.blockedUsers.delete(userId);
    this.saveBlocklist();
  }

  isBlocked(userId) {
    return this.blockedUsers.has(userId);
  }
}

module.exports = BlocklistManager;
