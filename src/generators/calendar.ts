import { faker } from '@faker-js/faker';
import { CalendarEvent, TeamMember } from '../types/interfaces';
import { TEAM_MEMBERS, MEETING_TYPES, DAYS_TO_GENERATE, WORK_START_HOUR, WORK_END_HOUR } from '../config';

const generateRecurringMeetings = (): CalendarEvent[] => {
  const events: CalendarEvent[] = [];
  
  // Daily standup
  for (let day = 0; day < DAYS_TO_GENERATE; day++) {
    const date = new Date();
    date.setDate(date.getDate() - DAYS_TO_GENERATE + day);
    date.setHours(10, 0, 0, 0);
    
    if (date.getDay() !== 0 && date.getDay() !== 6) { // Skip weekends
      events.push({
        id: faker.string.uuid(),
        subject: 'Daily Standup',
        start: new Date(date),
        end: new Date(date.setMinutes(30)),
        organizerId: TEAM_MEMBERS[0].id, // Manager
        attendeeIds: TEAM_MEMBERS.map(m => m.id),
        isRecurring: true,
        recurrencePattern: 'FREQ=DAILY;BYDAY=MO,TU,WE,TH,FR',
        responseStatus: 'accepted',
        location: 'Teams Meeting',
        type: 'recurring'
      });
    }
  }

  // Weekly team meetings
  for (let week = 0; week < DAYS_TO_GENERATE / 7; week++) {
    const date = new Date();
    date.setDate(date.getDate() - DAYS_TO_GENERATE + (week * 7));
    date.setHours(14, 0, 0, 0);
    
    if (date.getDay() === 2) { // Tuesday
      events.push({
        id: faker.string.uuid(),
        subject: 'Weekly Team Sync',
        start: new Date(date),
        end: new Date(date.setHours(15)),
        organizerId: TEAM_MEMBERS[0].id,
        attendeeIds: TEAM_MEMBERS.map(m => m.id),
        isRecurring: true,
        recurrencePattern: 'FREQ=WEEKLY;BYDAY=TU',
        responseStatus: 'accepted',
        location: 'Teams Meeting',
        type: 'recurring'
      });
    }
  }

  return events;
};

const generate1on1Meetings = (): CalendarEvent[] => {
  const events: CalendarEvent[] = [];
  const manager = TEAM_MEMBERS[0];
  
  // Manager 1:1s with each team member
  TEAM_MEMBERS.slice(1).forEach((member, index) => {
    for (let week = 0; week < DAYS_TO_GENERATE / 7; week++) {
      const date = new Date();
      date.setDate(date.getDate() - DAYS_TO_GENERATE + (week * 7));
      date.setHours(11 + (index % 5), 0, 0, 0); // Spread throughout the day
      
      if (date.getDay() === 3) { // Wednesday
        events.push({
          id: faker.string.uuid(),
          subject: `1:1 ${manager.name} / ${member.name}`,
          start: new Date(date),
          end: new Date(date.setMinutes(30)),
          organizerId: manager.id,
          attendeeIds: [manager.id, member.id],
          isRecurring: true,
          recurrencePattern: 'FREQ=WEEKLY;BYDAY=WE',
          responseStatus: faker.helpers.arrayElement(['accepted', 'tentative']),
          location: 'Teams Meeting',
          type: 'recurring'
        });
      }
    }
  });

  return events;
};

const generateAdHocMeetings = (): CalendarEvent[] => {
  const events: CalendarEvent[] = [];
  
  // Generate random meetings throughout the period
  for (let day = 0; day < DAYS_TO_GENERATE; day++) {
    const numberOfMeetings = faker.number.int({ min: 2, max: 5 });
    
    for (let i = 0; i < numberOfMeetings; i++) {
      const date = new Date();
      date.setDate(date.getDate() - DAYS_TO_GENERATE + day);
      date.setHours(
        faker.number.int({ min: WORK_START_HOUR, max: WORK_END_HOUR - 1 }),
        faker.helpers.arrayElement([0, 30]),
        0,
        0
      );
      
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        const duration = faker.helpers.arrayElement([30, 60, 90]);
        const attendees = faker.helpers.arrayElements(
          TEAM_MEMBERS,
          faker.number.int({ min: 2, max: 8 })
        );
        
        events.push({
          id: faker.string.uuid(),
          subject: faker.helpers.arrayElement(MEETING_TYPES),
          start: new Date(date),
          end: new Date(date.setMinutes(date.getMinutes() + duration)),
          organizerId: faker.helpers.arrayElement(attendees).id,
          attendeeIds: attendees.map(a => a.id),
          isRecurring: false,
          responseStatus: faker.helpers.arrayElement(['accepted', 'tentative', 'declined']),
          location: faker.helpers.arrayElement(['Teams Meeting', 'Conference Room A', 'Conference Room B']),
          type: 'single'
        });
      }
    }
  }

  return events;
};

export const generateCalendarEvents = (): CalendarEvent[] => {
  return [
    ...generateRecurringMeetings(),
    ...generate1on1Meetings(),
    ...generateAdHocMeetings()
  ];
};