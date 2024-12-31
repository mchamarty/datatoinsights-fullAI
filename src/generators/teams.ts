import { fakerEN_US } from '@faker-js/faker';
import { TeamsMessage, TeamMember } from '../types/interfaces';
import { TEAM_MEMBERS, CHANNELS, DAYS_TO_GENERATE, WORK_START_HOUR, WORK_END_HOUR } from '../config';

// Use fakerEN_US instead of faker
const faker = fakerEN_US;

console.log('TEST:', faker.lorem.sentence());

const generateDirectMessages = (): TeamsMessage[] => {
  const messages: TeamsMessage[] = [];

  for (let day = 0; day < DAYS_TO_GENERATE; day++) {
    TEAM_MEMBERS.forEach((sender: TeamMember) => {
      const dailyDMs = faker.number.int({ min: 5, max: 15 });

      for (let i = 0; i < dailyDMs; i++) {
        const recipient = faker.helpers.arrayElement(
          TEAM_MEMBERS.filter((m: TeamMember) => m.id !== sender.id)
        );

        const date = new Date();
        date.setDate(date.getDate() - DAYS_TO_GENERATE + day);
        date.setHours(
          faker.number.int({ min: WORK_START_HOUR, max: WORK_END_HOUR }),
          faker.number.int({ min: 0, max: 59 }),
          faker.number.int({ min: 0, max: 59 })
        );

        messages.push({
          id: faker.string.uuid(),
          senderId: sender.id,
          recipientIds: [recipient.id],
          content: faker.lorem.sentence({ min: 5, max: 10 }),
          timestamp: date,
          channelId: undefined,
          isGroupChat: false,
          hasReplies: faker.datatype.boolean(),
          reactions: faker.helpers.arrayElements(
            ['👍', '❤️', '😊', '💡', '👏'],
            faker.number.int({ min: 0, max: 3 })
          )
        });
      }
    });
  }

  return messages;
};

export default generateDirectMessages;