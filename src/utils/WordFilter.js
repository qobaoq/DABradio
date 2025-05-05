
const { EmbedBuilder } = require('discord.js');
const BannedSongs = require('./bannedsongs');

class WordFilter {
  constructor() {
    this.bannedWords = [
      "asshole", "bastard", "bitch", "nigga", "bugger", "bullshit", "cock", "cunt", "damn",
      "dick", "dickhead", "dyke", "fag", "faggot", "fuck", "goddamn", "gook", "hell", "homo",
      "jerk", "kike", "knobend", "kunt", "lesbo", "motherfucker", "nigger", "piss", "prick",
      "pussy", "shit", "slut", "spastic", "twat", "wanker", "whore", "arsehole", "bitchass",
      "blowjob", "clit", "cum", "douche", "dumbass", "fucker", "jackass", "jizz", "muff",
      "nigga", "paki", "pussylicker", "queer", "rimjob", "schlong", "shithead", "nigger",
      "slutty", "tit", "tosser", "twatface", "vagina", "wank", "wanker", "whorebag", "wop"
    ];
    this.bannedSongs = new BannedSongs();
  }

  containsBannedWords(text) {
    const lowercaseText = text.toLowerCase();
    return this.bannedWords.some(word => lowercaseText.includes(word));
  }

  isSongBanned(songTitle) {
    return this.bannedSongs.isSongBanned(songTitle);
  }

  async logViolation(client, user, songTitle) {
    if (!client.playerManager.songLogger.logChannelId) return;

    const logChannel = client.channels.cache.get(client.playerManager.songLogger.logChannelId);
    if (!logChannel) return;

    const embed = new EmbedBuilder()
      .setColor('#FF0000')
      .setTitle('⚠️ Inappropriate Content Blocked')
      .addFields(
        { name: 'User', value: user.tag, inline: true },
        { name: 'User ID', value: user.id, inline: true },
        { name: 'Attempted to Play', value: songTitle }
      )
      .setTimestamp();

    await logChannel.send({ embeds: [embed] });
  }
}

module.exports = WordFilter;
