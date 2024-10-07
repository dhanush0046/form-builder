import { Extension } from '@tiptap/core';
import { SuggestionOptions } from '@tiptap/suggestion';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    slashCommand: {
      /**
       * Add a slash command
       */
      setSlashCommand: () => ReturnType;
    };
  }
}

export interface SlashCommandOptions {
  suggestion: Omit<SuggestionOptions, 'editor'>;
}

export const SlashCommand = Extension.create<SlashCommandOptions>({
  name: 'slashCommand',

  addOptions() {
    return {
      suggestion: {
        char: '/',
        command: ({ editor, range, props }) => {
          props.command({ editor, range });
        },
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      // We're not directly using the Suggestion plugin here
      // Instead, we'll handle the suggestion logic in the FormBuilder component
    ];
  },
});

export default SlashCommand;