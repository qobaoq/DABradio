
const { SlashCommandBuilder, EmbedBuilder, ChannelType, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setlogs')
    .setDescription('Set the channel for song logging')
    .addChannelOption(option =>
      option.setName('channel')
        .setDescription('The channel to log songs in')
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildText))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

  async execute(interaction) {
    const channel = interaction.options.getChannel('channel');
    
    // Set the log channel in SongLogger
    interaction.client.playerManager.songLogger.setLogChannel(channel.id);

    const embed = new EmbedBuilder()
      .setColor('#00FF00')
      .setTitle('Logs Channel Set')
      .setDescription(`✅ Song logs will now be sent to ${channel}`);

    await interaction.reply({ embeds: [embed] });
  },
};
