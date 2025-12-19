export interface GitFlag {
  flag: string;
  description: string;
}

export interface GitCommand {
  cmd: string;
  description: string;
  example: string;
  flags: GitFlag[];
}

export interface GitCategory {
  id: string;
  title: string;
  description: string;
  commands: GitCommand[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
