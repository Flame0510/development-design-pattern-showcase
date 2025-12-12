/**
 * COMPONENT TYPE: Utility
 * SECTION: External Integrations
 *
 * ROLE:
 * - Centralize ChatGPT integration logic
 * - Generate prompts for code explanation requests
 * - Open ChatGPT in new tab with pre-filled context
 *
 * PATTERNS USED:
 * - Facade Pattern - Simplifies ChatGPT URL construction
 * - Strategy Pattern - Different prompt strategies for different contexts
 *
 * NOTES FOR CONTRIBUTORS:
 * - Used by CodeBlock and CodePlayground components
 * - Prompts are in Italian (following project locale)
 * - URL encoding handles special characters
 * - Opens in new tab to avoid navigation from app
 */

export interface ChatGPTPromptOptions {
  code: string;
  language?: string;
  title?: string;
  context?: string;
  additionalQuestions?: string[];
}

/**
 * Generate a ChatGPT prompt for code explanation
 */
export function generateChatGPTPrompt({
  code,
  language = 'javascript',
  title,
  context,
  additionalQuestions = []
}: ChatGPTPromptOptions): string {
  let prompt = `Sto studiando i Design Pattern e ho trovato questo esempio di codice${title ? ` intitolato "${title}"` : ''}.\n\n`;
  
  if (context) {
    prompt += `Contesto: ${context}\n\n`;
  }
  
  prompt += `Codice (${language}):\n\`\`\`${language}\n${code}\n\`\`\`\n\n`;
  prompt += `Puoi spiegarmelo meglio? Vorrei capire:\n`;
  prompt += `1. Cosa fa questo codice\n`;
  prompt += `2. Quali design pattern implementa\n`;
  prompt += `3. Perché questo approccio è vantaggioso\n`;
  prompt += `4. Esempi pratici di utilizzo`;
  
  // Add custom questions if provided
  if (additionalQuestions.length > 0) {
    prompt += `\n\nDomande aggiuntive:\n`;
    additionalQuestions.forEach((q, i) => {
      prompt += `${i + 5}. ${q}\n`;
    });
  }
  
  return prompt;
}

/**
 * Open ChatGPT with pre-filled prompt
 */
export function openChatGPT(options: ChatGPTPromptOptions): void {
  const prompt = generateChatGPTPrompt(options);
  const encodedPrompt = encodeURIComponent(prompt);
  const chatGPTUrl = `https://chat.openai.com/?q=${encodedPrompt}`;
  window.open(chatGPTUrl, '_blank');
}
