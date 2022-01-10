const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');


const commands = [{
  name: 'ziz',
  description: 'Replies with yo!'
},{
  name: 'video',
  description: 'Replies with newest video!'
}]; 
console.log("909014750015402004")
const rest = new REST({ version: '9' }).setToken("OTA5MDE0NzUwMDE1NDAyMDA0.YY-H9Q.m_WNzE8Fp88fvYAZ7Twvgyxvw3U");

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands("909014750015402004", "758560474308018197"),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();