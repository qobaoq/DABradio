
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('history')
    .setDescription('View song play history for this channel'),

  async execute(interaction) {
    const channel = interaction.member.voice.channel;

    if (!channel) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#ff0000')
            .setDescription('❌ You need to be in a voice channel to view history.')
        ],
        ephemeral: true
      });
    }

    const logs = interaction.client.playerManager.songLogger.getChannelLogs(channel.id);
    
    if (!logs) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#ff9900')
            .setDescription('No song history found for this channel.')
        ],
        ephemeral: true
      });
    }

    const embed = new EmbedBuilder()
      .setColor('#00ff00')
      .setTitle('Song History')
      .setDescription('```' + logs.slice(-1000) + '```')
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
