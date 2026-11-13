import type { Preview } from "@storybook/nextjs-vite";
import "../src/styles/globals.scss";

const preview: Preview = {
  decorators: [
    (Story) => (
      <div className="flex min-h-screen items-center justify-center p-8 gradient-background">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export default preview;
