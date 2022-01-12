
let Discord = require("discord.js");
let client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});
const { MessageEmbed } = require('discord.js');
client.setMaxListeners(0);
const moment = require("moment")
const random = require("something-random-on-discord").Rando
let snipe = new Discord.Collection(); 
const { MessageActionRow, MessageButton } = require('discord.js');
const { Client, Intents, Collection } = require('discord.js');
const { Calculator } = require('weky');
const { GuessTheNumber } = require('weky');
const { NeverHaveIEver } = require('weky');
const { Permissions } = require('discord.js');
const { FastType } = require('weky');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');







client.commands = new Collection();




//status
client.on('ready', () => {
 console.log(`Discord.js: Ready on: ${client.user.tag} ✅`)

 const arrayOfStatus = [
    `Watching Attack On Titan ⚔️⚜️⛩🔰`,
    `Among Us 🔪`,
    `Coding My freind 💻`,
    `Listening to your favourite Music 🎵`,
    `With BAKA's head 💀`,
    `--help || By CodeMaster100#7978`,
 ];
  
  let index = 0;
  setInterval(() => {
    if(index === arrayOfStatus.length) index = 0;
    const status = arrayOfStatus[index];
    //console.log(status);
    client.user.setActivity(status);
    index++;
  }, 5000)
});


//snipe message delete event
client.snipes = new Discord.Collection
client.on('messageDelete', function(message, channel) {
	client.snipes.set(message.channel.id, {
		content: message.content,
		author: message.author,
		image: message.attachments.first()
			? message.attachments.first().proxyURL
			: null
	});
});


//audit logs
client.on("messageDelete", async (message) => {
  const logs = message.guild.channels.cache.find(channel => channel.name === "logs");
  if (message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS) && !logs) {
    message.guild.channels.create("logs", { type: "GUILD_TEXT" });
  }
  if (!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS) && !logs) { 
    console.log("The logs channel does not exist and tried to create the channel but I am lacking permissions")
  }  
  const entry = await message.guild.fetchAuditLogs({ type: "MESSAGE_DELETE" }).then(audit => audit.entries.first())
  let user = ""
    if (entry.extra.channel.id === message.channel.id
      && (entry.target.id === message.author.id)
      && (entry.createdTimestamp > (Date.now() - 5000))
      && (entry.extra.count >= 1)) {
    user = entry.executor.username
  }

  else { 
    user = message.author.username
  }
  let embed = new Discord.MessageEmbed()
  .setTitle("Message was Deleted")
  .setDescription(`A message was deleted in ${message.channel.name} by ${user}`)
  .setColor("RANDOM")
  .setTimestamp()
  logs.send(({ embeds: [embed] }));

  let channel = message.mentions.channels.first() || message.channel
  let sniped = client.snipes.get(channel.id)
  if(!sniped) {
    message.channel.send(" :x: | There is nothing to snipe in " + channel.name)
  } else {
    let em = new Discord.MessageEmbed()
    .setAuthor(sniped.author.tag, sniped.author.displayAvatarURL())
    .setDescription(sniped.content)
    .setColor("GREEN")
    .setTimestamp()
    if(sniped.image) {
      em.setThumbnail(sniped.image)
    }
      logs.send({ embeds: [em] }); 
  }
})
//Channel Create
client.on('channelCreate', async channel => {
  let embed = new Discord.MessageEmbed()
  .setTitle("A Channel Was Created")
  .setDescription("Channel with name: #" + channel.name + " was just created")
  .setColor("RANDOM")
  .setTimestamp()
  
    client.channels.cache.get('925362722298818601').send(({ embeds: [embed] }));
});
//Channel Delete
client.on('channelDelete', async channel => {
  let embed = new Discord.MessageEmbed()
  .setTitle("A Channel Was Delete")
  .setDescription("Channel with name: #" + channel.name + " was just Deleted")
  .setColor("RANDOM")
  .setTimestamp()
  
    client.channels.cache.get('925362722298818601').send(({ embeds: [embed] }));
});




