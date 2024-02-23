import { Message } from 'ai/react'


export interface Template {
  id: string;
  title: string;
  audience: string;
  sampleTexts: [{
    text: string;
    chatHistory?: Message[];
    systemPrompt?: string;
    model?: string;
  }]
  format: 'natural language text' | 'markdown' | 'html' | 'json' | 'yaml' | 'toml' | 'csv' | 'tsv' | 'xml' | 'yaml' | 'toml' | 'csv' | 'tsv' | 'xml';
  description?: string;
  icon?: React.ComponentType;
}

// export interface FewShotTranslation {
//   systemPrompt?: string;
//   source: Option;
//   target: Option;
// }


// export interface CellData {
//   title: string,
//   content: string,
//   template: string,
// }

// export interface TargetCellData extends CellData {
//   message: ChatMessage
// }

// export type TargetCellsData = TargetCellData[];
