import { generateCalendarEvents } from './generators/calendar';
import generateTeamsMessages from './generators/teams';
import { PrismaClient } from '@prisma/client';
import { writeFileSync } from 'fs';
import { parse } from 'json2csv';


async function main() {
  // Generate data
  const calendarEvents = generateCalendarEvents();
  const teamsMessages = generateTeamsMessages();

  // Option 1: Save to JSON files
  writeFileSync(
    './data/calendar-events.json', 
    JSON.stringify(calendarEvents, null, 2)
  );
  writeFileSync(
    './data/teams-messages.json', 
    JSON.stringify(teamsMessages, null, 2)
  );

  try {
    const calendarFields = ['subject', 'start', 'end', 'organizerId', 'attendeeIds', 'isRecurring', 'responseStatus', 'location', 'type'];
    const teamsFields = ['senderId', 'recipientIds', 'content', 'timestamp', 'channelId', 'isGroupChat', 'hasReplies', 'reactions'];
  
    const calendarCsv = parse(calendarEvents, { fields: calendarFields });
    const teamsCsv = parse(teamsMessages, { fields: teamsFields });
  
    writeFileSync('./data/calendar-events.csv', calendarCsv);
    writeFileSync('./data/teams-messages.csv', teamsCsv);
  } catch (err) {
    console.error('Error writing CSV:', err);
  }

  // Option 2: Save to database (if using Prisma)
  // const prisma = new PrismaClient();
  // await prisma.calendarEvent.createMany({ data: calendarEvents });
  // await prisma.teamsMessage.createMany({ data: teamsMessages });
}

main()
  .catch(console.error)
  .finally(() => {
    // if using Prisma:
    // prisma.$disconnect();
  });