//Rick Roll Command
client.on("messageCreate", async message => {
if (message.content === "--rr") {
 message.channel.send("https://tenor.com/bItJt.gif")
 message.channel.send("you have been rick rolled")
}


//kick
if (message.content.startsWith("--kick")) {
 if (message.member.permissions.has("KICK_MEMBERS")) {
 let member = message.mentions.members.first()
 if (!member) message.channel.send("Please mention someone")
 else {
 member.kick().then(mem => {
 message.channel.send(`Kicked ${mem.user.username}!`)
 })
 }
 } else {
 message.reply("You don't have the permission to do that...")
 }
 }
 
//help
if(message.content.startsWith("--help")) {
let embed = new Discord.MessageEmbed()
.setTitle("SENPAI BOT COMMAND")
.addField("GAME COMMANDS:video_game:",
'`--rps`' )
.addField("FUN COMMANDS <a:rbgblobvibe:872848644930437160> ",
'`--rr`, ' + '`--hack`,' + '`--coinflip`, ' + '`--fact`, ' + '`--kill`, ' + '`--reminder`, ' + '`--nitro`, ' +  '`--guessnum`, ' + '`--type`, ' + '`--never`')
.addField("MODERATION COMMANDS <:pepecool:872848646759133214>",
'`--kick`, ' + '`--ban`, ' + '`--purge`, ' + '`--mute`, ' + '`--unmute`, ' + '`--emoji`, ' + '`--listrole`')
.addField("TECHNOLOGY COMMANDS:man_technologist:",
'`--snipe`, ' + '`--calc`')
.addField("EMOJI COMMANDS FOR EVERY MOOD",
'`Coming Soon`')
.addField("INFORMATION OF SENAPI BOT",
'`--info`')
.addField("INVITE ME <a:carefreegojo:878592538397786142>",
'`--invite`')
.addField("JOIN MY SUPPORT SERVER <a:blobchain:872848646016757800>",
'`--server`')
.setColor("RANDOM")
.setFooter("Created by: CodeMaster100#7978 ")
.setTimestamp()

 const btnRow = new MessageActionRow().addComponents(
 new MessageButton()
.setLabel('Invite Me')
.setStyle('LINK')
.setURL('https://discord.com/oauth2/authorize?client_id=909014750015402004&scope=bot&permissions=8589934591')
)
message.channel.send({ embeds: [embed], components: [btnRow] })
}


//rps
if (message.content === "--rps" || message.content === "--Rps" || message.content === "--RPS") {
 message.channel.send(":x: | PICK AN OBJECT TO PLAY RPS WITH! EXAMPLE: ****--rps rock**** | :x:")
 }

 if (message.content === "--rps rock" || message.content === "--Rps rock" || message.content === "--RPS ROCK") {
 let replies = ["YOU CHOSE ***ROCK***, I CHOSE ***PAPER***. ****PAPER**** WINS!", "YOU CHOSE ***ROCK***, I CHOSE ***SCISSORS***. ****ROCK**** WINS!", "YOU CHOSE ***ROCK***, I CHOSE ***ROCK***. IT'S A TIE!"]
 message.channel.send(replies[Math.floor(Math.random() * replies.length)])
 }

 if (message.content === "--rps paper" || message.content === "--Rps paper" || message.content === "--RPS PAPER") {
 let replies = ["YOU CHOSE ***PAPER***, I CHOSE ***ROCK***. ****PAPER**** WINS!", "YOU CHOSE ***PAPER***, I CHOSE ***SCISSORS***. ****SCISSORS**** WIN!", "YOU CHOSE ***PAPER***, I CHOSE ***PAPER***. IT'S A TIE!"]
 message.channel.send(replies[Math.floor(Math.random() * replies.length)])
 }

 if (message.content === "--rps scissors" || message.content === "--Rps scissors" || message.content === "--RPS SCISSORS") {
 let replies = ["YOU CHOSE ***SCISSORS***, I CHOSE ***ROCK***. ****ROCK WINS!****", "YOU CHOSE ***SCISSORS***, I CHOSE ***PAPER***. ****SCISSORS WIN!***", "YOU CHOSE ***SCISSORS***, I CHOSE ***SCISSORS***. ****SCISSORS**** WIN!"]
 message.channel.send(replies[Math.floor(Math.random() * replies.length)])
 }


  //invite
 if (message.content.toLowerCase() === "--invite") {
    let owner = client.users.cache.get("779749147989245972")
    let embed = new Discord.MessageEmbed()
      .setTitle("You Can Now Invite me")
      .setDescription(
       "Click On The Button Below"
      )
      .addField("Hope you like It",
      ':smiley:')
      .setColor("RANDOM")
      .setFooter(`Created by ${owner.username}`, owner.displayAvatarURL());
const btnRow = new MessageActionRow().addComponents(
new MessageButton()
.setLabel('Invite Me')
.setStyle('LINK')
.setURL('https://discord.com/oauth2/authorize?client_id=909014750015402004&scope=bot&permissions=8589934591')
)
message.channel.send({ embeds: [embed], components: [btnRow] })
}


  //hac   
if(message.content.startsWith("--hack")) {
const user = message.mentions.users.first();
if(!user) return message.channel.send("Mention Someone to hack")
message.channel.send("**[25%]** Finding IP..").then(m => {
setTimeout(() => {
m.edit("**[50%]** IP FOUND! Looking for email and password..").then(m2 => {
setTimeout(() => {
m2.edit(`**[75%]** DONE! email: ${user.username}@icloud.com | password: XjdhgikshGdk`).then(m3 => {
setTimeout(() => {
m3.edit("**[100%]** Deleting System32..").then(m4 => {
setTimeout(() => {
m4.edit(`done hacking ${user}! all info was sent online.`)
}, 5500);
});
}, 2800);
});
}, 4500);
});
}, 5000);
});
};

 //coinflip
 if (message.content === "--coinflip") {
 let replies = ["Heads", "Tails"];
 message.channel.send(replies[Math.floor(Math.random() * replies.length)]);
 }


 //ban
 if (message.content.startsWith("--ban")) {
 if (message.member.permissions.has("BAN_MEMBERS")) {
 let member = message.mentions.members.first()
 if (!member) message.channel.send("Please mention someone")
 else {
 member.ban().then(mem => {
 message.channel.send(`Banned ${mem.user.username}!`)
 })
 }
 } else {
 message.reply("You don't have the permission to do that...")
 }
 }

 //purge
 if(message.content.startsWith("--purge")){
let arg = message.content.split(" ")
if(message.member.hasPermission("MANAGE_MESSAGES")) {
let clear = arg[1];
if(!clear) return message.channel.send(`:x: | \`Incorrect usage of command you need to provide an amount of messages to Clear.\` 
**Example:** \`_purge 50\` `)
if(isNaN(clear)) return message.channel.send(":x: | ``Please Put a Valid Number to Clear messages.``")
if(clear > 100) return message.channel.send(":x: | ``I can't Clear more than 100 messages.``")
if(clear < 1) return message.channel.send(":x: | ``You cannot Clear less than 1 message.``")

message.channel.bulkDelete(clear)
message.channel.send(`:white_check_mark: | \`Succesfully cleared ${clear} messages! | If purge fails please make sure I have MANAGE_MESSAGES to make the purge seccessful.\` `)
.then(message => 
 message.delete({timeout: 10000})
 )
}else{
message.reply("You dont have perms!")
} 
}


//mute
if(message.content.startsWith("--mute")) {
 if(message.member.permissions.has("ADMINISTRATOR")) {
 let member = message.mentions.members.first()
 if(!member) message.channel.send("mention someone to mute!")
 else {
 message.channel.send("Member has been succesfully muted.")
 }

 }else {
 message.reply("You don't have permission to do that!")
 }
}
//unmute
if(message.content.startsWith("--unmute")) {
 if(message.member.permissions.has("ADMINISTRATOR")) {
 let member = message.mentions.members.first()
 if(!member) message.channel.send("mention someone to unmute!")
 else {
 message.channel.send("Member has been succesfully unmuted.")
 }

 }else {
 message.reply("You don't have permission to do that!")
 }
}


//snipe
  if (message.content === "--snipe") {
     let channel = message.mentions.channels.first() || message.channel
  let sniped = client.snipes.get(channel.id)
  if(!sniped) {
    message.channel.send(" :x: | There is nothing to snipe in " + channel.name)
  } else {
    let em = new Discord.MessageEmbed()
    .setAuthor(sniped.author.tag, sniped.author.displayAvatarURL())
    .setDescription(sniped.content)
    .setColor("GREEN")
    .setTimestamp()
    if(sniped.image) {
      em.setThumbnail(sniped.image)
    }
      message.channel.send({ embeds: [em] }); 
  }
  }

 
//funfact
if(message.content.startsWith("--fact")){
 let ff =["Some fungi create zombies, then control their minds", "The first oranges weren’t orange", "There’s only one letter that doesn’t appear in any U.S. state name", "A cow-bison hybrid is called a beefalo", "Johnny Appleseed’s fruits weren’t for eating", "Scotland has 421 words for snow" , "Samsung tests phone durability with a butt-shaped robot", "The “Windy City” name has nothing to do with Chicago weather", "Peanuts aren’t technically nut", "Armadillo shells are bulletproof", "You are a sussy baka", "Firefighters use wetting agents to make water wetter", "The longest English word is 189,819 letters long", "Octopuses lay 56,000 eggs at a time", "Cats have fewer toes on their back paws", "Blue whales eat half a million calories in one mouthful"]
let funfact = new Discord.MessageEmbed()
 .setTitle("Fun And Fake Fact!")
 .setDescription(`${ff[Math.floor(Math.random() * ff.length)]}`)
 .setColor("RANDOM")
 .setFooter(`Made By CodeMaster100#7978`);
 message.channel.send({ embeds: [funfact] }); 
}

//say

    if(message.content.startsWith('--say')) {
        if (message.author.bot) return;
        message.delete()
        const SayMessage = message.content.slice(2).trim();
        message.channel.send(SayMessage)
    }

//kill
 if(message.content.startsWith("--kill")) {
 let victim = message.mentions.users.first()
 if(!victim) message.reply("Mention someone to Kill")
 else{
let replies = [ (`${victim} has been shot`), (`${victim} has been stabbed`), (`${victim} has been drowned`), 
 (`${victim} has been electrified`), (`A goose honked at ${victim} to death`), 
 (`Some psychopath zapped ${victim} with his laser eyes`), 
 (`${victim} ate a poisonous potato`), (`${victim} died from slowmode being to long`), 
 (`${victim} was run over by car`), (`${victim} was pushed in lava`), (`${victim} was banned by the server owner`), 
 (`${victim} was found dead in a dumpster`), 
 (`Someone named Joe was found chewing on ${victim}'s leg`), (`${victim} got drunk and fell in the water`), 
 (`${victim} made a deal with the devil`), (`${victim} was hacked by an 
Oreo`), (`An alien named MEE6 abducted ${victim} in their sleep`),]

 message.channel.send(`${replies[Math.floor(Math.random() * replies.length)]}`) 
 }
 }
 //Support Server
 if (message.content.toLowerCase() === "--server") {
    let owner = client.users.cache.get("779749147989245972")
    let embed = new Discord.MessageEmbed()
      .setTitle("Here is my Support Server Invite Link")
      .setDescription(
       "https://discord.gg/N4HCXMxmR8"
      )
      .addField("This Is The Support Server Of Senpai Bot",
      ':smiley:')
      .setColor("RANDOM")
      .setFooter(`Created by ${owner.username}`, owner.displayAvatarURL());
     message.channel.send({ embeds: [embed] }); 
  }     

  //Reminder
if(message.content.toLowerCase().startsWith('--reminder')){
  const rem = message.guild.channels.cache.find(channel => channel.name === "reminder");
 const args = message.content.split(' ').splice(1);
 let embed = new Discord.MessageEmbed()
 .setTitle("Reminder")
 .setDescription("please include a valid time")
 let embe = new Discord.MessageEmbed()
 .setTitle("Reminder")
 .setDescription("please include a valid number")
 let emb = new Discord.MessageEmbed()
 .setTitle("Reminder")
 .setDescription("you have to include something for me to remind you with")
 let em = new Discord.MessageEmbed()
 .setTitle("Reminder")
 .setDescription("Reminder set")
 if(!args[0]) return message.channel.send({ embeds: [embed] });
 if(isNaN(args[0])) return message.channel.send({ embeds: [embe] });
 if(!args[1]) return message.channel.send({ embeds: [emb] })
 else {
   message.channel.send({ embeds: [em] })
 }
 setTimeout(() => {
 const msg = args.splice(1).join(' ');
  let e = new Discord.MessageEmbed()
 .setTitle("Reminder")
 .setDescription(`${message.author}, ${msg}`)
 rem.send({ embeds: [e] })
 rem.send(${message.author})
 }, parseInt(args[0], 10) * 1000)
}
     

//lol
if (message.content === "lol") {
 message.channel.send("<:kekw:872848645676990485>")
}

if (message.content === "Lol") {
 message.channel.send("<:kekw:872848645676990485>")
}

if (message.content === "LOl") {
 message.channel.send("<:kekw:872848645676990485>")
}

if (message.content === "LOL") {
 message.channel.send("<:kekw:872848645676990485>")
}

if (message.content === "lOl") {
 message.channel.send("<:kekw:872848645676990485>")
}

if (message.content === "loL") {
 message.channel.send("<:kekw:872848645676990485>")
}

//Info
if(message.content.startsWith("--info")) {
let embed = new Discord.MessageEmbed()
.setTitle("SENPAI BOT Information")
.addField("What is SENPAI BOT <:thonk:872848645710557225>" ,
"Senpai Bot is a bot designed to keep your server safe and keep your Server Fun. Its moderation and logging suite keep track of your members and keep your moderators accountable. Its auto-moderator capabilities also allow it to filter out certain types of behavior without need for human intervention, lightening the load on the staff team. Finally, Senapi Bot is designed to be fast and easy to use. ")

.addField("DEVELOPER <:Developer:922020965871923200>",
"CodeMaster100#7978")

.addField("SUPPORT SERVER <a:blobchain:872848646016757800>",
'`--server`')
.setColor("RANDOM")
.setFooter("Created by: CodeMaster100#7978 ")
.setTimestamp()
message.channel.send({ embeds: [embed] }); 
}

//ping
    if(message.content === "--ping") {
    let embed = new Discord.MessageEmbed()
      .setTitle("🏓 Pong!")
      .setDescription(`**${client.ws.ping}ms** Latency!`)
      .setColor("RANDOM")
      .setFooter(
        `Requested by ${message.author.username}`,
        message.author.displayAvatarURL()
      );
    message.channel.send({ embeds: [embed] }); 
  }

  //emoji
    if(message.content === "--emoji") {
    const args = message.content.trim().split(/ +/g);
    let name = args[0]
    let link = args[1]
    if (!name) return message.channel.send("`-emoji [name] [link]` is the correct method")
    if (!link) return message.channel.send("`-emoji [name] [link]` is the correct method")
    message.guild.emojis.create(link, name)
    message.channel.send("✅ Emoji has been created")
  }

    if(message.content === "--listrole"){
    let rolemap = message.guild.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(r => r)
            .join("\n");
            if (rolemap.length > 1024) rolemap = "To many roles to display";
            if (!rolemap) rolemap = "No roles";
    const embed = new Discord.MessageEmbed()
	.addFields(
		{ name: 'Role', value: rolemap, inline: true },
	)
      
    message.channel.send({ embeds: [embed] }); 
  }

//nitro
  if (message.content === "--nitro") {
 message.channel.send("1. Wait till your mom isn’t home.\n2. Lock all the doors\n3. Find your moms credit card\n4. Buy some gift cards\n5. Send the codes here\n6. Buy a lot of nitro\n7. Run ")
}

//calculator
	if (message.content === '--calculator' || message.content === '--calc') {
		await Calculator({
			message: message,
			embed: {
				title: 'Calculator',
				color: '#5865F2',
				footer: 'Made By CodeMaster100#7978',
				timestamp: true,
			},
			disabledQuery: 'Calculator is disabled!',
			invalidQuery: 'The provided equation is invalid!',
			othersMessage: 'Only <@{{author}}> can use the buttons!',
		});
	}

  //Guess The Number
  if (message.content === '--guessnum'){
await GuessTheNumber({
	message: message,
	embed: {
		title: 'Guess The Number',
		description: 'You have **{{time}}** to guess the number.',
		color: '#5865F2',
        footer: 'CodeMaster100#7978',
		timestamp: true
	},
	publicGame: true,
	number: 189,
	time: 60000,
	winMessage: {
		publicGame:
			'GG, The number which I guessed was **{{number}}**. <@{{winner}}> made it in **{{time}}**.\n\n__**Stats of the game:**__\n**Duration**: {{time}}\n**Number of participants**: {{totalparticipants}} Participants\n**Participants**: {{participants}}',
		privateGame:
			'GG, The number which I guessed was **{{number}}**. You made it in **{{time}}**.',
	},
	loseMessage:
		'Better luck next time! The number which I guessed was **{{number}}**.',
	bigNumberMessage: 'No {{author}}! My number is greater than **{{number}}**.',
	smallNumberMessage:
		'No {{author}}! My number is smaller than **{{number}}**.',
	othersMessage: 'Only <@{{author}}> can use the buttons!',
	buttonText: 'Cancel',
	ongoingMessage:
		"A game is already runnning in <#{{channel}}>. You can't start a new one!",
	returnWinner: false
});
  }
//Never have i Ever 
if (message.content === '--never')
await NeverHaveIEver({
	message: message,
	embed: {
		title: 'Never Have I Ever',
		color: '#5865F2',
        footer: 'CodeMaster100#7978',
		timestamp: true
	},
	thinkMessage: 'I am thinking',
	othersMessage: 'Only <@{{author}}> can use the buttons!',
	buttons: { optionA: 'Yes', optionB: 'No' }
});

//learn js
//create embed
if (message.content === "--setupv13") {
 message.channel.send("Hi Fellas\nI am gonna today teach ya guys how to setup Discord.js v13 in you'r Bot repl, So Lets start...\n 1st. Go to https://discord.com/developers/applications and then Click on New Application. Fill in the bot name then go to Bot in the Setting section to the right. Then Click On the Bot Add Bot Button and there is you'r first step done and the bot created\n 2nd.  ")
}
//fast type
if (message.content === "--type") {
await FastType({
    message: message,
    embed: {
        title: 'FastType',
        description: 'You have **{{time}}** to type the below sentence.',
        color: '#5865F2',
        footer: 'CodeMaster100#7978',
        timestamp: true
    },
    sentence: 'This is a sentence!',
    winMessage: 'GG, you have a wpm of **{{wpm}}** and You made it in **{{time}}**.',
    loseMessage: 'Better luck next time!',
    cancelMessage: 'You ended the game!',
    time: 60000,
    buttonText: 'Cancel',
    othersMessage: 'Only <@{{author}}> can use the buttons!'
});
}

})



client.login("OTA5MDE0NzUwMDE1NDAyMDA0.YY-H9Q.m_WNzE8Fp88fvYAZ7Twvgyxvw3U")