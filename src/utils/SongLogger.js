
const { EmbedBuilder } = require('discord.js');

class SongLogger {
  constructor() {
    this.logChannelId = null;
  }

  setLogChannel(channelId) {
    this.logChannelId = channelId;
  }

  async logSong(client, channel, song, user) {
    if (!this.logChannelId) return;

    const logChannel = client.channels.cache.get(this.logChannelId);
    if (!logChannel) return;

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('Song Played')
      .addFields(
        { name: 'Song', value: song.name, inline: true },
        { name: 'Channel', value: channel.name, inline: true },
        { name: 'User', value: user.tag, inline: true },
        { name: 'URL', value: song.url }
      )
      .setTimestamp();

    await logChannel.send({ embeds: [embed] });
  }
}

module.exports = SongLogger;
