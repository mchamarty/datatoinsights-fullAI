import { TeamMember } from './types/interfaces';

export const DAYS_TO_GENERATE = 90;
export const WORK_START_HOUR = 9;
export const WORK_END_HOUR = 17;

export const TEAM_MEMBERS: TeamMember[] = [
    { id: '1', email: 'manager@company.com', name: 'Team Manager', role: 'manager' },
    { id: '2', email: 'lead1@company.com', name: 'Lead One', role: 'lead' },
    { id: '3', email: 'lead2@company.com', name: 'Lead Two', role: 'lead' },
    { id: '4', email: 'dev1@company.com', name: 'Developer One', role: 'member' },
    { id: '5', email: 'dev2@company.com', name: 'Developer Two', role: 'member' },
    { id: '6', email: 'dev3@company.com', name: 'Developer Three', role: 'member' },
    { id: '7', email: 'dev4@company.com', name: 'Developer Four', role: 'member' },
    { id: '8', email: 'analyst1@company.com', name: 'Analyst One', role: 'member' },
    { id: '9', email: 'analyst2@company.com', name: 'Analyst Two', role: 'member' },
    { id: '10', email: 'designer1@company.com', name: 'Designer One', role: 'member' },
    { id: '11', email: 'designer2@company.com', name: 'Designer Two', role: 'member' },
    { id: '12', email: 'qa1@company.com', name: 'QA One', role: 'member' },
    { id: '13', email: 'qa2@company.com', name: 'QA Two', role: 'member' },
    { id: '14', email: 'ops1@company.com', name: 'Ops One', role: 'member' },
    { id: '15', email: 'ops2@company.com', name: 'Ops Two', role: 'member' }
   ];

export const MEETING_TYPES = [
  '1:1 Sync',
  'Team Standup',
  'Project Review',
  'Planning Session',
  'Client Meeting'
];

export const CHANNELS = [
  'General',
  'Project-A',
  'Project-B',
  'Random',
  'Help'
];