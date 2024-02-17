'use client'

import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

// For now, hard coded
const myOptions = [
  'Research markdown',
  'Research proposal',
  'Literature review',
]

// omg whatif, dropdown?
const options = [
  'Blog post',
  'Documentation',
  'Landing page',
  // 'Research proposal',
  // 'Marketing copy',
  // 'Product description',
  // 'Social media post', // breakdown to: Twitter, Facebook, LinkedIn, Instagram, TikTok
  // 'Custom'
  // 'English'
  // 'Spanish as spoken locally in Mexico'
  // Probs like more filters that are action oriented like: shorten, summarize, expand, etc.
];

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface Option {
  title: string;
  description: string;
  format: 'natural language text' | 'markdown' | 'html' | 'json' | 'yaml' | 'toml' | 'csv' | 'tsv' | 'xml' | 'yaml' | 'toml' | 'csv' | 'tsv' | 'xml';
  sampleTexts: [{
    text: string;
    chatHistory?: [ChatMessage];
    systemPrompt?: string;
    model?: string;
  }]
  systemPrompt?: string;
}

interface FewShotTranslation {
  source: Option;
  target: Option;
}

const examplePlaceholders = [
  {
    source: '',
    target: ''
  }
]
export default function Translate() {
  return (
    <div className="w-full p-8">
      <div className="pb-8">Convert any type of text into any other text that you'd like. Connect it to tasks too!</div>
      <Button className="mb-8">Add sample of your writing</Button>
      <Button className="ml-8">See examples</Button>
      {/* ^This takes them into a popup form */}
      <div className="flex">
        <div className="hidden lg:block pr-8 self-center"><Button>+</Button></div>
        <div className="flex-auto grid gap-6 lg:grid-cols-2">
          <div className="grid gap-4">
            <div className="flex items-center gap-4">
              <Label htmlFor="source-language">Source Material</Label>
              <Select>
                {options.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </Select>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-800">
              <Textarea
                className="w-full min-h-[200px] p-4 text-base font-normal border-0 resize-none"
                id="source-text"
                placeholder="Enter your text"
              />
            </div>
          </div>
          <div className="grid gap-4">
            <div className="flex items-center gap-4">
              <Label htmlFor="target-language">Target Material</Label>
              {/* You may select multiple */}
              <Select>
                {options.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </Select>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-800">
              <Textarea
                className="w-full min-h-[200px] p-4 text-base font-normal border-0 resize-none"
                id="translated-text"
                placeholder="Translation"
                readOnly
              />
            </div>
          </div>
        </div>
        <div className="hidden lg:block pl-8 self-center"><Button>+</Button></div>
      </div>
      <div className="flex w-full py-4">
        <Button className="ml-auto lg:hidden" type="submit">
          + Integrate with your accounts +
        </Button>
      </div>
    </div>
  )
}

